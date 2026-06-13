<script lang="ts">
	import { feastTheme } from '$lib/feast-of-the-rings/theme';
	import {
		clampTimestamp,
		formatCountdown,
		formatTimestamp,
		parseTimestamp
	} from '$lib/feast-of-the-rings/time';

	interface Props {
		isPlaying: boolean;
		elapsedSeconds: number;
		maxSeconds: number;
		nextDishName: string | null;
		secondsUntilNext: number | null;
		prepDishName: string | null;
		onPlay: () => void;
		onPause: () => void;
		onNudge: (deltaSeconds: number) => void;
		onReset: () => void;
		onSeek: (seconds: number) => void;
	}

	let {
		isPlaying,
		elapsedSeconds,
		maxSeconds,
		nextDishName,
		secondsUntilNext,
		prepDishName,
		onPlay,
		onPause,
		onNudge,
		onReset,
		onSeek
	}: Props = $props();

	let isEditingTime = $state(false);
	let timeInputValue = $state('');
	let timeInputError = $state<string | null>(null);
	let timeInputRef = $state<HTMLInputElement | null>(null);
	let skipBlurCommit = false;

	function startEditingTime() {
		if (isPlaying) {
			onPause();
		}
		timeInputValue = formatTimestamp(elapsedSeconds);
		timeInputError = null;
		isEditingTime = true;
		queueMicrotask(() => timeInputRef?.focus());
	}

	function cancelEditingTime() {
		skipBlurCommit = true;
		isEditingTime = false;
		timeInputError = null;
	}

	function commitTimeInput() {
		const parsed = parseTimestamp(timeInputValue);
		if (parsed === null) {
			timeInputError = 'Use mm:ss, h:mm:ss, or seconds';
			return;
		}

		onSeek(clampTimestamp(parsed, maxSeconds));
		skipBlurCommit = true;
		isEditingTime = false;
		timeInputError = null;
	}

	function handleTimeInputBlur() {
		if (skipBlurCommit) {
			skipBlurCommit = false;
			return;
		}
		commitTimeInput();
	}

	function handleTimeInputKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			commitTimeInput();
		} else if (event.key === 'Escape') {
			event.preventDefault();
			cancelEditingTime();
		}
	}
</script>

<div class="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
	<p class="mb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
		Sync from opening narration
	</p>

	<div class="mb-1">
		{#if isEditingTime}
			<label class="sr-only" for="elapsed-time-input">Set elapsed time</label>
			<input
				id="elapsed-time-input"
				bind:this={timeInputRef}
				bind:value={timeInputValue}
				type="text"
				inputmode="numeric"
				autocomplete="off"
				spellcheck="false"
				class="w-full max-w-xs rounded-lg border border-rose-300 bg-white px-3 py-2 font-mono text-3xl font-bold text-gray-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30 focus:outline-none dark:border-rose-800 dark:bg-gray-900 dark:text-white"
				aria-invalid={timeInputError !== null}
				aria-describedby={timeInputError ? 'elapsed-time-error' : 'elapsed-time-hint'}
				onkeydown={handleTimeInputKeyDown}
				onblur={handleTimeInputBlur}
			/>
		{:else}
			<button
				type="button"
				class="rounded-lg font-mono text-3xl font-bold text-gray-900 transition-colors {feastTheme.watch.textHover} focus:ring-2 focus:ring-rose-500/30 focus:outline-none dark:text-white"
				aria-label="Set elapsed time, currently {formatTimestamp(elapsedSeconds)}"
				onclick={startEditingTime}
			>
				{formatTimestamp(elapsedSeconds)}
			</button>
		{/if}
	</div>

	<p
		id="elapsed-time-hint"
		class="mb-4 text-xs text-gray-500 dark:text-gray-400"
	>
		{#if isEditingTime}
			Enter mm:ss, h:mm:ss, or seconds · Enter to apply · Esc to cancel
		{:else}
			Click the time to set it manually
		{/if}
	</p>

	{#if timeInputError}
		<p id="elapsed-time-error" class="mb-4 text-sm text-red-600 dark:text-red-400" role="alert">
			{timeInputError}
		</p>
	{/if}

	{#if nextDishName && secondsUntilNext !== null}
		<p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
			Next dish <span class="font-semibold">{nextDishName}</span> in
			<span class="font-mono">{formatCountdown(secondsUntilNext)}</span>
		</p>
	{:else}
		<p class="mb-4 text-sm text-gray-500 dark:text-gray-400">No upcoming dishes</p>
	{/if}

	{#if prepDishName}
		<div
			class="mb-4 rounded-lg px-3 py-2 text-sm {feastTheme.watch.surface} {feastTheme.watch.surfaceText}"
			role="status"
		>
			Start preparing <span class="font-semibold">{prepDishName}</span>
		</div>
	{/if}

	<div class="flex flex-wrap gap-2">
		{#if isPlaying}
			<button
				type="button"
				class="rounded-lg {feastTheme.plan.solid} px-4 py-2 text-sm font-medium hover:opacity-90"
				onclick={onPause}
			>
				Pause
			</button>
		{:else}
			<button
				type="button"
				class="rounded-lg {feastTheme.watch.solid} px-4 py-2 text-sm font-medium"
				onclick={onPlay}
			>
				Play
			</button>
		{/if}

		<button
			type="button"
			class="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600"
			onclick={() => onNudge(-10)}
			aria-label="Nudge timer back 10 seconds"
		>
			−10s
		</button>
		<button
			type="button"
			class="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600"
			onclick={() => onNudge(10)}
			aria-label="Nudge timer forward 10 seconds"
		>
			+10s
		</button>
		<button
			type="button"
			class="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600"
			onclick={onReset}
		>
			Reset
		</button>
	</div>
</div>

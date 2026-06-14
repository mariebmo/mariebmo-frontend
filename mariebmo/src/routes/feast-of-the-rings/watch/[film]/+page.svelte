<script lang="ts">
	import { browser } from '$app/environment';
	import { feastTheme } from '$lib/feast-of-the-rings/theme';
	import { onDestroy } from 'svelte';
	import DishBrowse from '$lib/feast-of-the-rings/components/DishBrowse.svelte';
	import DishFilterMenu from '$lib/feast-of-the-rings/components/DishFilterMenu.svelte';
	import FeastDetailCard from '$lib/feast-of-the-rings/components/FeastDetailCard.svelte';
	import FilmStepper from '$lib/feast-of-the-rings/components/FilmStepper.svelte';
	import HeadcountControl from '$lib/feast-of-the-rings/components/HeadcountControl.svelte';
	import SyncControls from '$lib/feast-of-the-rings/components/SyncControls.svelte';
	import Timeline from '$lib/feast-of-the-rings/components/Timeline.svelte';
	import { feastPlan } from '$lib/feast-of-the-rings/plan-store.svelte';
	import { getFilmRuntime } from '$lib/feast-of-the-rings/films';
	import { clampTimestamp } from '$lib/feast-of-the-rings/time';
	import { getSyncStatus } from '$lib/feast-of-the-rings/sync-utils';
	import type { DishViewMode, FilmStep, KindFilter } from '$lib/feast-of-the-rings/types';
	import type { PageData } from './$types';

	const VIEW_STORAGE_KEY = 'feast-browse-view';

	const STEP_SUBTITLES: Record<FilmStep, string> = {
		plan: 'Pick dishes — the timeline shows everything, your choices are highlighted.',
		menu: 'Choose how to serve each beat — ingredients scale with headcount.',
		watch: 'Press Play when you hear "The world is changed…"'
	};

	let { data }: { data: PageData } = $props();

	let step = $state<FilmStep>('plan');
	let isPlaying = $state(false);
	let elapsedSeconds = $state(0);
	let offsetSeconds = $state(0);
	let startedAt = $state<number | null>(null);
	let kindFilter = $state<KindFilter>('all');
	let viewMode = $state<DishViewMode>(loadViewMode());

	let intervalId: ReturnType<typeof setInterval> | null = null;
	let wasPlayingBeforeScrub = false;

	const filmId = $derived(data.film.id);
	const edition = $derived(feastPlan.plan.edition);
	const filmRuntimeSeconds = $derived(getFilmRuntime(filmId, edition));

	const allDishes = $derived(feastPlan.getVisibleDishesForFilm(filmId));
	const plannedDishes = $derived(feastPlan.getPlannedDishesForFilm(filmId));

	const browseDishes = $derived.by(() => {
		if (kindFilter === 'all') return allDishes;
		const kind = kindFilter;
		return allDishes.filter((dish) => dish.kinds.includes(kind));
	});

	const timelineDishes = $derived(plannedDishes.length > 0 ? plannedDishes : allDishes);

	const syncStatus = $derived(
		step === 'watch' ? getSyncStatus(timelineDishes, edition, elapsedSeconds) : null
	);

	function loadViewMode(): DishViewMode {
		if (!browser) return 'cards';
		return localStorage.getItem(VIEW_STORAGE_KEY) === 'list' ? 'list' : 'cards';
	}

	function setViewMode(mode: DishViewMode) {
		viewMode = mode;
		if (browser) {
			localStorage.setItem(VIEW_STORAGE_KEY, mode);
		}
	}

	function handleStepChange(nextStep: FilmStep) {
		if (step === 'watch' && nextStep !== 'watch') {
			handleReset();
		}
		step = nextStep;
	}

	function tickElapsed() {
		if (startedAt === null) return;
		elapsedSeconds = Math.max(0, (Date.now() - startedAt) / 1000 + offsetSeconds);
	}

	function startInterval() {
		stopInterval();
		intervalId = setInterval(tickElapsed, 250);
	}

	function stopInterval() {
		if (intervalId !== null) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	function handlePlay() {
		startedAt = Date.now();
		isPlaying = true;
		tickElapsed();
		startInterval();
	}

	function handlePause() {
		if (startedAt !== null) {
			offsetSeconds = elapsedSeconds;
		}
		startedAt = null;
		isPlaying = false;
		stopInterval();
	}

	function handleNudge(deltaSeconds: number) {
		offsetSeconds += deltaSeconds;
		if (isPlaying && startedAt !== null) {
			tickElapsed();
		} else {
			elapsedSeconds = Math.max(0, elapsedSeconds + deltaSeconds);
			offsetSeconds = elapsedSeconds;
		}
	}

	function handleReset() {
		handlePause();
		elapsedSeconds = 0;
		offsetSeconds = 0;
	}

	function handleSeek(seconds: number) {
		const clamped = clampTimestamp(seconds, filmRuntimeSeconds);
		elapsedSeconds = clamped;
		offsetSeconds = clamped;
		if (isPlaying && startedAt !== null) {
			startedAt = Date.now();
		}
	}

	function handleScrubStart() {
		wasPlayingBeforeScrub = isPlaying;
		if (isPlaying) {
			handlePause();
		}
	}

	function handleScrub(seconds: number) {
		handleSeek(seconds);
	}

	function handleScrubEnd() {
		if (wasPlayingBeforeScrub) {
			handlePlay();
		}
	}

	onDestroy(() => {
		stopInterval();
	});
</script>

<svelte:head>
	<title>{data.film.shortTitle} | Feast of the Rings</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
	<header class="mb-6">
		<h1 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{data.film.title}</h1>

		<FilmStepper {step} onchange={handleStepChange} />

		<p class="mt-3 text-sm text-gray-600 dark:text-gray-400">{STEP_SUBTITLES[step]}</p>
	</header>

	{#if step === 'plan'}
		<section class="mb-6" aria-label="Feast timeline">
			<Timeline
				dishes={allDishes}
				{edition}
				{filmId}
				selectedDishIds={feastPlan.plan.selectedDishIds}
				highlightSelected={true}
				showCheckboxes={false}
			/>
		</section>

		<section class="space-y-4" aria-label="Dish selection">
			<DishFilterMenu
				tierFilter={feastPlan.plan.tierFilter}
				{kindFilter}
				{viewMode}
				dishCount={browseDishes.length}
				onTierChange={(filter) => feastPlan.setTierFilter(filter)}
				onKindChange={(value) => (kindFilter = value)}
				onViewChange={setViewMode}
			/>

			<DishBrowse
				dishes={allDishes}
				{edition}
				selectedDishIds={feastPlan.plan.selectedDishIds}
				{kindFilter}
				{viewMode}
				onToggleDish={(id) => feastPlan.toggleDish(id)}
			/>
		</section>
	{:else if step === 'menu'}
		{#if plannedDishes.length === 0}
			<div
				class="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-600"
			>
				<p class="text-gray-600 dark:text-gray-400">
					No dishes selected yet.
					<button type="button" class={feastTheme.link} onclick={() => handleStepChange('plan')}>
						Go to Plan
					</button>
				</p>
			</div>
		{:else}
			<div class="mx-auto max-w-3xl space-y-8">
				<section aria-label="Headcount">
					<HeadcountControl
						headcount={feastPlan.plan.headcount}
						onChange={(value) => feastPlan.setHeadcount(value)}
					/>
				</section>

				<section aria-label="Menu" class="space-y-4">
					<div>
						<h2 class="text-lg font-semibold text-gray-900 dark:text-white">
							{plannedDishes.length} beat{plannedDishes.length === 1 ? '' : 's'} in your menu
						</h2>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							Each dish shows what you'll need for your party. Pick a serving option where
							alternatives exist.
						</p>
					</div>

					<ul class="space-y-4" role="list">
						{#each plannedDishes as dish (dish.id)}
							<li>
								<FeastDetailCard
									{dish}
									{edition}
									headcount={feastPlan.plan.headcount}
									selectedSuggestionId={feastPlan.plan.selectedSuggestions[dish.id]}
									onSelectSuggestion={(suggestionId) =>
										feastPlan.setSuggestion(dish.id, suggestionId)}
								/>
							</li>
						{/each}
					</ul>
				</section>
			</div>
		{/if}
	{:else}
		<div class="mb-6">
			<SyncControls
				{isPlaying}
				{elapsedSeconds}
				maxSeconds={filmRuntimeSeconds}
				nextDishName={syncStatus?.nextDish?.name ?? null}
				secondsUntilNext={syncStatus?.secondsUntilNext ?? null}
				prepDishName={syncStatus?.prepDish?.name ?? null}
				onPlay={handlePlay}
				onPause={handlePause}
				onNudge={handleNudge}
				onReset={handleReset}
				onSeek={handleSeek}
			/>
		</div>

		<Timeline
			dishes={timelineDishes}
			{edition}
			{filmId}
			selectedDishIds={feastPlan.plan.selectedDishIds}
			showCheckboxes={true}
			currentElapsedSeconds={elapsedSeconds}
			onToggleDish={(id) => feastPlan.toggleDish(id)}
			onScrubStart={handleScrubStart}
			onScrub={handleScrub}
			onScrubEnd={handleScrubEnd}
		/>
	{/if}
</div>

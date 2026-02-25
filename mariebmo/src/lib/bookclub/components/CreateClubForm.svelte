<script lang="ts">
	interface Props {
		visible: boolean;
		name: string;
		description: string;
		isPublic: boolean;
		submitting: boolean;
		error: string | null;
		onNameChange: (v: string) => void;
		onDescriptionChange: (v: string) => void;
		onIsPublicChange: (v: boolean) => void;
		onSubmit: (e: SubmitEvent) => void;
		onCancel: () => void;
		onShowCreate: () => void;
	}
	let {
		visible,
		name,
		description,
		isPublic,
		submitting,
		error,
		onNameChange,
		onDescriptionChange,
		onIsPublicChange,
		onSubmit,
		onCancel,
		onShowCreate
	}: Props = $props();
</script>

{#if visible}
	<form
		onsubmit={onSubmit}
		class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
	>
		<h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
			Create a club
		</h2>
		{#if error}
			<p class="mb-3 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
		{/if}
		<div class="space-y-3">
			<div>
				<label for="create-name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
					Name *
				</label>
				<input
					id="create-name"
					type="text"
					value={name}
					oninput={(e) => onNameChange(e.currentTarget.value)}
					required
					maxlength={100}
					class="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
					aria-required="true"
				/>
			</div>
			<div>
				<label for="create-desc" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
					Description
				</label>
				<textarea
					id="create-desc"
					value={description}
					oninput={(e) => onDescriptionChange(e.currentTarget.value)}
					rows={2}
					maxlength={500}
					class="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
				></textarea>
			</div>
			<div class="flex items-center gap-2">
				<input
					id="create-public"
					type="checkbox"
					checked={isPublic}
					onchange={(e) => onIsPublicChange(e.currentTarget.checked)}
					class="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-700"
				/>
				<label for="create-public" class="text-sm text-slate-700 dark:text-slate-300">
					Public club
				</label>
			</div>
		</div>
		<div class="mt-4 flex gap-2">
			<button
				type="submit"
				disabled={submitting || !name.trim()}
				class="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500"
			>
				{submitting ? 'Creating...' : 'Create'}
			</button>
			<button
				type="button"
				onclick={onCancel}
				class="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
			>
				Cancel
			</button>
		</div>
	</form>
{:else}
	<button
		type="button"
		onclick={onShowCreate}
		class="rounded-xl border-2 border-dashed border-slate-300 px-6 py-4 text-slate-600 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:bg-slate-800"
	>
		+ Create a club
	</button>
{/if}

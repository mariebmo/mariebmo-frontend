<script lang="ts">
	interface Props {
		name: string;
		description: string;
		theme: string;
		isPublic: boolean;
		inviteSlug: string;
		invitePassword: string;
		allowComments: boolean;
		allowRatings: boolean;
		allowDnfVote: boolean;
		allowMeetupVote: boolean;
		allowMeetupDetails: boolean;
		submitting: boolean;
		error: string | null;
		onNameChange: (v: string) => void;
		onDescriptionChange: (v: string) => void;
		onThemeChange: (v: string) => void;
		onIsPublicChange: (v: boolean) => void;
		onInviteSlugChange: (v: string) => void;
		onInvitePasswordChange: (v: string) => void;
		onAllowCommentsChange: (v: boolean) => void;
		onAllowRatingsChange: (v: boolean) => void;
		onAllowDnfVoteChange: (v: boolean) => void;
		onAllowMeetupVoteChange: (v: boolean) => void;
		onAllowMeetupDetailsChange: (v: boolean) => void;
		onSubmit: (e: SubmitEvent) => void;
	}
	let {
		name,
		description,
		theme,
		isPublic,
		inviteSlug,
		invitePassword,
		allowComments,
		allowRatings,
		allowDnfVote,
		allowMeetupVote,
		allowMeetupDetails,
		submitting,
		error,
		onNameChange,
		onDescriptionChange,
		onThemeChange,
		onIsPublicChange,
		onInviteSlugChange,
		onInvitePasswordChange,
		onAllowCommentsChange,
		onAllowRatingsChange,
		onAllowDnfVoteChange,
		onAllowMeetupVoteChange,
		onAllowMeetupDetailsChange,
		onSubmit
	}: Props = $props();
</script>

<section
	class="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
>
	<h2 class="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-100">Club settings</h2>
	{#if error}
		<p class="mb-3 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
	{/if}
	<form onsubmit={onSubmit} class="space-y-3">
		<div>
			<label for="settings-name" class="block text-sm font-medium text-slate-700 dark:text-slate-300"
				>Name</label
			>
			<input
				id="settings-name"
				type="text"
				value={name}
				oninput={(e) => onNameChange(e.currentTarget.value)}
				maxlength={100}
				class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
			/>
		</div>
		<div>
			<label for="settings-desc" class="block text-sm font-medium text-slate-700 dark:text-slate-300"
				>Description</label
			>
			<textarea
				id="settings-desc"
				value={description}
				oninput={(e) => onDescriptionChange(e.currentTarget.value)}
				rows={2}
				maxlength={500}
				class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
			></textarea>
		</div>
		<div>
			<label for="settings-theme" class="block text-sm font-medium text-slate-700 dark:text-slate-300"
				>Theme (e.g. Classic literature)</label
			>
			<input
				id="settings-theme"
				type="text"
				value={theme}
				oninput={(e) => onThemeChange(e.currentTarget.value)}
				maxlength={200}
				class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
			/>
		</div>
		<div class="flex items-center gap-2">
			<input
				id="settings-public"
				type="checkbox"
				checked={isPublic}
				onchange={(e) => onIsPublicChange(e.currentTarget.checked)}
				class="h-4 w-4 rounded border-slate-300 text-slate-600 dark:border-slate-600 dark:bg-slate-700"
			/>
			<label for="settings-public" class="text-sm text-slate-700 dark:text-slate-300"
				>Public club</label
			>
		</div>
		<div>
			<label
				for="settings-invite-slug"
				class="block text-sm font-medium text-slate-700 dark:text-slate-300"
				>Invite slug (for join link)</label
			>
			<input
				id="settings-invite-slug"
				type="text"
				value={inviteSlug}
				oninput={(e) => onInviteSlugChange(e.currentTarget.value)}
				placeholder="e.g. my-club"
				maxlength={100}
				class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
			/>
		</div>
		<div>
			<label
				for="settings-invite-pw"
				class="block text-sm font-medium text-slate-700 dark:text-slate-300"
				>Invite password (optional)</label
			>
			<input
				id="settings-invite-pw"
				type="password"
				value={invitePassword}
				oninput={(e) => onInvitePasswordChange(e.currentTarget.value)}
				placeholder="Leave blank to remove"
				class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
			/>
		</div>
		<div class="space-y-2 border-t border-slate-200 pt-3 dark:border-slate-600">
			<p class="text-sm font-medium text-slate-700 dark:text-slate-300">Features</p>
			<div class="flex flex-wrap gap-4">
				<label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
					<input
						type="checkbox"
						checked={allowComments}
						onchange={(e) => onAllowCommentsChange(e.currentTarget.checked)}
						class="rounded border-slate-300"
					/>
					Comments
				</label>
				<label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
					<input
						type="checkbox"
						checked={allowRatings}
						onchange={(e) => onAllowRatingsChange(e.currentTarget.checked)}
						class="rounded border-slate-300"
					/>
					Ratings
				</label>
				<label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
					<input
						type="checkbox"
						checked={allowDnfVote}
						onchange={(e) => onAllowDnfVoteChange(e.currentTarget.checked)}
						class="rounded border-slate-300"
					/>
					DNF vote
				</label>
				<label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
					<input
						type="checkbox"
						checked={allowMeetupVote}
						onchange={(e) => onAllowMeetupVoteChange(e.currentTarget.checked)}
						class="rounded border-slate-300"
					/>
					Meetup vote
				</label>
				<label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
					<input
						type="checkbox"
						checked={allowMeetupDetails}
						onchange={(e) => onAllowMeetupDetailsChange(e.currentTarget.checked)}
						class="rounded border-slate-300"
					/>
					Meetup details
				</label>
			</div>
		</div>
		<button
			type="submit"
			disabled={submitting}
			class="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-500"
		>
			{submitting ? 'Saving...' : 'Save settings'}
		</button>
	</form>
</section>

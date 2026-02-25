<script lang="ts">
	import type { BookClubDto } from '$lib/bookclub/types';

	interface Props {
		club: BookClubDto;
		memberCount: number;
		nextMeetingLabel: string;
		scheduleLabel: string;
		effectiveIsAdmin: boolean;
		showSettings: boolean;
		showAddBook: boolean;
		inviteCopyDone: boolean;
		inviteUrl: string;
		onToggleSettings: () => void;
		onToggleAddBook: () => void;
		onCopyInvite: () => void;
	}
	let {
		club,
		memberCount,
		nextMeetingLabel,
		scheduleLabel,
		effectiveIsAdmin,
		showSettings,
		showAddBook,
		inviteCopyDone,
		inviteUrl,
		onToggleSettings,
		onToggleAddBook,
		onCopyInvite
	}: Props = $props();
</script>

<div
	class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
>
	<div
		class="relative flex min-h-[180px] flex-col justify-end bg-slate-700 px-6 py-6 sm:min-h-[220px]"
		style={club.coverImage
			? `background-image: url(${club.coverImage}); background-size: cover; background-position: center;`
			: ''}
	>
		{#if !club.coverImage}
			<div
				class="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-slate-800/95 to-slate-900"
				aria-hidden="true"
			></div>
		{:else}
			<div class="absolute inset-0 bg-slate-900/60" aria-hidden="true"></div>
		{/if}
		<div class="relative z-10">
			<h1 class="text-2xl font-bold tracking-tight text-white drop-shadow sm:text-3xl">
				{club.name}
			</h1>
			<div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/95">
				<span class="inline-flex items-center gap-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 01-12 0v1zm0 0v-4.354a4 4 0 114 0V21z"
						/>
					</svg>
					{memberCount} member{memberCount === 1 ? '' : 's'}
				</span>
				<span class="inline-flex items-center gap-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					{nextMeetingLabel}
				</span>
			</div>
		</div>
	</div>
	<div
		class="flex flex-col gap-4 border-t border-slate-100 p-6 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
	>
		<div class="min-w-0 flex-1">
			{#if club.description}
				<p class="text-slate-600 dark:text-slate-400">{club.description}</p>
			{/if}
			{#if club.inviteSlug && effectiveIsAdmin}
				<div class="mt-2 flex items-center gap-2">
					<button
						type="button"
						onclick={onCopyInvite}
						class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
						aria-label="Copy invite link"
					>
						{inviteCopyDone ? 'Copied!' : 'Copy invite link'}
					</button>
				</div>
			{/if}
		</div>
		<div class="flex shrink-0 flex-wrap items-center gap-2">
			{#if effectiveIsAdmin}
				<button
					type="button"
					onclick={onToggleSettings}
					class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
					aria-label={showSettings ? 'Hide club settings' : 'Open club settings'}
				>
					{showSettings ? 'Hide settings' : 'Club settings'}
				</button>
				<button
					type="button"
					onclick={onToggleAddBook}
					class="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
					aria-label={showAddBook ? 'Cancel adding book' : 'Add book'}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2z"
						/>
					</svg>
					{showAddBook ? 'Cancel' : 'Add book'}
				</button>
			{:else}
				<span
					class="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-white"
					aria-label="You are a member"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					Member
				</span>
			{/if}
		</div>
	</div>
</div>

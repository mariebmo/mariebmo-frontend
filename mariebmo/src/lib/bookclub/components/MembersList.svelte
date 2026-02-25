<script lang="ts">
	import type { BookClubMemberDto, BookClubDto } from '$lib/bookclub/types';

	interface Props {
		members: BookClubMemberDto[];
		club: BookClubDto | null;
		effectiveIsAdmin: boolean;
		onRemoveMember: (memberId: string) => void;
	}
	let { members, club, effectiveIsAdmin, onRemoveMember }: Props = $props();
</script>

<section
	class="mt-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800"
	aria-labelledby="members-heading"
>
	<h2 id="members-heading" class="mb-4 text-lg font-bold text-slate-900 dark:text-white">
		Members
	</h2>
	<ul class="space-y-2" role="list">
		{#each members as member (member.id)}
			<li
				class="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-2.5 dark:border-slate-600 dark:bg-slate-700/30"
			>
				<div class="min-w-0 flex-1 truncate">
					<span class="text-sm font-medium text-slate-700 dark:text-slate-300"
						>{member.displayName || member.email}</span
					>
					<span class="ml-2 text-xs text-slate-500 dark:text-slate-400">
						{member.role}
						{#if member.currentBookProgress}
							· {member.currentBookProgress.joinStatus}
						{/if}
					</span>
				</div>
				{#if effectiveIsAdmin && club && member.userId !== club.adminId}
					<button
						type="button"
						onclick={() => onRemoveMember(member.id)}
						class="shrink-0 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
						aria-label="Remove member"
					>
						Remove
					</button>
				{/if}
			</li>
		{/each}
	</ul>
</section>

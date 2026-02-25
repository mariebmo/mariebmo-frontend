<script lang="ts">
	import type { BookClubDto } from '$lib/bookclub/types';

	interface Props {
		club: BookClubDto;
		basePath: string;
	}
	let { club, basePath }: Props = $props();
</script>

<li>
	<a
		href="{basePath}/{club.id}"
		class="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-slate-900/30"
	>
		{#if club.coverImage}
			<img
				src={club.coverImage}
				alt=""
				class="h-32 w-full object-cover"
				width="400"
				height="128"
			/>
		{:else}
			<div
				class="flex h-32 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800"
				aria-hidden="true"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-12 w-12 text-slate-400 dark:text-slate-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
					/>
				</svg>
			</div>
		{/if}
		<div class="p-4">
			<h3 class="font-semibold text-slate-900 dark:text-white">{club.name}</h3>
			{#if club.description}
				<p class="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
					{club.description}
				</p>
			{:else if club.theme}
				<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{club.theme}</p>
			{/if}
			<p class="mt-2 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
				<span>{club.memberCount} member{club.memberCount === 1 ? '' : 's'}</span>
				{#if club.currentBook}
					<span class="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3.5 w-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
						Reading: {club.currentBook.title}
					</span>
				{/if}
			</p>
		</div>
	</a>
</li>

<script lang="ts">
	interface Props {
		nextMeetingDate: string | null;
		scheduleLabel: string;
	}
	let { nextMeetingDate, scheduleLabel }: Props = $props();
</script>

<section
	class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-800"
	aria-labelledby="meeting-schedule-heading"
>
	<h2 id="meeting-schedule-heading" class="mb-4 text-lg font-bold text-slate-900 dark:text-white">
		Meeting Schedule
	</h2>
	<div class="space-y-4">
		<div class="flex gap-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 shrink-0 text-amber-500"
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
			<div>
				<p class="font-semibold text-slate-900 dark:text-white">Next Meeting</p>
				<p class="text-sm text-slate-600 dark:text-slate-400">
					{nextMeetingDate ?? 'Not scheduled'}
				</p>
			</div>
		</div>
		<div class="flex gap-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 shrink-0 text-amber-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<div>
				<p class="font-semibold text-slate-900 dark:text-white">Schedule</p>
				<p class="text-sm text-slate-600 dark:text-slate-400">{scheduleLabel}</p>
			</div>
		</div>
	</div>
</section>

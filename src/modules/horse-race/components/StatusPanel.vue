<script setup lang="ts">
import { computed, ref } from "vue";
import type { RaceState } from "../types";

const store = useStore<RaceState>();
const schedule = computed(() => store.state.schedule);
const results = computed(() => store.state.results);

const scheduleScroll = ref<HTMLElement | null>(null);
const resultsScroll = ref<HTMLElement | null>(null);
let isScrolling = false;

const onScheduleScroll = (e: Event) => {
  if (isScrolling) return;
  isScrolling = true;

  const target = e.target as HTMLElement;
  if (resultsScroll.value) {
    resultsScroll.value.scrollTop = target.scrollTop;
  }

  requestAnimationFrame(() => {
    isScrolling = false;
  });
};

const onResultsScroll = (e: Event) => {
  if (isScrolling) return;
  isScrolling = true;

  const target = e.target as HTMLElement;
  if (scheduleScroll.value) {
    scheduleScroll.value.scrollTop = target.scrollTop;
  }
};
</script>

<template>
  <div class="flex flex-row h-full gap-2 p-2 bg-[#0f172a]">
    <div class="flex-1 flex flex-col border border-slate-800 rounded-lg bg-slate-900/20 min-h-0">
      <div
        class="bg-blue-600/80 text-white text-[10px] font-black py-1.5 px-3 text-center uppercase tracking-widest border-b border-blue-500/30 flex-shrink-0"
      >
        Race Program
      </div>

      <div
        ref="scheduleScroll"
        @scroll="onScheduleScroll"
        class="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-1 space-y-4 min-h-0"
      >
        <div v-for="round in schedule" :key="round.id" class="flex flex-col flex-shrink-0">
          <div
            class="bg-orange-600 text-[9px] font-bold px-2 py-0.5 text-white flex justify-between rounded-t"
          >
            <span>{{ round.id }}st Lap</span>
            <span>{{ round.distance }}m</span>
          </div>

          <BaseTable :data="round.participants" class="compact-table">
            <BaseColumn dataKey="name" label="Horse Name" width="100%" align="left" />
          </BaseTable>
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col border border-slate-800 rounded-lg bg-slate-900/20 min-h-0">
      <div
        class="bg-green-600/80 text-white text-[10px] font-black py-1.5 px-3 text-center uppercase tracking-widest border-b border-green-500/30 flex-shrink-0"
      >
        Race Results
      </div>

      <div
        ref="resultsScroll"
        @scroll="onResultsScroll"
        class="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-1 space-y-4 min-h-0"
      >
        <div
          v-if="results.length === 0"
          class="h-full flex items-center justify-center text-[9px] text-slate-600 italic px-4 text-center"
        >
          Waiting for race results...
        </div>

        <div v-for="res in results" :key="res.roundId" class="flex flex-col flex-shrink-0">
          <div
            class="bg-orange-600 text-[9px] font-bold px-2 py-0.5 text-white flex justify-between rounded-t"
          >
            <span>{{ res.roundId }}st Lap</span>
            <span>{{ res.distance }}m</span>
          </div>

          <BaseTable :data="res.winners" class="compact-table">
            <BaseColumn
              dataKey="name"
              label="Horse Name"
              width="100%"
              align="left"
              :cellRenderer="({ row }: { row: any }) => `${row.position}. ${row.name}`"
            />
          </BaseTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { RaceState } from "../types";
import horseImg from "@/assets/images/horse-1.png";
import horseImg2 from "@/assets/images/horse-2.png";
import horseImg3 from "@/assets/images/horse-3.png";
import horseImg4 from "@/assets/images/horse-4.png";

const store = useStore<RaceState>();
const currentRoundIndex = computed(() => store.state.currentRoundIndex);
const activeRound = computed(() => store.getters.activeRound);
const hasSchedule = computed(() => store.state.schedule.length > 0);
</script>

<template>
  <div class="relative w-full h-full bg-[#0f172a] overflow-hidden flex flex-col p-4">
    <div v-if="!hasSchedule" class="flex-1 flex items-center justify-center">
      <div class="text-center space-y-2">
        <p class="text-slate-400 text-sm">Rounds have not been defined yet!</p>
      </div>
    </div>

    <template v-else>
      <div class="flex justify-between items-center mb-4 px-2">
        <span class="text-[20px] font-bold tracking-[0.2em] text-orange-600 uppercase">
          {{ currentRoundIndex + 1 }}ST lab</span
        >
        <span class="text-[10px] font-bold tracking-[0.2em] text-orange-500 uppercase italic"
          >Finish</span
        >
      </div>

      <div class="flex-1 flex flex-col relative border-y border-slate-800">
        <div
          class="absolute right-12 top-0 bottom-0 w-1 bg-orange-600/30 border-r border-orange-500/50 z-10 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
        ></div>

        <div
          v-for="horse in activeRound?.participants || []"
          :key="horse.id"
          class="flex-1 flex items-center relative border-b border-slate-800/50 last:border-0 group hover:bg-slate-800/30 transition-colors"
        >
          <div
            class="relative flex items-center transition-all duration-500 ease-linear"
            :style="{ left: '0%' }"
          >
            <img
              :src="horseImg"
              alt="Horse"
              class="h-8 w-auto object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
              :style="{ filter: `invert(1) brightness(1.5) drop-shadow(0 0 8px ${horse.color})` }"
            />

            <div
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap"
            >
              <span
                class="text-[9px] font-bold px-1.5 py-0.5 rounded border flex items-center gap-1.5"
                :style="{
                  backgroundColor: `${horse.color}15`,
                  borderColor: `${horse.color}60`,
                  color: horse.color,
                }"
              >
                <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: horse.color }"></span>
                {{ horse.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
img {
  transition: filter 0.3s ease;
}
</style>

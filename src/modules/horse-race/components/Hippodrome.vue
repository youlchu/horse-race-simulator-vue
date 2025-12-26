<script setup lang="ts">
import { useRaceEngine } from "../composable/useRaceEngine";
import type { RaceState, RaceWinner } from "../types";
import RaceResultDialog from "./RaceResultDialog.vue";

const store = useStore<RaceState>();
const currentRoundIndex = computed(() => store.state.currentRoundIndex);
const activeRound = computed(() => store.getters.activeRound);
const hasSchedule = computed(() => store.state.schedule.length > 0);
const isRaceActive = computed(() => store.state.isRaceActive);

const raceEngine = useRaceEngine(computed(() => activeRound.value?.participants || []));

const showResultDialog = ref(false);
const currentRaceResult = ref<{
  roundId: number;
  distance: number;
  winners: RaceWinner[];
} | null>(null);

watch(isRaceActive, (active) => {
  if (!activeRound.value) return;

  if (active) {
    raceEngine.start(() => {
      store.dispatch("toggleRace");

      const winners = raceEngine.getResults();

      store.dispatch("addResult", {
        roundId: activeRound.value!.id,
        distance: activeRound.value!.distance,
        winners,
      });

      currentRaceResult.value = {
        roundId: activeRound.value!.id,
        distance: activeRound.value!.distance,
        winners,
      };
      showResultDialog.value = true;
    });
  } else {
    raceEngine.stop();
  }
});

const handleCloseDialog = () => {
  showResultDialog.value = false;

  setTimeout(() => {
    if (currentRoundIndex.value < store.state.schedule.length - 1) {
      store.commit("NEXT_ROUND");
    }
  }, 300);
};
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
          {{ currentRoundIndex + 1 }}ST lap
        </span>
        <span class="text-[10px] font-bold tracking-[0.2em] text-orange-500 uppercase italic">
          Finish
        </span>
      </div>

      <div class="flex-1 flex flex-col relative border-y border-slate-800">
        <div
          class="absolute right-[2%] top-0 bottom-0 w-1 bg-orange-600/30 border-r border-orange-500/50 z-10"
        ></div>

        <div
          v-for="horse in activeRound?.participants || []"
          :key="horse.id"
          class="flex-1 flex items-center relative border-b border-slate-800/50 last:border-0 group hover:bg-slate-800/30 transition-colors"
        >
          <div
            class="relative flex items-center"
            :style="{
              left: `${raceEngine.getPosition(horse.id)}%`,
              transition: 'left 0.05s linear',
            }"
          >
            <div
              v-if="raceEngine.getNamePosition(horse.id) === 'front'"
              class="absolute right-full mr-2 whitespace-nowrap"
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
            <div class="relative inline-flex items-center">
              <div
                class="h-8 w-16 relative"
                :style="{
                  backgroundColor: horse.color,
                  maskImage: `url(${raceEngine.getHorseImage(horse.id)})`,
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  transform: 'translateZ(0)',
                }"
              ></div>
            </div>
            <div
              v-if="raceEngine.getNamePosition(horse.id) === 'back'"
              class="absolute left-full ml-2 whitespace-nowrap"
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

    <RaceResultDialog
      v-if="currentRaceResult"
      :show="showResultDialog"
      :round-id="currentRaceResult.roundId"
      :distance="currentRaceResult.distance"
      :winners="currentRaceResult.winners"
      @close="handleCloseDialog"
    />
  </div>
</template>

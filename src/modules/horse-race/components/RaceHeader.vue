<script setup lang="ts">
import type { RaceState } from "../types";

const store = useStore<RaceState>();

const hasSchedule = computed(() => store.state.schedule.length > 0);

const handleGenerateProgram = () => {
  store.dispatch("createSchedule", 6);
  console.log("Generated Schedule:", store.state.schedule);
};

const handleToggleRace = () => {
  if (!hasSchedule.value) return;
  store.dispatch("toggleRace");
};
</script>

<template>
  <header
    class="flex items-center justify-between p-4 border border-slate-800 rounded mb-4 shadow-sm"
  >
    <div class="flex items-center gap-4">
      <router-link
        to="/"
        class="flex items-center justify-center p-2 rounded-full hover:bg-slate-800 transition-colors group"
        title="Back to Menu"
      >
        <img
          src="@/assets/icons/back.png"
          alt="Back"
          class="w-5 h-5 brightness-0 invert group-hover:opacity-80 transition-opacity"
        />
      </router-link>

      <div class="text-xl uppercase">Horse Racing</div>
    </div>

    <div class="flex gap-4">
      <BaseButton variant="secondary" @click="handleGenerateProgram" :disabled="hasSchedule">
        Generate Program
      </BaseButton>

      <BaseButton variant="primary" @click="handleToggleRace" :disabled="!hasSchedule">
        {{ store.state.isRaceActive ? "Pause" : "Start" }}
      </BaseButton>
    </div>
  </header>
</template>

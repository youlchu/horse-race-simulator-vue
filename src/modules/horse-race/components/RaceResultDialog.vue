<script setup lang="ts">
import { computed } from "vue";
import type { RaceWinner } from "../types";

interface Props {
  show: boolean;
  roundId: number;
  distance: number;
  winners: RaceWinner[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const sortedWinners = computed(() => {
  return [...props.winners].sort((a, b) => a.position - b.position);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div
          class="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-[600px] max-h-[80vh] overflow-hidden flex flex-col"
        >
          <div class="bg-orange-600 px-6 py-3 flex-shrink-0">
            <h2 class="text-lg font-bold text-white text-center uppercase">
              Race Results - Round {{ roundId }}
            </h2>
            <p class="text-center text-orange-100 text-xs">{{ distance }}m</p>
          </div>

          <div class="flex-1 overflow-hidden">
            <BaseTable :data="sortedWinners">
              <BaseColumn dataKey="position" label="Pos" width="15%" align="center" />
              <BaseColumn dataKey="name" label="Horse Name" width="50%" align="left" />
              <BaseColumn
                dataKey="finishTime"
                label="Time"
                width="35%"
                align="center"
                :cellRenderer="({ value }: { value: number }) => `${(value / 1000).toFixed(2)}s`"
              />
            </BaseTable>
          </div>

          <div
            class="px-6 py-3 bg-slate-800/50 border-t border-slate-700 flex justify-center flex-shrink-0"
          >
            <BaseButton variant="primary" @click="emit('close')"> Continue </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>

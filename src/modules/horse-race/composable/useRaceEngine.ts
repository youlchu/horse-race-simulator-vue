import { horseImg1, horseImg2, horseImg3, horseImg4 } from "@/assets/images";
import type { Horse, RaceEngineState, RaceWinner } from "../types";
import { calculateSpeed } from "../utils/raceUtils";

export function useRaceEngine(participants: Ref<Horse[]>) {
  // ========== STATE ==========
  const state = ref<RaceEngineState>({
    positions: new Map(),
    isRunning: false,
    animationFrameId: null,
    finishTimes: new Map(),
  });

  const horseFrames = ref<Map<number, number>>(new Map());
  const horseImages = [horseImg1, horseImg2, horseImg3, horseImg4];

  // ========== CONSTANTS ==========
  const FINISH_LINE = 95;
  const FRAME_INTERVAL = 150; // ms per frame

  // ========== INITIALIZATION ==========
  const initialize = () => {
    state.value.positions.clear();
    state.value.finishTimes.clear();
    horseFrames.value.clear();

    participants.value.forEach((horse) => {
      state.value.positions.set(horse.id, 0);
      horseFrames.value.set(horse.id, 0);
    });
  };

  // ========== ANIMATION ==========
  let lastFrameUpdate = 0;

  const updateFrames = (positions: Map<number, number>) => {
    const now = performance.now();

    if (now - lastFrameUpdate >= FRAME_INTERVAL) {
      participants.value.forEach((horse) => {
        const position = positions.get(horse.id) || 0;

        if (position < FINISH_LINE) {
          const current = horseFrames.value.get(horse.id) || 0;
          horseFrames.value.set(horse.id, (current + 1) % 4);
        } else {
          horseFrames.value.set(horse.id, 0);
        }
      });

      lastFrameUpdate = now;
    }
  };

  // ========== RACE CONTROL ==========
  const start = (onFinish?: (finishTimes: Map<number, number>) => void) => {
    if (state.value.isRunning) return;

    state.value.isRunning = true;
    state.value.finishTimes.clear();

    const finishedHorses = new Set<number>();
    const startTime = performance.now();
    lastFrameUpdate = startTime;

    const animate = () => {
      if (!state.value.isRunning) {
        if (state.value.animationFrameId) {
          cancelAnimationFrame(state.value.animationFrameId);
        }
        return;
      }

      const currentTime = performance.now() - startTime;

      // Update positions
      participants.value.forEach((horse) => {
        const currentPos = state.value.positions.get(horse.id) || 0;

        if (currentPos < FINISH_LINE) {
          const speed = calculateSpeed(horse.condition);
          const newPos = currentPos + speed;
          state.value.positions.set(horse.id, Math.min(FINISH_LINE, newPos));

          // Check finish
          if (newPos >= FINISH_LINE && !finishedHorses.has(horse.id)) {
            finishedHorses.add(horse.id);
            state.value.finishTimes.set(horse.id, currentTime);
          }
        }
      });

      // Update animation frames
      updateFrames(state.value.positions);

      // Check if all finished
      if (finishedHorses.size >= participants.value.length) {
        stop();

        if (onFinish) {
          setTimeout(() => {
            onFinish(state.value.finishTimes);
          }, 500);
        }
      } else {
        state.value.animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const stop = () => {
    state.value.isRunning = false;
    if (state.value.animationFrameId) {
      cancelAnimationFrame(state.value.animationFrameId);
      state.value.animationFrameId = null;
    }
  };

  const reset = () => {
    stop();
    initialize();
  };

  // ========== GETTERS ==========
  const getPosition = (horseId: number): number => {
    return state.value.positions.get(horseId) || 0;
  };

  const getHorseImage = (horseId: number): string => {
    const frameIndex = horseFrames.value.get(horseId) || 0;
    return horseImages[frameIndex] || horseImg1;
  };

  const getNamePosition = (horseId: number): "front" | "back" => {
    const pos = getPosition(horseId);
    return pos > 50 ? "front" : "back";
  };

  const getResults = (): RaceWinner[] => {
    return participants.value
      .map((horse) => ({
        position: 0,
        horseId: horse.id,
        name: horse.name,
        color: horse.color,
        finishTime: state.value.finishTimes.get(horse.id) || 0,
      }))
      .sort((a, b) => a.finishTime - b.finishTime)
      .map((winner, index) => ({ ...winner, position: index + 1 }));
  };

  // ========== LIFECYCLE ==========
  watch(
    participants,
    () => {
      initialize();
    },
    { immediate: true }
  );

  onUnmounted(() => {
    stop();
  });

  // ========== PUBLIC API ==========
  return {
    // State
    state: computed(() => state.value),
    isRunning: computed(() => state.value.isRunning),

    // Control methods
    start,
    stop,
    reset,

    // Getters
    getPosition,
    getHorseImage,
    getNamePosition,
    getResults,
  };
}

import type { Horse, RaceState, Round } from "../types";
import { mockHorses } from "../_mocks/horses";
import { generateSchedule } from "../utils/raceUtils";

export const raceStore = createStore<RaceState>({
  state: {
    horses: [],
    schedule: [],
    currentRoundIndex: 0,
    isRaceActive: false,
    results: [],
  },

  mutations: {
    SET_HORSES(state: RaceState, horses: Horse[]) {
      state.horses = horses;
    },

    SET_SCHEDULE(state: RaceState, schedule: Round[]) {
      state.schedule = schedule;
    },
  },

  actions: {
    initializeHorses({ commit }: { commit: (mutation: string, payload?: any) => void }) {
      commit("SET_HORSES", [...mockHorses]);
    },

    createSchedule(
      {
        state,
        commit,
        dispatch,
      }: {
        state: RaceState;
        commit: (mutation: string, payload?: any) => void;
        dispatch: (action: string, payload?: any) => void;
      },
      roundCount: number = 6
    ) {
      if (state.horses.length === 0) {
        dispatch("initializeHorses");
      }

      const schedule = generateSchedule(state.horses, roundCount);
      commit("SET_SCHEDULE", schedule);
    },
  },

  getters: {
    activeRound: (state: RaceState): Round | null => {
      return state.schedule[state.currentRoundIndex] || null;
    },

    totalRounds: (state: RaceState): number => {
      return state.schedule.length;
    },
  },
});

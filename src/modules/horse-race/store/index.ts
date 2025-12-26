import type { Horse, RaceState, Round, RaceResult } from "../types";
import { mockHorses } from "../_mocks/horses";
import { generateSchedule } from "../utils/raceUtils";

// Vuex action context type definitions
type StoreCommit = (mutation: string, payload?: unknown) => void;
type StoreDispatch = (action: string, payload?: unknown) => void;

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

    SET_RACE_ACTIVE(state: RaceState, isActive: boolean) {
      state.isRaceActive = isActive;
    },

    NEXT_ROUND(state: RaceState) {
      state.currentRoundIndex++;
    },

    ADD_RACE_RESULT(state: RaceState, result: RaceResult) {
      state.results.push(result);
    },
  },

  actions: {
    initializeHorses({ commit }: { commit: StoreCommit }) {
      commit("SET_HORSES", [...mockHorses]);
    },

    createSchedule(
      {
        state,
        commit,
        dispatch,
      }: {
        state: RaceState;
        commit: StoreCommit;
        dispatch: StoreDispatch;
      },
      roundCount: number = 6
    ) {
      if (state.horses.length === 0) {
        dispatch("initializeHorses");
      }

      const schedule = generateSchedule(state.horses, roundCount);
      commit("SET_SCHEDULE", schedule);
    },

    toggleRace({ state, commit }: { state: RaceState; commit: StoreCommit }) {
      commit("SET_RACE_ACTIVE", !state.isRaceActive);
    },

    addResult({ commit }: { commit: StoreCommit }, result: RaceResult) {
      commit("ADD_RACE_RESULT", result);
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

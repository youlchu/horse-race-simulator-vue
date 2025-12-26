import { describe, it, expect, beforeEach } from "vitest";

import type { Horse, RaceState, Round, RaceResult } from "../../types";
import { mockHorses } from "../../_mocks/horses";
import * as raceUtils from "../../utils/raceUtils";
import type { ActionContext, Store } from "vuex/types/index.js";

const createRaceStore = () =>
  createStore<RaceState>({
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

      RESET_ROUND_INDEX(state: RaceState) {
        state.currentRoundIndex = 0;
      },
    },

    actions: {
      initializeHorses({ commit }: ActionContext<RaceState, RaceState>) {
        commit("SET_HORSES", [...mockHorses]);
      },

      createSchedule(
        { state, commit, dispatch }: ActionContext<RaceState, RaceState>,
        roundCount: number = 6
      ) {
        if (state.horses.length === 0) {
          dispatch("initializeHorses");
        }

        const schedule = raceUtils.generateSchedule(state.horses, roundCount);
        commit("SET_SCHEDULE", schedule);
      },

      toggleRace({ state, commit }: ActionContext<RaceState, RaceState>) {
        commit("SET_RACE_ACTIVE", !state.isRaceActive);
      },

      addResult({ commit }: ActionContext<RaceState, RaceState>, result: RaceResult) {
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

describe("Race Store", () => {
  let store: Store<RaceState>;

  beforeEach(() => {
    store = createRaceStore();
  });

  describe("Initial State", () => {
    it("should have correct initial state", () => {
      expect(store.state.horses).toEqual([]);
      expect(store.state.schedule).toEqual([]);
      expect(store.state.currentRoundIndex).toBe(0);
      expect(store.state.isRaceActive).toBe(false);
      expect(store.state.results).toEqual([]);
    });
  });

  describe("Mutations", () => {
    describe("SET_HORSES", () => {
      it("should set horses in state", () => {
        const horses: Horse[] = [{ id: 1, name: "Test Horse", color: "#ff0000", condition: 85 }];

        store.commit("SET_HORSES", horses);

        expect(store.state.horses).toEqual(horses);
        expect(store.state.horses).toHaveLength(1);
      });

      it("should replace existing horses", () => {
        const firstHorses: Horse[] = [{ id: 1, name: "Horse 1", color: "#ff0000", condition: 85 }];
        const secondHorses: Horse[] = [{ id: 2, name: "Horse 2", color: "#00ff00", condition: 90 }];

        store.commit("SET_HORSES", firstHorses);
        store.commit("SET_HORSES", secondHorses);

        expect(store.state.horses).toEqual(secondHorses);
        expect(store.state.horses).toHaveLength(1);
      });
    });

    describe("SET_SCHEDULE", () => {
      it("should set schedule in state", () => {
        const schedule: Round[] = [
          {
            id: 1,
            distance: 1200,
            participants: [],
            results: [],
            status: "waiting",
          },
        ];

        store.commit("SET_SCHEDULE", schedule);

        expect(store.state.schedule).toEqual(schedule);
      });
    });

    describe("SET_RACE_ACTIVE", () => {
      it("should set race active to true", () => {
        store.commit("SET_RACE_ACTIVE", true);
        expect(store.state.isRaceActive).toBe(true);
      });

      it("should set race active to false", () => {
        store.commit("SET_RACE_ACTIVE", true);
        store.commit("SET_RACE_ACTIVE", false);
        expect(store.state.isRaceActive).toBe(false);
      });
    });

    describe("NEXT_ROUND", () => {
      it("should increment currentRoundIndex", () => {
        expect(store.state.currentRoundIndex).toBe(0);

        store.commit("NEXT_ROUND");
        expect(store.state.currentRoundIndex).toBe(1);

        store.commit("NEXT_ROUND");
        expect(store.state.currentRoundIndex).toBe(2);
      });
    });

    describe("ADD_RACE_RESULT", () => {
      it("should add race result to results array", () => {
        const result: RaceResult = {
          roundId: 1,
          distance: 1200,
          winners: [
            {
              position: 1,
              horseId: 1,
              name: "Winner",
              color: "#ff0000",
              finishTime: 1000,
            },
          ],
        };

        store.commit("ADD_RACE_RESULT", result);

        expect(store.state.results).toHaveLength(1);
        expect(store.state.results[0]).toEqual(result);
      });

      it("should accumulate multiple results", () => {
        const result1: RaceResult = {
          roundId: 1,
          distance: 1200,
          winners: [],
        };
        const result2: RaceResult = {
          roundId: 2,
          distance: 1400,
          winners: [],
        };

        store.commit("ADD_RACE_RESULT", result1);
        store.commit("ADD_RACE_RESULT", result2);

        expect(store.state.results).toHaveLength(2);
        expect(store.state.results[0]).toEqual(result1);
        expect(store.state.results[1]).toEqual(result2);
      });
    });
  });

  describe("Actions", () => {
    describe("initializeHorses", () => {
      it("should initialize horses from mock data", async () => {
        await store.dispatch("initializeHorses");

        expect(store.state.horses).toHaveLength(mockHorses.length);
        expect(store.state.horses).toEqual(mockHorses);
      });

      it("should create a copy of mock horses", async () => {
        await store.dispatch("initializeHorses");

        expect(store.state.horses).not.toBe(mockHorses);
        expect(store.state.horses).toEqual(mockHorses);
      });
    });

    describe("createSchedule", () => {
      it("should initialize horses if not already initialized", async () => {
        expect(store.state.horses).toHaveLength(0);

        await store.dispatch("createSchedule", 3);

        expect(store.state.horses).toHaveLength(mockHorses.length);
      });

      it("should create schedule with specified round count", async () => {
        const roundCount = 4;

        await store.dispatch("createSchedule", roundCount);

        expect(store.state.schedule).toHaveLength(roundCount);
      });

      it("should create schedule with default round count", async () => {
        await store.dispatch("createSchedule");

        expect(store.state.schedule).toHaveLength(6);
      });

      it("should create rounds with correct structure", async () => {
        await store.dispatch("createSchedule", 2);

        const round = store.state.schedule[0];
        expect(round).toHaveProperty("id");
        expect(round).toHaveProperty("distance");
        expect(round).toHaveProperty("participants");
        expect(round).toHaveProperty("results");
        expect(round).toHaveProperty("status");
        expect(round?.status).toBe("waiting");
      });

      it("should create rounds with increasing distances", async () => {
        await store.dispatch("createSchedule", 3);

        expect(store.state.schedule[0]?.distance).toBe(1200);
        expect(store.state.schedule[1]?.distance).toBe(1400);
        expect(store.state.schedule[2]?.distance).toBe(1600);
      });
    });

    describe("toggleRace", () => {
      it("should toggle race state from false to true", async () => {
        expect(store.state.isRaceActive).toBe(false);

        await store.dispatch("toggleRace");

        expect(store.state.isRaceActive).toBe(true);
      });

      it("should toggle race state from true to false", async () => {
        store.commit("SET_RACE_ACTIVE", true);

        await store.dispatch("toggleRace");

        expect(store.state.isRaceActive).toBe(false);
      });
    });

    describe("addResult", () => {
      it("should add result through action", async () => {
        const result: RaceResult = {
          roundId: 1,
          distance: 1200,
          winners: [
            {
              position: 1,
              horseId: 5,
              name: "Fast Horse",
              color: "#00ff00",
              finishTime: 2500,
            },
          ],
        };

        await store.dispatch("addResult", result);

        expect(store.state.results).toHaveLength(1);
        expect(store.state.results[0]).toEqual(result);
      });
    });
  });

  describe("Getters", () => {
    describe("activeRound", () => {
      it("should return null when no schedule exists", () => {
        const activeRound = store.getters.activeRound;
        expect(activeRound).toBeNull();
      });

      it("should return first round initially", async () => {
        await store.dispatch("createSchedule", 3);

        const activeRound = store.getters.activeRound;

        expect(activeRound).not.toBeNull();
        expect(activeRound?.id).toBe(1);
      });

      it("should return correct round after incrementing", async () => {
        await store.dispatch("createSchedule", 3);

        store.commit("NEXT_ROUND");
        const activeRound = store.getters.activeRound;

        expect(activeRound?.id).toBe(2);
      });

      it("should return null when currentRoundIndex exceeds schedule length", async () => {
        await store.dispatch("createSchedule", 2);

        store.commit("NEXT_ROUND");
        store.commit("NEXT_ROUND");
        const activeRound = store.getters.activeRound;

        expect(activeRound).toBeNull();
      });
    });

    describe("totalRounds", () => {
      it("should return 0 when no schedule exists", () => {
        expect(store.getters.totalRounds).toBe(0);
      });

      it("should return correct total rounds", async () => {
        await store.dispatch("createSchedule", 5);
        expect(store.getters.totalRounds).toBe(5);
      });
    });
  });

  describe("Integration Tests", () => {
    it("should handle complete race workflow", async () => {
      await store.dispatch("initializeHorses");
      expect(store.state.horses.length).toBeGreaterThan(0);

      await store.dispatch("createSchedule", 2);
      expect(store.state.schedule).toHaveLength(2);

      await store.dispatch("toggleRace");
      expect(store.state.isRaceActive).toBe(true);

      const result: RaceResult = {
        roundId: 1,
        distance: 1200,
        winners: [
          {
            position: 1,
            horseId: 1,
            name: "Winner",
            color: "#ff0000",
            finishTime: 3000,
          },
        ],
      };
      await store.dispatch("addResult", result);
      expect(store.state.results).toHaveLength(1);

      await store.dispatch("toggleRace");
      expect(store.state.isRaceActive).toBe(false);

      store.commit("NEXT_ROUND");
      expect(store.state.currentRoundIndex).toBe(1);
    });
  });
});

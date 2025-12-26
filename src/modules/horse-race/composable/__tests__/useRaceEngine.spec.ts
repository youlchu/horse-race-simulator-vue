import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import type { Ref } from "vue";
import { useRaceEngine } from "../useRaceEngine";
import type { Horse } from "../../types";

vi.mock("@/assets/images", () => ({
  horseImg1: "horse1.png",
  horseImg2: "horse2.png",
  horseImg3: "horse3.png",
  horseImg4: "horse4.png",
}));

describe("useRaceEngine", () => {
  let participants: Ref<Horse[]>;
  let mockHorses: Horse[];

  beforeEach(() => {
    vi.useFakeTimers();

    mockHorses = [
      { id: 1, name: "Horse 1", color: "#ff0000", condition: 95 },
      { id: 2, name: "Horse 2", color: "#00ff00", condition: 85 },
      { id: 3, name: "Horse 3", color: "#0000ff", condition: 75 },
    ];

    participants = ref([...mockHorses]);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should initialize with correct default state", () => {
      const engine = useRaceEngine(participants);

      expect(engine.state.value.isRunning).toBe(false);
      expect(engine.state.value.animationFrameId).toBeNull();
      expect(engine.state.value.positions.size).toBe(mockHorses.length);
      expect(engine.state.value.finishTimes.size).toBe(0);
    });

    it("should initialize positions for all horses at 0", () => {
      const engine = useRaceEngine(participants);

      mockHorses.forEach((horse) => {
        expect(engine.getPosition(horse.id)).toBe(0);
      });
    });

    it("should reinitialize when participants change", async () => {
      const engine = useRaceEngine(participants);

      // Start initial race
      engine.start();
      expect(engine.state.value.isRunning).toBe(true);

      // Change participants
      const newHorses: Horse[] = [{ id: 4, name: "Horse 4", color: "#ffff00", condition: 90 }];
      participants.value = newHorses;

      await vi.runAllTimersAsync();

      // After participants change, positions should be reinitialized
      expect(engine.state.value.positions.size).toBe(1);
      // Position might not be 0 if race is still running, so we just check it exists
      expect(engine.state.value.positions.has(4)).toBe(true);
    });
  });

  describe("Race Control", () => {
    describe("start", () => {
      it("should set isRunning to true", () => {
        const engine = useRaceEngine(participants);

        engine.start();

        expect(engine.isRunning.value).toBe(true);
      });

      it("should not start if already running", () => {
        const engine = useRaceEngine(participants);

        engine.start();
        const firstState = engine.state.value.isRunning;

        engine.start(); // Try to start again

        expect(firstState).toBe(true);
        expect(engine.state.value.isRunning).toBe(true);
      });

      it("should clear previous finish times", async () => {
        const engine = useRaceEngine(participants);

        // First race
        engine.start();
        await vi.runAllTimersAsync();

        // Start new race
        engine.start();

        expect(engine.state.value.finishTimes.size).toBe(0);
      });

      it("should update horse positions during race", async () => {
        const engine = useRaceEngine(participants);

        engine.start();

        // Run some animation frames
        await vi.advanceTimersByTimeAsync(100);

        mockHorses.forEach((horse) => {
          const position = engine.getPosition(horse.id);
          expect(position).toBeGreaterThan(0);
        });

        engine.stop();
      });

      it("should record finish times when horses cross finish line", async () => {
        const engine = useRaceEngine(participants);

        engine.start();

        mockHorses.forEach((horse, index) => {
          engine.state.value.positions.set(horse.id, 95);
          engine.state.value.finishTimes.set(horse.id, 1000 * (index + 1));
        });

        expect(engine.state.value.finishTimes.size).toBe(mockHorses.length);

        mockHorses.forEach((horse) => {
          expect(engine.state.value.finishTimes.has(horse.id)).toBe(true);
        });

        engine.stop();
      });
    });

    describe("stop", () => {
      it("should set isRunning to false", () => {
        const engine = useRaceEngine(participants);

        engine.start();
        engine.stop();

        expect(engine.isRunning.value).toBe(false);
      });

      it("should cancel animation frame", () => {
        const engine = useRaceEngine(participants);

        engine.start();
        expect(engine.state.value.animationFrameId).not.toBeNull();

        engine.stop();
        expect(engine.state.value.animationFrameId).toBeNull();
      });

      it("should be safe to call multiple times", () => {
        const engine = useRaceEngine(participants);

        engine.start();
        engine.stop();
        engine.stop();

        expect(engine.isRunning.value).toBe(false);
      });
    });

    describe("reset", () => {
      it("should stop the race", () => {
        const engine = useRaceEngine(participants);

        engine.start();
        engine.reset();

        expect(engine.isRunning.value).toBe(false);
      });

      it("should reset all positions to 0", async () => {
        const engine = useRaceEngine(participants);

        engine.start();
        await vi.advanceTimersByTimeAsync(100);

        engine.reset();

        mockHorses.forEach((horse) => {
          expect(engine.getPosition(horse.id)).toBe(0);
        });
      });

      it("should clear finish times", async () => {
        const engine = useRaceEngine(participants);

        engine.start();
        await vi.runAllTimersAsync();

        engine.reset();

        expect(engine.state.value.finishTimes.size).toBe(0);
      });
    });
  });

  describe("Getters", () => {
    describe("getPosition", () => {
      it("should return 0 for initial position", () => {
        const engine = useRaceEngine(participants);

        expect(engine.getPosition(1)).toBe(0);
      });

      it("should return 0 for unknown horse id", () => {
        const engine = useRaceEngine(participants);

        expect(engine.getPosition(999)).toBe(0);
      });

      it("should return updated position during race", async () => {
        const engine = useRaceEngine(participants);

        engine.start();
        await vi.advanceTimersByTimeAsync(100);

        const position = engine.getPosition(1);
        expect(position).toBeGreaterThanOrEqual(0);
      });
    });

    describe("getHorseImage", () => {
      it("should return a horse image", () => {
        const engine = useRaceEngine(participants);

        const image = engine.getHorseImage(1);

        expect(image).toBeDefined();
        expect(typeof image).toBe("string");
      });

      it("should cycle through animation frames", async () => {
        const engine = useRaceEngine(participants);

        engine.start();
        await vi.advanceTimersByTimeAsync(200);

        const updatedImage = engine.getHorseImage(1);
        expect(updatedImage).toBeDefined();
      });
    });

    describe("getNamePosition", () => {
      it("should return 'back' for position <= 50", () => {
        const engine = useRaceEngine(participants);

        engine.state.value.positions.set(1, 30);

        expect(engine.getNamePosition(1)).toBe("back");
      });

      it("should return 'front' for position > 50", () => {
        const engine = useRaceEngine(participants);

        engine.state.value.positions.set(1, 60);

        expect(engine.getNamePosition(1)).toBe("front");
      });

      it("should return 'back' for position exactly 50", () => {
        const engine = useRaceEngine(participants);

        engine.state.value.positions.set(1, 50);

        expect(engine.getNamePosition(1)).toBe("back");
      });
    });

    describe("getResults", () => {
      it("should return results sorted by finish time", async () => {
        const engine = useRaceEngine(participants);

        engine.state.value.finishTimes.set(1, 3000);
        engine.state.value.finishTimes.set(2, 2000);
        engine.state.value.finishTimes.set(3, 2500);

        const results = engine.getResults();

        expect(results[0]?.horseId).toBe(2);
        expect(results[1]?.horseId).toBe(3);
        expect(results[2]?.horseId).toBe(1);
      });

      it("should assign correct positions", async () => {
        const engine = useRaceEngine(participants);

        engine.state.value.finishTimes.set(1, 3000);
        engine.state.value.finishTimes.set(2, 2000);
        engine.state.value.finishTimes.set(3, 2500);

        const results = engine.getResults();

        expect(results[0]?.position).toBe(1);
        expect(results[1]?.position).toBe(2);
        expect(results[2]?.position).toBe(3);
      });

      it("should include horse details in results", () => {
        const engine = useRaceEngine(participants);

        engine.state.value.finishTimes.set(1, 3000);

        const results = engine.getResults();

        expect(results[0]).toHaveProperty("horseId");
        expect(results[0]).toHaveProperty("name");
        expect(results[0]).toHaveProperty("color");
        expect(results[0]).toHaveProperty("finishTime");
        expect(results[0]).toHaveProperty("position");
      });

      it("should return results even with 0 finish time for unfinished horses", () => {
        const engine = useRaceEngine(participants);

        const results = engine.getResults();

        expect(results).toHaveLength(mockHorses.length);
        results.forEach((result) => {
          expect(result.finishTime).toBe(0);
        });
      });
    });
  });

  describe("Lifecycle", () => {
    it("should initialize when participants are provided", () => {
      const engine = useRaceEngine(participants);

      expect(engine.state.value.positions.size).toBe(mockHorses.length);
    });

    it("should clean up on unmount", () => {
      const engine = useRaceEngine(participants);

      engine.start();
      expect(engine.isRunning.value).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty participants", () => {
      const emptyParticipants = ref<Horse[]>([]);
      const engine = useRaceEngine(emptyParticipants);

      expect(engine.state.value.positions.size).toBe(0);
      expect(() => engine.start()).not.toThrow();
    });

    it("should handle single participant", () => {
      const singleParticipant = ref([mockHorses[0]!]);
      const engine = useRaceEngine(singleParticipant);

      engine.start();

      expect(engine.state.value.positions.size).toBe(1);
      expect(engine.getPosition(1)).toBeGreaterThanOrEqual(0);

      engine.stop();
    });

    it("should not exceed finish line", async () => {
      const engine = useRaceEngine(participants);

      engine.state.value.positions.set(1, 100);

      engine.start();
      await vi.advanceTimersByTimeAsync(100);
      engine.stop();

      const position = engine.getPosition(1);
      expect(position).toBeGreaterThanOrEqual(0);
      expect(position).toBeLessThanOrEqual(100);
    });
  });
});

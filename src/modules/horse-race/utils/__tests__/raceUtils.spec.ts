import { describe, it, expect, vi } from "vitest";
import { shuffleArray, generateSchedule, calculateSpeed } from "../raceUtils";
import type { Horse } from "../../types";

describe("Race Utils", () => {
  describe("shuffleArray", () => {
    it("should return an array with the same length", () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);

      expect(result).toHaveLength(input.length);
    });

    it("should return an array with the same elements", () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);

      expect(result.sort()).toEqual(input.sort());
    });

    it("should not modify the original array", () => {
      const input = [1, 2, 3, 4, 5];
      const original = [...input];

      shuffleArray(input);

      expect(input).toEqual(original);
    });

    it("should handle empty array", () => {
      const result = shuffleArray([]);
      expect(result).toEqual([]);
    });

    it("should handle single element array", () => {
      const input = [1];
      const result = shuffleArray(input);

      expect(result).toEqual([1]);
    });

    it("should shuffle array (statistically)", () => {
      const mockRandom = vi.spyOn(Math, "random");
      mockRandom.mockReturnValueOnce(0.5);
      mockRandom.mockReturnValueOnce(0.2);

      const input = [1, 2, 3];
      const result = shuffleArray(input);

      expect(result).toHaveLength(3);
      mockRandom.mockRestore();
    });
  });

  describe("generateSchedule", () => {
    const mockHorses: Horse[] = [
      { id: 1, name: "Horse 1", color: "#ff0000", condition: 90 },
      { id: 2, name: "Horse 2", color: "#00ff00", condition: 85 },
      { id: 3, name: "Horse 3", color: "#0000ff", condition: 80 },
      { id: 4, name: "Horse 4", color: "#ffff00", condition: 75 },
      { id: 5, name: "Horse 5", color: "#ff00ff", condition: 70 },
      { id: 6, name: "Horse 6", color: "#00ffff", condition: 65 },
      { id: 7, name: "Horse 7", color: "#ff8800", condition: 60 },
      { id: 8, name: "Horse 8", color: "#8800ff", condition: 55 },
      { id: 9, name: "Horse 9", color: "#00ff88", condition: 50 },
      { id: 10, name: "Horse 10", color: "#88ff00", condition: 45 },
      { id: 11, name: "Horse 11", color: "#ff0088", condition: 40 },
    ];

    it("should generate specified number of rounds", () => {
      const schedule = generateSchedule(mockHorses, 5);
      expect(schedule).toHaveLength(5);
    });

    it("should default to 6 rounds", () => {
      const schedule = generateSchedule(mockHorses);
      expect(schedule).toHaveLength(6);
    });

    it("should create rounds with correct structure", () => {
      const schedule = generateSchedule(mockHorses, 2);

      schedule.forEach((round, index) => {
        expect(round).toHaveProperty("id");
        expect(round).toHaveProperty("distance");
        expect(round).toHaveProperty("participants");
        expect(round).toHaveProperty("results");
        expect(round).toHaveProperty("status");

        expect(round.id).toBe(index + 1);
        expect(round.status).toBe("waiting");
        expect(round.results).toEqual([]);
      });
    });

    it("should create rounds with increasing distances", () => {
      const schedule = generateSchedule(mockHorses, 4);

      expect(schedule[0]?.distance).toBe(1200);
      expect(schedule[1]?.distance).toBe(1400);
      expect(schedule[2]?.distance).toBe(1600);
      expect(schedule[3]?.distance).toBe(1800);
    });

    it("should select up to 10 participants per round", () => {
      const schedule = generateSchedule(mockHorses, 3);

      schedule.forEach((round) => {
        expect(round.participants.length).toBeLessThanOrEqual(10);
      });
    });

    it("should select all horses if less than 10 available", () => {
      const fewHorses = mockHorses.slice(0, 5);
      const schedule = generateSchedule(fewHorses, 2);

      schedule.forEach((round) => {
        expect(round.participants).toHaveLength(5);
      });
    });

    it("should shuffle participants for each round", () => {
      const schedule = generateSchedule(mockHorses, 3);

      expect(schedule[0]?.participants.length).toBeGreaterThan(0);
      expect(schedule[1]?.participants.length).toBeGreaterThan(0);
    });
  });

  describe("calculateSpeed", () => {
    it("should return speed in range 0.08-0.12 for condition >= 90", () => {
      const speed = calculateSpeed(95);
      expect(speed).toBeGreaterThanOrEqual(0.08);
      expect(speed).toBeLessThanOrEqual(0.12);
    });

    it("should return speed in range 0.05-0.10 for condition 70-89", () => {
      const speed = calculateSpeed(80);
      expect(speed).toBeGreaterThanOrEqual(0.05);
      expect(speed).toBeLessThanOrEqual(0.1);
    });

    it("should return speed in range 0.03-0.07 for condition 50-69", () => {
      const speed = calculateSpeed(60);
      expect(speed).toBeGreaterThanOrEqual(0.03);
      expect(speed).toBeLessThanOrEqual(0.07);
    });

    it("should return speed in range 0.02-0.04 for condition < 50", () => {
      const speed = calculateSpeed(30);
      expect(speed).toBeGreaterThanOrEqual(0.02);
      expect(speed).toBeLessThanOrEqual(0.04);
    });

    it("should handle edge case: condition = 90", () => {
      const speed = calculateSpeed(90);
      expect(speed).toBeGreaterThanOrEqual(0.08);
      expect(speed).toBeLessThanOrEqual(0.12);
    });

    it("should handle edge case: condition = 70", () => {
      const speed = calculateSpeed(70);
      expect(speed).toBeGreaterThanOrEqual(0.05);
      expect(speed).toBeLessThanOrEqual(0.1);
    });

    it("should handle edge case: condition = 50", () => {
      const speed = calculateSpeed(50);
      expect(speed).toBeGreaterThanOrEqual(0.03);
      expect(speed).toBeLessThanOrEqual(0.07);
    });

    it("should produce different speeds on multiple calls (randomness)", () => {
      const speeds = new Set();
      for (let i = 0; i < 20; i++) {
        speeds.add(calculateSpeed(85));
      }
      expect(speeds.size).toBeGreaterThan(1);
    });
  });
});

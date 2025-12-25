import type { ProgramRound, RaceResult } from "../types";

export const programData = ref<ProgramRound[]>([
  { round: 1, distance: 1200, status: "Ready" },
  { round: 2, distance: 1400, status: "Next" },
  { round: 3, distance: 1600, status: "Waiting" },
  { round: 4, distance: 1800, status: "Waiting" },
  { round: 5, distance: 2000, status: "Waiting" },
  { round: 6, distance: 2200, status: "Waiting" },
]);

export const resultsData = ref<RaceResult[]>([
  { round: 1, winner: "Thunderbolt", time: "1:24.5" },
  { round: 2, winner: "Storm Chaser", time: "1:38.2" },
  { round: 3, winner: "Lightning Strike", time: "1:52.8" },
  { round: 4, winner: "Wind Runner", time: "2:06.1" },
  { round: 5, winner: "Shadow Dancer", time: "2:21.3" },
]);

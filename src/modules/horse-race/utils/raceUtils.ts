import type { Horse, Round } from "../types";

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (shuffled[i] !== undefined && shuffled[j] !== undefined) {
      [shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!];
    }
  }
  return shuffled;
}

export function generateSchedule(allHorses: Horse[], roundCount: number = 6): Round[] {
  const schedule: Round[] = [];

  for (let i = 0; i < roundCount; i++) {
    const distance = 1200 + i * 200;
    const shuffledHorses = shuffleArray(allHorses);
    const participants = shuffledHorses.slice(0, 10);

    schedule.push({
      id: i + 1,
      distance,
      participants,
      results: [],
      status: "waiting",
    });
  }

  return schedule;
}

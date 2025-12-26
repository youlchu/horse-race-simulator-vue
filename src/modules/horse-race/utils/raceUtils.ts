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

export function createRaceEngine(participants: Horse[]) {
  return {
    positions: new Map(participants.map((h) => [h.id, 0])),
    isRunning: false,
    animationFrameId: null,
    finishTimes: new Map(),
  };
}

export function calculateSpeed(condition: number): number {
  if (condition >= 90) {
    return 0.08 + Math.random() * 0.04;
  } else if (condition >= 70) {
    return 0.05 + Math.random() * 0.05;
  } else if (condition >= 50) {
    return 0.03 + Math.random() * 0.04;
  } else {
    return 0.02 + Math.random() * 0.02;
  }
}

export function getColoredFilter(hexColor: string): string {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
    } else if (max === g) {
      hue = ((b - r) / delta + 2) * 60;
    } else {
      hue = ((r - g) / delta + 4) * 60;
    }
  }

  return `brightness(0.5) sepia(1) hue-rotate(${Math.round(hue)}deg) saturate(5)`;
}

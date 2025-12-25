import type { Horse } from "../types";

const HORSE_COLORS = [
  "#ef4444", // red
  "#f59e0b", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#f97316", // orange-dark
  "#84cc16", // lime
  "#14b8a6", // teal
  "#6366f1", // indigo
  "#a855f7", // violet
  "#f43f5e", // rose
  "#10b981", // emerald
  "#0ea5e9", // sky
  "#d946ef", // fuchsia
  "#fb923c", // orange-light
  "#4ade80", // green-light
  "#f87171", // red-light
];

const HORSE_NAMES = [
  "Bold Pilot",
  "Karayel",
  "Caş",
  "Kafkaslı",
  "Ayabakan",
  "Özgünhan",
  "Hürbatur",
  "Tamer'in Oğlu",
  "Atom Karınca",
  "Yavuzhan",
  "Odin",
  "Haberbatur",
  "Grand Ekinoks",
  "Turbo",
  "Seren I",
  "Minimo",
  "Devir",
  "Johny Guitar",
  "Mirhat",
  "Tünkut",
];

const generateCondition = (index: number): number => {
  if (index < 3) {
    // İlk 3 at: 90-100 arası
    return Math.floor(Math.random() * 11) + 90;
  } else if (index < 9) {
    // Sonraki 6 at: 70-89 arası
    return Math.floor(Math.random() * 20) + 70;
  } else if (index < 17) {
    // Sonraki 8 at: 50-69 arası
    return Math.floor(Math.random() * 20) + 50;
  } else {
    // Son 3 at: 1-49 arası
    return Math.floor(Math.random() * 49) + 1;
  }
};

export const mockHorses: Horse[] = HORSE_NAMES.map((name, index) => ({
  id: index + 1,
  name,
  color: HORSE_COLORS[index % HORSE_COLORS.length] || "#000000",
  condition: generateCondition(index),
}));

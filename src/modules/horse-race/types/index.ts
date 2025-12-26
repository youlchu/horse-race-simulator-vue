export interface Horse {
  id: number;
  name: string;
  color: string;
  condition: number;
}

export interface HippodromeProps {
  participants?: Horse[];
  distance?: number;
  trackSurface?: string;
}

export interface ProgramRound {
  round: number;
  distance: number;
  status: string;
}

export interface RaceResult {
  round: number;
  winner: string;
  time: string;
}

export interface Round {
  id: number;
  distance: number;
  participants: Horse[];
  results: HorseResult[];
  status: "waiting" | "completed" | "running";
}

export interface HorseResult {
  horseId: number;
  name: string;
  finishTime: number;
}

export interface RaceState {
  horses: Horse[];
  schedule: Round[];
  currentRoundIndex: number;
  isRaceActive: boolean;
  results: RaceResult[];
}

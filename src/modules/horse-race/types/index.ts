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

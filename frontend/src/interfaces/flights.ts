export interface Flight {
  id: string;
  aircraft: {
    name: string;
    registration: string;
    airline: string;
  },
  flightData: {
    date: string;
    balance: number
    route: {
      from: string;
      to: string;
    },
    xp: number;
    missionBonus: number;
  }
}

export interface FlightsResponse {
  data: Flight[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface CardProps {
  flights: Flight[];
  className?: string;
  lastFlightRef: (node: HTMLAnchorElement) => void;
}

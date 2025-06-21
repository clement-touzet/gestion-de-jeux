import { DateRange } from "react-day-picker";

export type GameReviewFiltersType = {
  search?: string;
  dateRange?: DateRange;
  stars?: number;
  timePlayed?: {
    min: number;
    max: number;
  };
};

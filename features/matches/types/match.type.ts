import { Report } from "../../reports/types/report.type";

export type MatchStatus = "pending" | "confirmed" | "rejected";

export interface Match {
  id: string;
  score: number;
  reportA: Report;
  reportB: Report;
  status: MatchStatus;
  createdAt: string;
}

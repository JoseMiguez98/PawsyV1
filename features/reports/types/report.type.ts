import { Animal } from "./animal.type";
import { User } from "../../auth/types/user.type";

export type ReportType = "lost" | "found" | "adoption";
export type ReportStatus = "active" | "resolved" | "expired";

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Report {
  id: string;
  type: ReportType;
  status: ReportStatus;
  location: Location;
  animal: Animal;
  reportedBy: User;
  createdAt: string;
  description?: string;
}

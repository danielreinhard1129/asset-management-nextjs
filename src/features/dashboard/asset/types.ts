import { User } from "@/features/user/types";
import { Category } from "../asset-category/types";

export interface Asset {
  name: string;
  tag: string;
  serial: string;
  purchaseDate: Date;
  purchasePrice: number;
  status: Status;
  image: string;
  categoryId: number;
  category: Pick<Category, "name">;

  userId?: number;
  user?: { firstName: string; lastName: string };
}

export enum Status {
  AVAILABLE = "AVAILABLE",
  IN_PROGRESS = "IN_PROGRESS",
  IN_USE = "IN_USE",
  MAINTENANCE = "MAINTENANCE",
  RETIRED = "RETIRED",
  MISSING = "MISSING",
  BROKEN = "BROKEN",
}

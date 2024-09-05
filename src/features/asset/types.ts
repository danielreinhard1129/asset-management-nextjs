import { Category } from "../category/types";

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
}

export enum Status {
  AVAILABLE = "AVAILABLE",
  IN_USE = "IN_USE",
  MAINTENANCE = "MAINTENANCE",
  RETIRED = "RETIRED",
  MISSING = "MISSING",
  BROKEN = "BROKEN",
}

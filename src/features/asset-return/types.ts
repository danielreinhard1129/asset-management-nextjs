import { Bast } from "../bast/types";
import { User } from "../user/types";

export interface AssetReturned {
  id: number;
  userId: number;
  bastId: number;
  status: StatusAssetReturned;
  notes?: string;
  createdAt: Date;

  user: User;
  bast: Bast;
}

export enum StatusAssetReturned {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  APPROVE = "APPROVE",
  REJECT = "REJECT",
  DONE = "DONE",
}

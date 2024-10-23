import { Bast } from "../bast/types";
import { Category } from "../dashboard/asset-category/types";
import { User } from "../user/types";

export interface AssetRequest {
  id: number;
  userId: number;
  bastId: number;
  status: StatusAssetRequest;
  assignToUser: string;
  notes?: string;
  createdAt: Date;

  user: User;
  bast: Bast;

  assetRequestItems: AssetRequestItem[];
}

export enum StatusAssetRequest {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  APPROVE = "APPROVE",
  REJECT = "REJECT",
  CLAIMED = "CLAIMED",
}

export interface AssetRequestItem {
  id: number;
  categoryId: number;
  assetRequestId: number;
  qty: number;

  category: Category;
  assetRequest: AssetRequest;
}

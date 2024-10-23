import { User } from "@/features/user/types";
import { Asset } from "../asset/types";

export interface AssetHistory {
  id: number;
  assetId: number;
  userId?: number;
  adminId: number;
  type: TypeAssetHistory;
  notes?: string;
  createdAt: Date;

  asset: Asset;
  user?: User;
  admin: User;
}

export enum TypeAssetHistory {
  CHECKOUT = "CHECKOUT",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  OTHER = "OTHER",
}

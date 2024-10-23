import { AssetRequest } from "../asset-request/types";
import { AssetReturned } from "../asset-return/types";
import { Asset } from "../dashboard/asset/types";
import { User } from "../user/types";

export enum BastTabs {
  REQUEST = "Request",
  RETURN = "Return",
}

export enum TypeBast {
  REQUEST = "REQUEST",
  RETURN = "RETURN",
}

export interface Bast {
  id: number;
  bastNo: string;
  type: TypeBast;
  hrId?: number;
  adminId?: number;
  isCheckedByAdmin: boolean;
  isCheckedByUser: boolean;
  createdAt: Date;

  admin?: User;
  hr?: User;
  bastItems: BastItem[];
  assetRequests: AssetRequest[];
  assetReturned: AssetReturned[];
}

export interface BastItem {
  id: number;
  bastId: number;
  assetId: number;

  asset: Asset;
}

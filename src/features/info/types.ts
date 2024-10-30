import { Status } from "../dashboard/asset/types";

export interface InfoResources {
  totalAsset: number;
  totalUser: number;
  totalBast: number;
}
export interface TotalPendingRequests {
  totalAssetRequest: number;
  totalAssetReturn: number;
}

export interface TotalAssetByStatus {
  name: Status;
  value: number;
  color: string;
}

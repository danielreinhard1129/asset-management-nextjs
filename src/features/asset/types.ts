import { Asset as AssetWithoutId } from "../dashboard/asset/types";

export interface Asset extends AssetWithoutId {
  id: number;
}

export type AssetStatus = 'available' | 'pending';

export interface PendingAssetContract {
  status: AssetStatus;
  assetName: string;
  pendingLabel: string;
}

export function pending(assetName: string, pendingLabel: string): PendingAssetContract {
  return { status: 'pending', assetName, pendingLabel };
}

export function isPending(value: PendingAssetContract | undefined): boolean {
  return !!value && value.status === 'pending';
}
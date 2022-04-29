export interface UploadingAsset {
  id: string;
  file: File;
  fileName: string;
  assetUrl: string;
  uploadUrl: string;
  progress: number;
  icon: string;
  thumbnail?: string;
  expiresAt: number;
  abort: AbortController;
}

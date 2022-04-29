export interface UploadingAsset {
  id: number;
  session: string;
  file: File;
  fileName: string;
  assetUrl: string;
  uploadUrl: string;
  progress: number;
  thumbnail: string;
  abort: AbortController;
}

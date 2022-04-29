import axios from 'axios';
import { ref } from 'vue';
import { createSignedURL } from '../api/createSignedURL';
import { UploadingAsset } from '../types/UploadingAsset';
import { FileObject } from '../types/FileObject';
import { readFileBase64 } from '../utils/file';

const getAssetId = () => 'asset-' + new Date().getTime();

export const useUploader = (initialFiles: FileObject[]) => {
  const assetsInProgress = ref<UploadingAsset[]>(
    initialFiles.map((obj) => ({
      id: getAssetId(),
      file: new File([], obj.name),
      fileName: obj.name,
      assetUrl: obj.url,
      uploadUrl: '',
      progress: 100,
      icon: obj.icon || 'description',
      thumbnail: obj.thumbnail,
      expiresAt: 0,
      abort: new AbortController(),
    }))
  );

  const checkStatus = async (asset: UploadingAsset): Promise<number> => {
    try {
      await axios.put(asset.uploadUrl, null, {
        headers: {
          'Content-Range': 'bytes */*',
        },
        signal: asset.abort.signal,
      });
      return -1;
    } catch (err) {
      const error = err as { response?: { status?: number; headers?: { range?: string } } };
      if (error.response?.status === 308) {
        if (error.response.headers?.range) {
          const arr = error.response.headers.range.split('-');
          return +(arr.pop() || '0');
        }
      }
      return 0;
    }
  };

  const removeAsset = (asset: UploadingAsset) => {
    assetsInProgress.value = assetsInProgress.value.filter((item) => item.id !== asset.id);
  };

  const updateAsset = (assetId: string, data: Partial<UploadingAsset>) => {
    assetsInProgress.value = assetsInProgress.value.map((asset) =>
      asset.id === assetId ? { ...asset, ...data } : asset
    );
  };

  const uploadAsset = async (assetId: string) => {
    const asset = assetsInProgress.value.find((item) => item.id === assetId);
    if (!asset?.uploadUrl) {
      return;
    }

    try {
      const range = await checkStatus(asset);

      if (range === -1) {
        removeAsset(asset);
        return;
      }

      const buffer = await asset.file.arrayBuffer();
      await axios.put(asset.uploadUrl, buffer.slice(range), {
        headers: {
          'Content-Type': asset.file.type,
          'Content-Range': `bytes ${range}-${buffer.byteLength - 1}/${buffer.byteLength}`,
        },
        signal: asset.abort.signal,
        onUploadProgress: (event) => {
          updateAsset(asset.id, {
            progress: Math.round(((event.loaded + range) * 100) / buffer.byteLength),
          });
        },
      });
    } catch (err) {
      if ((err as { code: string }).code === 'ERR_CANCELED') {
        console.info(`Upload cancelled for ${asset.fileName}.`);
      } else {
        console.error('Upload error', err);
      }
    }
  };

  const cancelUpload = (asset: UploadingAsset) => {
    asset.abort.abort();
    removeAsset(asset);
  };

  const getIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return 'image';
    } else if (file.type.startsWith('application/pdf')) {
      return 'picture_as_pdf';
    } else {
      return 'description';
    }
  };

  const upload = async (files: File[]) => {
    const assets = files.map<UploadingAsset>((file) => ({
      id: getAssetId(),
      file,
      fileName: file.name,
      assetUrl: '',
      uploadUrl: '',
      progress: 0,
      icon: getIcon(file),
      abort: new AbortController(),
      expiresAt: 0,
    }));
    assetsInProgress.value = [...assetsInProgress.value, ...assets];

    const port = window.location.port ? `:${window.location.port}` : '';
    const origin = `${window.location.protocol}//${window.location.hostname}${port}`;
    for (const asset of assets) {
      if (asset.icon === 'image') {
        const thumbnail = await readFileBase64(asset.file);
        updateAsset(asset.id, { thumbnail });
      }

      const { url, newFileName, expiresAt } = await createSignedURL(
        asset.file.name,
        asset.file.type,
        origin
      );
      updateAsset(asset.id, {
        uploadUrl: url,
        fileName: newFileName,
        assetUrl: `https://storage.cloud.google.com/prodeo-eureka-files/${newFileName}`,
        expiresAt,
      });

      uploadAsset(asset.id);
    }
  };

  return {
    upload,
    cancelUpload,
    assetsInProgress,
  };
};

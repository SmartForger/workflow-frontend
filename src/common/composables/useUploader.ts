import axios from 'axios';
import { ref } from 'vue';
import { createSignedURL } from '../api/createSignedURL';
import { UploadingAsset } from '../types/UploadingAsset';

export const useUploader = () => {
  const assetsInProgress = ref<UploadingAsset[]>([]);

  const checkStatus = async (index: number): Promise<number> => {
    try {
      const asset = assetsInProgress.value[index];
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
    assetsInProgress.value = assetsInProgress.value.filter(
      (item) => item.session !== asset.session
    );
  };

  const updateAsset = (asset: UploadingAsset) => {
    assetsInProgress.value = assetsInProgress.value.map((asset1) =>
      asset1.id === asset.id ? asset : asset1
    );
  };

  const uploadAsset = async (index: number) => {
    const asset = assetsInProgress.value[index];
    if (!asset?.uploadUrl) {
      return;
    }

    try {
      const range = await checkStatus(index);

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
          updateAsset({
            ...asset,
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

  const getThumbnail = (file: File) => {
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
      id: new Date().getTime(),
      session: '',
      file,
      fileName: file.name,
      assetUrl: '',
      uploadUrl: '',
      progress: 0,
      thumbnail: getThumbnail(file),
      abort: new AbortController(),
    }));
    assetsInProgress.value = [...assetsInProgress.value, ...assets];

    const port = window.location.port ? `:${window.location.port}` : '';
    const origin = `${window.location.protocol}//${window.location.hostname}${port}`;
    for (let i = 0; i < assets.length; i++) {
      const { url, newFileName } = await createSignedURL(
        assets[i].file.name,
        assets[i].file.type,
        origin
      );
      updateAsset({
        ...assets[i],
        uploadUrl: url,
        fileName: newFileName,
        assetUrl: `https://storage.cloud.google.com/prodeo-eureka-files/${newFileName}`,
      });
      uploadAsset(i);
    }
  };

  return {
    upload,
    cancelUpload,
    assetsInProgress,
  };
};

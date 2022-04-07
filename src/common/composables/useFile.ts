import { ref, watch } from 'vue';
import { readFileBase64 } from '../utils/file';

export const useFile = (
  fileName: string,
  updateData: (filename: string, data: string) => void
) => {
  const initialFile: File | null = fileName ? new File([], fileName) : null;
  const file = ref<File | null>(initialFile);

  watch(
    () => file.value,
    async () => {
      if (!file.value) {
        return;
      }

      const data = await readFileBase64(file.value);
      updateData(file.value.name, data);
    }
  );

  return file;
};

<template>
  <q-card class="q-py-sm q-pl-md q-pr-sm">
    <div class="row justify-between items-center">
      <span>{{ label || 'Uploaded Files' }}</span>
      <q-btn
        dense
        flat
        round
        icon="file_upload"
        color="primary"
        @click="uploadFile"
        v-if="assetsInProgress.length === 0"
      ></q-btn>
    </div>
    <div v-for="(asset, i) in assetsInProgress" :key="i" class="uploaded-file q-mt-sm">
      <div class="image">
        <q-icon :name="asset.thumbnail" size="xl" color="grey" />
        <q-circular-progress
          class="progress"
          :value="100 - asset.progress"
          size="80px"
          :thickness="1"
          color="black"
          center-color="grey-8"
          track-color="transparent"
          :instant-feedback="true"
        />
      </div>
      <div class="content">
        <div class="row justify-between items-center">
          <span class="name">{{ asset.fileName }}</span>
          <q-btn
            dense
            flat
            round
            icon="cancel"
            color="grey"
            size="12px"
            @click="cancelUpload(asset)"
          ></q-btn>
        </div>
      </div>
    </div>
    <q-btn
      dense
      flat
      label="Add new files"
      icon="add"
      color="primary"
      size="12px"
      v-if="multiple && assetsInProgress.length"
    ></q-btn>
  </q-card>
  <input ref="inputRef" type="file" class="input" :multiple="multiple" @change="onFileChange" />
</template>

<style lang="scss" scoped>
.uploaded-file {
  display: flex;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding-left: 0.5rem;
  }

  .image {
    position: relative;
    overflow: hidden;
    flex: none;

    .progress {
      position: absolute;
      left: -17px;
      top: -17px;
      transform: scaleX(-1);
      opacity: 0.3;
    }
  }
}
.input {
  visibility: hidden;
  opacity: 0;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { FileObject } from 'src/common/types/FileObject';
import { useUploader } from 'src/common/composables/useUploader';

export default defineComponent({
  props: {
    label: String,
    fieldIcon: String,
    modelValue: {
      type: Object as PropType<FileObject[]>,
    },
    multiple: Boolean,
    rules: {
      type: Array as PropType<Array<(val: unknown) => unknown>>,
    },
  },

  setup() {
    const inputRef = ref<HTMLInputElement>();
    const { upload, cancelUpload, assetsInProgress } = useUploader();

    const uploadFile = () => {
      inputRef.value?.click();
    };

    const onFileChange = () => {
      if (!inputRef.value?.files) {
        return;
      }

      const files: File[] = [];
      for (let i = 0; i < inputRef.value.files.length; i++) {
        const file = inputRef.value.files.item(i);
        if (file) {
          files.push(file);
        }
      }

      upload(files);
    };

    return { inputRef, assetsInProgress, uploadFile, cancelUpload, onFileChange };
  },
});
</script>

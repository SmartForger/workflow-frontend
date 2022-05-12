<template>
  <q-card flat bordered class="q-py-sm q-px-sm q-mb-xs bg-grey-1">
    <div class="header row justify-between items-center">
      <div>
        <q-icon :name="fieldIcon" size="sm" />
        <span class="q-ml-xs">{{ label || 'Uploaded Files' }}</span>
      </div>
      <q-btn
        dense
        flat
        round
        icon="file_upload"
        color="grey"
        @click="uploadFile"
        v-if="assetsInProgress.length === 0"
      ></q-btn>
    </div>
    <div v-for="asset in assetsInProgress" :key="asset.id" class="uploaded-file q-mt-sm">
      <div class="image">
        <q-img :src="asset.thumbnail" width="46px" height="46px" v-if="asset.thumbnail" />
        <q-icon :name="asset.icon" size="xl" color="grey" v-else />
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
    <input ref="inputRef" type="file" class="input" :multiple="multiple" @change="onFileChange" />
  </q-card>
</template>

<style lang="scss" scoped>
.header {
  color: rgba(0, 0, 0, 0.7);
}

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
  display: block;
  visibility: hidden;
  opacity: 0;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { FileObject } from 'src/common/types/FileObject';
import { useUploader } from 'src/common/composables/useUploader';

export default defineComponent({
  props: {
    label: String,
    fieldIcon: String,
    modelValue: {
      type: Array as PropType<FileObject[]>,
      default: () => [],
    },
    image: Boolean,
    multiple: Boolean,
    rules: {
      type: Array as PropType<Array<(val: unknown) => unknown>>,
    },
  },
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement>();
    const { upload, cancelUpload, assetsInProgress } = useUploader(props.modelValue);

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

    watch(
      () => assetsInProgress.value,
      (assets) => {
        const uploaded = assets.every((asset) => asset.progress === 100);
        if (!uploaded) {
          return;
        }

        emit(
          'update:model-value',
          assets.map((asset) => ({
            name: asset.fileName,
            url: asset.assetUrl,
          }))
        );
      }
    );

    return { inputRef, assetsInProgress, uploadFile, cancelUpload, onFileChange };
  },
});
</script>

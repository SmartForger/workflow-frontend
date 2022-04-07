/* eslint-disable @typescript-eslint/no-explicit-any */

import { computed, ref } from 'vue';
import { useFile } from './useFile';

export const useDetailsForm = <
  T extends { iconFileName: string; icon: string }
>(
  props: {
    details: T;
  },
  emit: (event: any, ...args: any[]) => void,
  expose?: (exposed?: Record<string, any>) => void
) => {
  const formRef = ref();

  const update = (field: keyof T, value: any) => {
    emit('update', {
      [field]: value,
    });
  };

  const save = async () => {
    if (formRef.value) {
      const valid = await formRef.value.validate();
      if (!valid) {
        return;
      }
    }

    emit('save');
  };

  const cancel = () => {
    emit('cancel');
  };

  const getFieldModel = (field: keyof T) => {
    return computed({
      get: () => props.details[field],
      set: (val) => update(field, val),
    });
  };

  const getDisplayNameModel = () => {
    return computed({
      get: () => (props.details as any)['displayName'],
      set: (val) => {
        emit('update', {
          name: val.replaceAll(' ', '_').toLowerCase(),
          displayName: val,
        });
      },
    });
  };

  const getIconFileModel = (fileNameField: keyof T, fileDataField: keyof T) => {
    return useFile(
      props.details[fileNameField] as any,
      (filename: string, data: string) => {
        emit('update', {
          [fileDataField]: data,
          [fileNameField]: filename,
        });
      }
    );
  };

  if (expose) {
    expose({ form: formRef });
  }

  return {
    formRef,
    save,
    cancel,
    update,
    getFieldModel,
    getDisplayNameModel,
    getIconFileModel,
  };
};

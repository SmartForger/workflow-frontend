/* eslint-disable @typescript-eslint/no-explicit-any */

import { computed, ref } from 'vue';

export const useDetailsForm = <T>(
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

  const getFieldModel = (field: keyof T, initialValue: any) => {
    return computed({
      get: () => props.details[field] ?? initialValue,
      set: (val) => update(field, val),
    });
  };

  const getIconModel = () => {
    return computed({
      get: () => {
        const details = props.details as any;

        return details.icon
          ? [
              {
                name: details.iconFileName,
                url: details.icon,
                thumbnail: details.icon,
              },
            ]
          : [];
      },
      set: (val) => {
        console.log(555, val);
        if (!val || !val[0]) {
          emit('update', {
            icon: '',
            iconFileName: '',
          });
        } else {
          emit('update', {
            icon: val[0].url,
            iconFileName: val[0].name,
          });
        }
      },
    });
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
    getIconModel,
  };
};

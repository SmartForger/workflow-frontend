import { ref } from 'vue';

export const useDrawer = () => {
  const open = ref(false);

  const toggleOpen = () => {
    open.value = !open.value;
  };

  return { open, toggleOpen };
};

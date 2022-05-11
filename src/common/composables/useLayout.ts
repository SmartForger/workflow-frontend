import { computed } from 'vue';
import { WorkflowMachine } from '../types/WorkflowMachine';

export const useLayout = (layoutType: string, machine: WorkflowMachine) => {
  const getLayout = () =>
    machine.stepInfo.value.layouts.find((layout) => layout.type === layoutType);

  const visible = computed(() => {
    const layout = getLayout();
    return layout && layout.visible;
  });
  const style = computed(() => {
    const layout = getLayout();

    return {
      backgroundColor: layout?.backgroundColor,
      color: layout?.textColor,
    };
  });

  const widgets = computed(() => {
    const layout = getLayout();
    return layout?.widgets || [];
  });

  return { visible, style, widgets };
};

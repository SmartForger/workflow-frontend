<template>
  <div class="workflow-step">
    <div class="header" v-if="headerVisible">
      <q-toolbar class="shadow-3" :style="headerStyle">
        <icon-renderer
          :icon="stepInfo.icon"
          :iconFileName="stepInfo.iconFileName"
          size="32px"
          v-if="stepInfo.icon || stepInfo.iconFileName"
        ></icon-renderer>
        <span class="q-ml-sm">{{ stepInfo.name }}</span>
      </q-toolbar>
    </div>
    <div class="body q-pa-md">
      <prodeo-widget
        v-for="widget in stepInfo.widgets"
        :key="widget.id"
        :modelValue="data[widget.field]"
        @update:modelValue="updateData(widget.field, $event)"
        :details="widget"
      >
      </prodeo-widget>
    </div>
    <div class="footer" v-if="footerVisible">
      <q-toolbar class="shadow-3 justify-between" :style="footerStyle">
        <div class="col-auto" :key="widget.id" v-for="widget in footerWidgets">
          <prodeo-widget @trigger="sendEvent($event)" :details="widget"> </prodeo-widget>
        </div>
      </q-toolbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.workflow-step {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
}
.header,
.footer {
  height: 50px;
  flex: none;
}
.footer > div {
  flex-direction: row-reverse;
}
.body {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { WorkflowMachine } from 'src/common/types/WorkflowMachine';
import { useLayout } from 'src/common/composables/useLayout';

export default defineComponent({
  name: 'WorkflowStepRenderer',
  props: {
    machine: {
      type: Object as PropType<WorkflowMachine>,
      required: true,
    },
  },
  setup(props) {
    const { visible: headerVisible, style: headerStyle } = useLayout('header', props.machine);
    const {
      visible: footerVisible,
      style: footerStyle,
      widgets: footerWidgets,
    } = useLayout('footer', props.machine);

    return {
      ...props.machine,
      headerVisible,
      headerStyle,
      footerVisible,
      footerStyle,
      footerWidgets,
    };
  },
});
</script>

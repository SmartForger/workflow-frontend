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
      <workflow-widget-component
        v-for="widget in stepInfo.widgets"
        :key="widget.id"
        :modelValue="data[widget.field]"
        @update:modelValue="updateData(widget.field, $event)"
        :details="widget"
      >
      </workflow-widget-component>
    </div>
    <div class="footer" v-if="footerVisible">
      <q-toolbar class="shadow-3 row" :style="footerStyle">
        <div class="col" :key="widget.id" v-for="widget in footerWidgets">
          <workflow-widget-component @trigger="sendEvent($event)" :details="widget">
          </workflow-widget-component>
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
.body {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { WorkflowMachine } from 'src/common/types/WorkflowMachine';
import { useLayout } from 'src/common/composables/useLayout';
import WorkflowWidgetComponent from './WorkflowWidget.vue';

export default defineComponent({
  name: 'WorkflowStepRenderer',
  components: { WorkflowWidgetComponent },
  setup() {
    const machine = inject('machine') as WorkflowMachine;

    const { visible: headerVisible, style: headerStyle } = useLayout('header', machine);
    const {
      visible: footerVisible,
      style: footerStyle,
      widgets: footerWidgets,
    } = useLayout('footer', machine);

    return {
      ...machine,
      headerVisible,
      headerStyle,
      footerVisible,
      footerStyle,
      footerWidgets,
    };
  },
});
</script>

<template>
  <h5 class="q-my-md text-center">Create widget</h5>
  <q-tabs
    v-model="tab"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
  >
    <q-tab name="settings" label="Settings" />
    <q-tab name="validation" label="Validation" />
  </q-tabs>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel class="panel" name="settings">
      <q-form class="settings" @submit="save">
        <div class="scrollable">
          <prodeo-widget-general-settings
            :details="details"
            @update="emit('update', $event)"
          ></prodeo-widget-general-settings>
          <prodeo-input-settings
            :details="details"
            @update="emit('update', $event)"
            v-if="details.type === 'QInput'"
          ></prodeo-input-settings>
          <prodeo-select-settings
            :details="details"
            @update="emit('update', $event)"
            v-if="details.type === 'QSelect'"
          ></prodeo-select-settings>
          <prodeo-button-settings
            :details="details"
            @update="emit('update', $event)"
            v-if="details.type === 'QBtn'"
          ></prodeo-button-settings>
        </div>
        <div class="actions row q-mt-md justify-end">
          <q-btn class="q-mr-sm" type="submit" label="Save" icon="save" color="primary"></q-btn>
          <q-btn label="Cancel" color="red" @click="cancel()"></q-btn>
        </div>
      </q-form>
    </q-tab-panel>

    <q-tab-panel class="panel" name="validation">
      <div>
        <div class="text-h6">Validation rules</div>
        Dynamic filter component will go here
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<style lang="scss" scoped>
.panel {
  height: 60vh;

  > * {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
.scrollable {
  flex: 1;
  overflow-y: auto;
}
.actions {
  flex: none;
}
</style>

<script lang="ts">
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import { defineComponent, PropType, ref } from 'vue';
import ProdeoWidgetGeneralSettings from './ProdeoWidgetGeneralSettings.vue';
import ProdeoButtonSettings from './button/ProdeoButtonSettings.vue';
import ProdeoInputSettings from './input/ProdeoInputSettings.vue';
import ProdeoSelectSettings from './select/ProdeoSelectSettings.vue';

export default defineComponent({
  components: {
    ProdeoWidgetGeneralSettings,
    ProdeoButtonSettings,
    ProdeoInputSettings,
    ProdeoSelectSettings,
  },
  props: {
    details: {
      type: Object as PropType<WorkflowWidget>,
      required: true,
    },
  },
  emits: ['update', 'save', 'cancel'],
  setup(props, { emit }) {
    const details = ref<WorkflowWidget>(props.details);
    const { update, cancel, save } = useDetailsForm<WorkflowWidget>(
      { details: details.value },
      emit
    );
    const tab = ref('settings');

    return { update, cancel, save, emit, tab };
  },
});
</script>

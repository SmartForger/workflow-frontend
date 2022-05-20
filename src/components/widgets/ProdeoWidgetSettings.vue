<template>
  <h5 class="q-my-md text-center">Create widget</h5>
  <q-form class="settings" @submit="save">
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
      </q-tab-panel>

      <q-tab-panel class="panel" name="validation">
        <div class="scrollable">
          <div class="row">
            <div class="col-6">
              <q-toggle
                color="primary"
                label="Required"
                name="ruleRequired"
                v-model="ruleRequired"
              />
            </div>
          </div>
          <q-input
            class="pvn-field"
            dense
            outlined
            type="textarea"
            name="ruleFilter"
            v-model="ruleFilter"
            label="Filter"
          ></q-input>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <div class="actions row q-pa-md q-pt-none justify-end">
      <q-btn class="q-mr-sm" type="submit" label="Save" icon="save" color="primary"></q-btn>
      <q-btn label="Cancel" color="red" @click="cancel()"></q-btn>
    </div>
  </q-form>
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
import { defineComponent, PropType, ref } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
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
    const { update, cancel, save, getChildFieldModel } = useDetailsForm<WorkflowWidget>(
      props,
      emit
    );
    const tab = ref('settings');
    const ruleRequired = getChildFieldModel('rules', 'required', false);
    const ruleFilter = getChildFieldModel('rules', 'filter', '');

    return { update, cancel, save, emit, tab, ruleRequired, ruleFilter };
  },
});
</script>

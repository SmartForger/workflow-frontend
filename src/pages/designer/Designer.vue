<template>
  <q-layout :width="screenWidth" view="lHr lpR lFr">
    <q-header elevated class="bg-white text-black" height-hint="98">
      <q-toolbar class="q-pb-xs">
        <q-btn flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-icon
            size="35px"
            name="img:src/assets/images/flowchart.svg"
          ></q-icon>
          Workflow Designer
        </q-toolbar-title>

        <q-space></q-space>

        <icon-toggle
          v-model="screenWidth"
          :options="screenWidthOptions"
        ></icon-toggle>

        <q-space></q-space>

        <icon-toggle v-model="formLayout" :options="formLayoutOptions">
        </icon-toggle>

        <q-space></q-space>

        <q-btn
          class="bg-green text-white"
          label="Preview"
          outlined
          icon="smart_display"
        />

        <q-space></q-space>
        <q-btn flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-grey-1 text-black"
      :width="460"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
    </q-drawer>

    <q-drawer
      class="bg-grey-1 text-black"
      :width="400"
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      bordered
    >
    </q-drawer>

    <q-page-container>
      <q-page class="q-ma-sm"> </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDrawer } from 'src/common/composables/useDrawer';
import IconToggle from 'src/components/IconToggle.vue';

export default defineComponent({
  name: 'DesignerComponent',

  components: {
    IconToggle,
  },

  setup() {
    const { open: leftDrawerOpen, toggleOpen: toggleLeftDrawer } = useDrawer();
    const { open: rightDrawerOpen, toggleOpen: toggleRightDrawer } =
      useDrawer();

    const screenWidth = ref('desktop');
    const screenWidthOptions = [
      { value: 'mobile', tooltip: 'Mobile', icon: 'smartphone' },
      { value: 'tablet', tooltip: 'Tablet', icon: 'tablet' },
      { value: 'desktop', tooltip: 'Desktop', icon: 'monitor' },
    ];

    const formLayout = ref('stepper');
    const formLayoutOptions = [
      {
        value: 'stepper',
        tooltip: 'Stepper',
        icon: 'img:src/assets/images/steps_slider.svg',
      },
      {
        value: 'singleStep',
        tooltip: 'Single Step',
        icon: 'img:src/assets/images/single_step.svg',
      },
    ];

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      rightDrawerOpen,
      toggleRightDrawer,
      screenWidthOptions,
      screenWidth,
      formLayoutOptions,
      formLayout,
    };
  },
});
</script>

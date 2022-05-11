import { boot } from 'quasar/wrappers';

import IconRenderer from '../components/IconRenderer.vue';
import SelectComponent from '../components/Select.vue';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.component('icon-renderer', IconRenderer);
  app.component('select-component', SelectComponent);
});

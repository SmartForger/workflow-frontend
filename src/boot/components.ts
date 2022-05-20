import { boot } from 'quasar/wrappers';

import ChipSelect from '../components/ChipSelect.vue';
import FileUploader from '../components/FileUploader.vue';
import IconRenderer from '../components/IconRenderer.vue';
import IconToggle from '../components/IconToggle.vue';
import PageHeader from '../components/PageHeader.vue';
import SearchInput from '../components/SearchInput.vue';
import SelectComponent from '../components/Select.vue';
import SidebarLink from '../components/SidebarLink.vue';
import WorkflowRenderer from '../components/renderer/WorkflowRenderer.vue';
import ProdeoWidget from '../components/widgets/ProdeoWidget.vue';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.component('chip-select', ChipSelect);
  app.component('file-uploader', FileUploader);
  app.component('icon-renderer', IconRenderer);
  app.component('icon-toggle', IconToggle);
  app.component('page-header', PageHeader);
  app.component('search-input', SearchInput);
  app.component('select-component', SelectComponent);
  app.component('sidebar-link', SidebarLink);
  app.component('workflow-renderer', WorkflowRenderer);
  app.component('prodeo-widget', ProdeoWidget);
});

import './styles/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { DataList } from './components/data';
import { Button, ListSelect, ScrollSelect, SegmentedControl, TextField } from './components/forms';
import { Icon } from './components/media';
import { Note, Piano, Score } from './components/music';
import { Heading, Text } from './components/typography';

const app = createApp(App);

app.use(router);
app
  .component('DataListItem', DataList.Item)
  .component('DataListLabel', DataList.Label)
  .component('DataListRoot', DataList.Root)
  .component('DataListValue', DataList.Value);
app
  .component('Button', Button)
  .component('ListSelectRoot', ListSelect.Root)
  .component('ListSelectItem', ListSelect.Item)
  .component('ScrollSelectRoot', ScrollSelect.Root)
  .component('ScrollSelectItem', ScrollSelect.Item)
  .component('SegmentedControlRoot', SegmentedControl.Root)
  .component('SegmentedControlItem', SegmentedControl.Item)
  .component('TextField', TextField);
app.component('Icon', Icon);
app.component('Note', Note).component('Piano', Piano).component('Score', Score);
app.component('Heading', Heading).component('Text', Text);

app.mount('#app');

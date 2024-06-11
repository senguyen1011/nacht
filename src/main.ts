import './styles/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { DataList } from './components/data';
import { Button, ScrollPicker, SegmentedControl, TextField } from './components/forms';
import { Icon } from './components/media';
import { Piano, Score } from './components/music';
import { Heading, Text } from './components/typography';

const app = createApp(App);

app.use(router);
app
  .component('DataListItem', DataList.Item)
  .component('DataListLabel', DataList.Label)
  .component('DataListRoot', DataList.Root)
  .component('DataListValue', DataList.Value)
app
  .component('Button', Button)
  .component('ScrollPickerRoot', ScrollPicker.Root)
  .component('ScrollPickerItem', ScrollPicker.Item)
  .component('SegmentedControlRoot', SegmentedControl.Root)
  .component('SegmentedControlItem', SegmentedControl.Item)
  .component('TextField', TextField);
app.component('Icon', Icon);
app.component('Piano', Piano).component('Score', Score);
app.component('Heading', Heading).component('Text', Text);

app.mount('#app');

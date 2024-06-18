import Button from './Button.vue';
import * as ListSelect from './ListSelect';
import * as ScrollSelect from './ScrollSelect';
import * as SegmentedControl from './SegmentedControl';
import TextField from './TextField.vue';

interface InputProps {
  size?: 'sm' | 'md' | 'lg';
}

interface ButtonProps extends Omit<InputProps, 'type'> {
  color?: 'grey' | 'accent';
  type?: 'grey' | 'solid' | 'ghost';
  link?: boolean;
  icon?: boolean;
}

export type { ButtonProps, InputProps };
export { Button, ListSelect, ScrollSelect, SegmentedControl, TextField };

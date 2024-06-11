import Button from './Button.vue';
import * as ScrollPicker from './ScrollPicker';
import * as SegmentedControl from './SegmentedControl';
import TextField from './TextField.vue';

interface InputProps {
  size?: 'sm' | 'md' | 'lg';
}

interface ButtonProps extends Omit<InputProps, 'type'> {
  color?: 'grey' | 'accent';
  // type?: 'ghost';
  link?: boolean;
  icon?: boolean;
}

export type { ButtonProps, InputProps };
export { Button, ScrollPicker, SegmentedControl, TextField };

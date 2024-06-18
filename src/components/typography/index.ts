import { addToClasses } from '@/lib';
import { computed, type ComputedRef } from 'vue';
import Heading from './Heading.vue';
import Text from './Text.vue';

/* Types */
type fontSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';
type fontWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
type fontFamily = 'body' | 'heading' | 'display';
type fontColor = 'default' | 'muted' | 'accent' | 'accent-hover';
type textAlign = 'left' | 'right' | 'center' | 'justify';

/* Props */
interface TextProps {
  family?: fontFamily;
  size?: fontSize;
  weight?: fontWeight;
  color?: fontColor;
  align?: textAlign;
  transform?: 'capitalize' | 'uppercase' | 'lowercase';
}

/* Functions */
function getTextClasses(props: TextProps): ComputedRef<string[]> {
  return computed(() => {
    const res: string[] = [];
    addToClasses(res, props.family, 'font');
    addToClasses(res, props.size, 'font');
    addToClasses(res, props.weight, 'font');
    addToClasses(res, props.color === 'default' ? '' : props.color, 'text');
    addToClasses(res, props.align, 'text');
    addToClasses(res, props.transform, 'text');
    return res;
  });
}

export type { fontFamily, fontSize, fontWeight, textAlign, TextProps };
export { getTextClasses };
export { Heading, Text };

<script setup lang="ts">
  import { type ComputedRef } from 'vue';
  import { type TextProps, getTextClasses, type fontSize } from '.';

  /* Props */
  const props = withDefaults(defineProps<TextProps>(), {
    family: 'heading',
    size: '4xl',
    weight: 'semibold',
  });

  /* Classes */
  const classes: ComputedRef<string[]> = getTextClasses(props);

  const tagMap: { [key in fontSize]: string } = {
    'xs': 'h6',
    'sm': 'h5',
    'md': 'h4',
    'lg': 'h3',
    'xl': 'h2',
    '2xl': 'h2',
    '3xl': 'h2',
    '4xl': 'h1',
    '5xl': 'h1',
    '6xl': 'h1',
    '7xl': 'h1',
    '8xl': 'h1',
    '9xl': 'h1',
  };
</script>

<template>
  <component
    :is="tagMap[props.size]"
    class="heading"
    :class="classes"
  >
    <slot></slot>
  </component>
</template>

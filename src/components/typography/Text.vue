<script setup lang="ts">
  import type { ComputedRef } from 'vue';
  import { type TextProps, getTextClasses } from '.';

  /* Props */
  interface Props extends TextProps {
    is?: 'code' | 'p' | 'small' | 'span' | 'sub' | 'sup';
  }
  const props = withDefaults(defineProps<Props>(), {
    is: 'p',
  });

  /* Classes */
  const classes: ComputedRef<string[]> = getTextClasses(props);
</script>

<template>
  <component
    :is="props.is"
    :class="classes"
  >
    <slot></slot>
  </component>
</template>

<style></style>

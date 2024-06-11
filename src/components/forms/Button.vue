<script setup lang="ts">
  import { computed, type ComputedRef } from 'vue';
  import { addToClasses } from '@/lib';
  import type { ButtonProps } from '.';

  /** Props */
  const props = withDefaults(defineProps<ButtonProps>(), {
    size: 'md',
  });

  /** Computed */
  const classes: ComputedRef<string[]> = computed(() => {
    const res: string[] = [];
    addToClasses(res, props.size);
    addToClasses(res, props.color);
    return res;
  });
</script>

<template>
  <a
    v-if="props.link"
    class="btn"
    :class="classes"
    :icon="props.icon"
  >
    <slot></slot>
  </a>
  <button
    v-else
    class="btn"
    :class="classes"
    :icon="props.icon"
  >
    <slot></slot>
  </button>
</template>

<style>
  /* See parent styles in TextField.vue */
  .btn {
    border-radius: var(--radius-full);
  }
  .btn:hover {
    --inpt-text: var(--text-accent);
  }
  .btn:is(:active, :focus) {
    --inpt-text: var(--text-accent-hover);
  }

  .btn.accent {
    --inpt-text: var(--text-accent);
  }
  .btn:is(:hover, :active, :focus).accent {
    --inpt-text: var(--text-accent-hover);
  }

  .btn[icon='true'] {
    display: flex;
    height: var(--height);
    min-height: var(--height);
    width: var(--height);
    min-width: var(--height);
    padding: 0;
  }
</style>

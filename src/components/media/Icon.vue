<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';
  interface Props {
    name: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }

  const props = defineProps<Props>();
  const icon = defineAsyncComponent(() => import(`@/assets/icons/${props.name}.svg`));
</script>

<template>
  <div v-if="!icon">&nbsp;</div>
  <component
    :is="icon"
    class="icon"
    :class="props.size"
  />
</template>

<style>
  .icon {
    --size: var(--font-md);
    height: var(--size);
    width: var(--size);
  }

  .icon.xs {
    --size: var(--font-sm);
  }
  .icon.sm {
    --size: var(--font-md);
  }
  .icon.md {
    --size: var(--font-lg);
  }
  .icon.lg {
    --size: var(--font-xl);
  }
  .icon.xl {
    --size: var(--font-2xl);
  }
</style>

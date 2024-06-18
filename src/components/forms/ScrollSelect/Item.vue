<script setup lang="ts">
  interface Props {
    value: string;
  }
  const props = defineProps<Props>();
</script>

<template>
  <div
    class="item"
    :data-value="props.value"
  >
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style>
  .scroll-select .item {
    --itm-text: var(--text);
    --itm-background: transparent;
    display: inline-flex;
    justify-content: center;
    padding: var(--space-sm) var(--space-sm);
    color: var(--itm-text);
    background-color: var(--itm-background);
    border-radius: var(--radius-xl);
    scroll-snap-align: center;
    transition-property: color, background-color, box-shadow, transform;
    transition-timing-function: var(--transition-ease);
    transition-duration: var(--transition-time);
    cursor: pointer;
  }
  .scroll-select .item:hover {
    --itm-text: var(--text-accent);
    --itm-background: var(--background-input-hover);
  }
  .scroll-select .item:is(:active, :focus) {
    --itm-text: var(--text-accent-hover);
    --itm-background: var(--background-input-focus);
  }
  .scroll-select .item:active {
    box-shadow: var(--ring-accent);
  }
  .scroll-select .item.active {
    --itm-text: var(--text-accent);
    transform: scale(1.2);
  }
  .scroll-select .item .wrapper {
    pointer-events: none;
  }
</style>

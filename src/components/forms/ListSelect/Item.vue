<script setup lang="ts">
  interface Props {
    value: string;
  }
  const props = defineProps<Props>();
</script>

<template>
  <li
    class="item"
    :data-value="props.value"
  >
    <slot></slot>
  </li>
</template>

<style>
  .list-select li.item {
    --height: var(--space-xl);
    --pad-x: var(--space-md);
    --gap: var(--space-sm);
    --font-size: var(--font-md);
    --icon-size: var(--font-lg);

    --itm-text: var(--text);
    --itm-background: transparent;
    display: block;
    height: var(--height);
    width: 100%;
    padding: var(--size-px) var(--pad-x);
    gap: var(--gap);
    font-family: var(--font-body);
    font-size: var(--font-size);
    color: var(--itm-text);
    text-align: left;
    background-color: var(--itm-background);
    border-width: 0;
    border-radius: var(--radius-xl);
    transition-property: color, background-color, border-color, box-shadow;
    transition-timing-function: var(--transition-ease);
    transition-duration: var(--transition-time);
    cursor: pointer;
  }

  .list-select li.item:hover,
  .list-select li.item.active {
    --itm-text: var(--text-accent);
    --itm-background: var(--background-input-hover);
  }
  .list-select li.item:is(:active, :focus) {
    --itm-text: var(--text-accent-hover);
    --itm-background: var(--background-input-focus);
  }
  .list-select li.item:active {
    box-shadow: var(--ring-accent);
  }

  .list-select li.item * {
    pointer-events: none;
  }
</style>

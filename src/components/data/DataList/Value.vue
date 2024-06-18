<template>
  <dd class="value"><slot></slot></dd>
</template>

<style>
  .data-list dd.value {
    --height: var(--space-xl);
    --pad-x: var(--space-md);
    --gap: var(--space-sm);
    --font-size: var(--font-md);

    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: var(--height);
    padding: 1px var(--pad-x);
    font-size: var(--font-size);
    background-color: var(--background-input-inset);
    border: 1px solid var(--border-input-inset);
    border-radius: var(--radius-xl);
  }
</style>

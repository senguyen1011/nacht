<template><dl class="data-list"><slot></slot></dl></template>

<style>
.data-list {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-md);
}
</style>
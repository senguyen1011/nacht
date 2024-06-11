<template><div class="item"><slot></slot></div></template>

<style>
.scroll-picker .item {
  display: inline-flex;
  justify-content: center;
  padding: var(--space-sm) var(--space-sm);
  scroll-snap-align: center;
}
</style>
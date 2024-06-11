<template>
  <div class="item"><slot></slot></div>
</template>

<style>
.data-list .item {
  display: grid;
  grid-template-columns: subgrid;
  align-items: center;
  gap: inherit;
  grid-column: span 2;
}
</style>
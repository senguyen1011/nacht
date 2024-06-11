<script setup lang="ts">
  import { ref, type Ref } from 'vue';
  interface Props {
    value: string;
  }
  const props = defineProps<Props>();

  /** Ref */
  const input: Ref<HTMLInputElement | undefined> = ref();
</script>

<template>
  <div
    class="inpt"
    @click="input!.checked = true"
  >
    <input
      type="radio"
      ref="input"
      :value="props.value"
    />
    <slot></slot>
  </div>
</template>

<style>
  .segmented-control .inpt {
    --inpt-text: var(--text-muted);
    --inpt-background: transparent;
    --inpt-border: transparent;
    border-radius: var(--radius-full);
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    cursor: pointer;
  }
  .segmented-control .inpt:hover {
    --inpt-text: var(--text-accent);
    --inpt-background: var(--background-input-hover);
    --inpt-border: transparent;
  }
  .segmented-control .inpt:active {
    --inpt-text: var(--text-hover);
    --inpt-background: var(--background-input-focus);
    --inpt-border: transparent;
    box-shadow: none;
  }
  .segmented-control .inpt:has(input[type='radio']:checked) {
    --inpt-text: var(--text-accent);
    --inpt-background: transparent;
    --inpt-border: var(--border-accent);
    z-index: 1;
  }
  .segmented-control .inpt:has(input[type='radio']:checked):hover {
    --inpt-text: var(--text-accent-hover);
    --inpt-background: var(--background-ghost-accent-hover);
    --inpt-border: var(--border-accent-hover);
  }
  .segmented-control .inpt:has(input[type='radio']:checked):is(:active, :focus) {
    --inpt-text: var(--text-accent-hover);
    --inpt-background: var(--background-ghost-accent-hover);
    --inpt-border: var(--border-accent-hover);
    box-shadow: var(--ring-accent);
  }

  /* Resets */
  .inpt input[type='radio'] {
    width: 0%;
    appearance: none;
  }
</style>

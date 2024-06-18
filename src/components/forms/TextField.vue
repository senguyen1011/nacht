<script setup lang="ts">
  import { ref, type Ref } from 'vue';
  import type { InputProps } from '.';

  /** Props */
  interface Props extends InputProps {
    id?: string;
    type?: 'text' | 'search';
    placeholder?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    type: 'text'
  });

  /** Refs */
  const input: Ref<HTMLInputElement | undefined> = ref();

  /** Emits */
  const emit = defineEmits<{ (e: 'input', value?: string): void }>();
</script>

<template>
  <div
    class="inpt"
    :class="props.size"
    @click="input?.focus()"
  >
    <svg
      v-if="props.type === 'search'"
      class="search-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <input
      ref="input"
      :id="props.id"
      :name="props.id"
      :type="props.type"
      :placeholder="props.placeholder"
      @input="emit('input', input?.value)"
    />
  </div>
</template>

<style>
  .inpt,
  .btn {
    --height: var(--space-xl);
    --pad-x: var(--space-md);
    --gap: var(--space-sm);
    --font-size: var(--font-md);
    --icon-size: var(--font-lg);

    --inpt-text: var(--text);
    --inpt-background: var(--background-input);
    --inpt-border: var(--border);

    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: var(--height);
    min-height: var(--height);
    width: 100%;
    padding: var(--size-px) var(--pad-x);
    gap: var(--gap);
    font-family: var(--font-body);
    font-size: var(--font-size);
    color: var(--inpt-text);
    background-color: var(--inpt-background);
    border-width: 1px;
    border-style: solid;
    border-color: var(--inpt-border);
    box-shadow: var(--shadow-md);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }
  .inpt {
    border-radius: var(--radius-xl);
  }
  :is(.inpt, .btn):hover {
    --inpt-background: var(--background-input-hover);
    --inpt-border: var(--border-accent);
  }
  :is(.inpt, .btn):has(:active, :focus) {
    --inpt-background: var(--background-input-focus);
    --inpt-border: var(--border-accent-hover);
  }
  :is(.inpt, .btn):active {
    box-shadow: var(--ring-accent);
  }

  :is(.inpt, .btn).lg {
    --height: var(--space-2xl);
    --pad-x: var(--space-lg);
    --gap: var(--space-sm);
    --font-size: var(--font-lg);
  }

  /* Search */
  .inpt:has(input[type='search']) {
    border-radius: var(--radius-full);
  }

  .inpt .search-icon {
    --search-icon-color: var(--text-accent);
    height: var(--icon-size);
    width: var(--icon-size);
    color: var(--search-icon-color);
  }
  .inpt:hover .search-icon {
    --search-icon-color: var(--text-accent-hover);
  }

  /* Resets */
  .inpt input {
    width: 100%;
    padding: 0;
    color: inherit;
    background: none;
    border: none;
    outline: 0;
  }

  .inpt ::placeholder {
    color: var(--text-muted);
    opacity: 1;
  }
  .inpt ::-ms-input-placeholder {
    color: var(--text-muted);
  }

  .inpt input[type='search']::-webkit-search-cancel-button {
    appearance: none;
    -webkit-appearnce: none;
  }
</style>

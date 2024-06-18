<script setup lang="ts">
  import { onMounted, ref, type Ref } from 'vue';
  import type { ButtonProps } from '../.';

  /** Props */
  interface Props extends Omit<ButtonProps, 'link'> {
    name: string;
    value?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    size: 'md'
  });

  /** Refs */
  const root: Ref<HTMLDivElement | undefined> = ref();
  const children: Ref<HTMLCollection | undefined> = ref();
  const indicator: Ref<HTMLDivElement | undefined> = ref();

  /** Emits */
  const emit = defineEmits<{
    (e: 'input', value: string): void;
  }>();

  /** On Mount */
  onMounted(() => {
    if (root.value) {
      children.value = root.value!.getElementsByClassName('inpt');
      indicator.value!.style.width = `calc(100% / ${children.value.length})`;
      let ind = 0;
      for (let child of children.value) {
        child.classList.add(props.size);

        const radioInput: HTMLInputElement | null = child.querySelector("input[type='radio']");
        radioInput!.setAttribute('name', props.name);
        if (props.value && radioInput!.value === props.value) {
          radioInput!.setAttribute('checked', 'true');
          indicator.value!.style.transform = `translateX(${ind * 100}%)`;
        } else {
          if (ind === 0) {
            radioInput!.setAttribute('checked', 'true');
            indicator.value!.style.transform = `translateX(${ind * 100}%)`;
          }
        }

        ind++;
      }
    }
  });

  /** Methods */
  function handleClick() {
    if (children.value) {
      let ind = 0;
      for (let child of children.value!) {
        const radioInput: HTMLInputElement | null = child.querySelector("input[type='radio']");
        if (radioInput!.checked) {
          indicator.value!.style.transform = `translateX(${ind * 100}%)`;
          emit('input', radioInput!.value);
        }
        ind++;
      }
    }
  }
</script>

<template>
  <div
    class="segmented-control"
    ref="root"
    @click="handleClick"
  >
    <slot></slot>
    <div
      class="indicator"
      ref="indicator"
    ></div>
  </div>
</template>

<style>
  .segmented-control {
    position: relative;
    display: flex;
    height: fit-content;
    width: 100%;
    background-color: var(--background-input-inset);
    border: 1px solid var(--border-input-inset);
    border-radius: var(--radius-full);
  }

  .segmented-control .indicator {
    --indctr-background: var(--background-input);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--indctr-background);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md);
    transition-property: transform;
    transition-timing-function: var(--transition-ease);
    transition-duration: var(--transition-time);
  }
</style>

<script setup lang="ts">
  import { onMounted, ref, type Ref } from 'vue';
  import type { ButtonProps } from '../.';
  import { allNotes } from '@/lib';
  import { ClientRequest } from 'http';

  /** Props */

  /** Refs */
  const root: Ref<HTMLDivElement | undefined> = ref();
  const children: Ref<HTMLCollectionOf<Element> | undefined> = ref();
  const scroll: Ref<HTMLDivElement | undefined> = ref();
  const selector: Ref<HTMLDivElement | undefined> = ref();
  const childWidth: Ref<number> = ref(0);
  const activeChild: Ref<HTMLDivElement | undefined> = ref();
  const scale = 1.25;
  const isUsingButton: Ref<boolean> = ref(false);
  // /** Emits */
  // const emit = defineEmits<{
  //   (e: 'input', value?: string): void;
  // }>();

  /** On Mount */
  onMounted(() => {
    if (root.value) {
      children.value = root.value!.getElementsByClassName('item');
      root.value!.style.gridTemplateColumns = `repeat(${children.value.length}, 1fr)`;

      for (let child of children.value) {
        if ((child as HTMLDivElement).offsetWidth > childWidth.value) {
          childWidth.value = (child as HTMLDivElement).offsetWidth;
        }
      }
      for (let child of children.value) {
        (child as HTMLDivElement).style.width = `${childWidth.value}px`;
      }

      activeChild.value = children.value[0] as HTMLDivElement;
      const offset: number = (root.value!.offsetWidth - childWidth.value) / 2;
      const offsetElements = root.value!.getElementsByClassName('offset');
      for (let child of offsetElements) {
        (child as HTMLDivElement).style.width = `${offset}px`;
      }
      activeChild.value.style.transform = `scale(${scale})`;
      activeChild.value.scrollIntoView({ inline: 'center' });
    }
  });

  /** Methods */
  function handleScroll(): void {
    // const offset: number = (root.value!.getBoundingClientRect().width - childWidth.value) / 2;
    if (isUsingButton.value) return;
    activeChild.value!.style.transform = `scale(1)`;
    console.log(scroll.value!.scrollLeft / childWidth.value);

    activeChild.value = children.value![
      Math.floor(scroll.value!.scrollLeft / childWidth.value)
    ] as HTMLDivElement;
    activeChild.value!.style.transform = `scale(${scale})`;
    activeChild.value!.scrollIntoView({ inline: 'center' });
  }

  function handleScrollClick(dir: -1 | 1): void {
    isUsingButton.value = true;
    activeChild.value!.style.transform = `scale(1)`;
    if (dir === 1) {
      const next = activeChild.value!.nextElementSibling as HTMLDivElement;
      if (!next.classList.contains('offset')) {
        activeChild.value = next;
      } else {
        activeChild.value = children.value![0] as HTMLDivElement;
      }
    } else if (dir === -1) {
      const prev = activeChild.value!.previousElementSibling as HTMLDivElement;
      if (!prev.classList.contains('offset')) {
        activeChild.value = prev;
      } else {
        activeChild.value = children.value![children.value!.length - 1] as HTMLDivElement;
      }
    }
    activeChild.value!.style.transform = `scale(${scale})`;
    activeChild.value!.scrollIntoView({ inline: 'center' });
    setTimeout(() => {
      isUsingButton.value = false;
    }, 2500);
  }
</script>

<template>
  <div class="scroll-picker-root">
    <button
      class="left"
      @click="handleScrollClick(-1)"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <button
      class="right"
      @click="handleScrollClick(1)"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div
      class="selector"
      ref="selector"
    ></div>
    <div
      class="scroll-wrapper"
      ref="scroll"
      @scroll="handleScroll"
    >
      <div
        class="scroll-picker"
        ref="root"
      >
        <div class="offset">&nbsp;</div>
        <slot></slot>
        <div class="offset">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<style>
  .scroll-picker-root {
    position: relative;
    width: 100%;
  }

  .scroll-wrapper {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
  }

  .scroll-picker-root button {
    --size: var(--font-3xl);
    --btn-border: transparent;
    position: absolute;
    top: calc(50% - (var(--size) / 2));
    height: var(--size);
    width: var(--size);
    border-width: 1px;
    border-style: solid;
    border-color: var(--btn-border);
    border-radius: var(--radius-full);
    outline: 0;
    z-index: 2;
  }
  .scroll-picker-root button.left {
    left: 0;
  }
  .scroll-picker-root button.right {
    right: 0;
  }

  .scroll-picker {
    white-space: nowrap;
  }

  .scroll-picker-root .selector {
    position: absolute;
    height: 100%;
    background-color: var(--amber-a4);
    z-index: 2;
    pointer-events: none;
  }

  .scroll-picker-root .offset {
    display: inline-flex;
    height: 100%;
  }

  .scroll-picker-root::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        var(--background) 0%,
        var(--gradient-fade) 25%,
        var(--gradient-fade) 75%,
        var(--background)
      )
      100%;
    pointer-events: none;
    z-index: 1;
  }

  .scroll-wrapper::-webkit-scrollbar {
    /* display: none; */
  }
</style>

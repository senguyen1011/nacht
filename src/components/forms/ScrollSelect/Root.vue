<script setup lang="ts">
  import { onMounted, ref, type Ref } from 'vue';

  /** Props */
  interface Props {
    value?: string;
  }
  const props = defineProps<Props>();

  /** Refs */
  const root: Ref<HTMLDivElement | undefined> = ref();
  const children: Ref<HTMLCollectionOf<HTMLDivElement> | undefined> = ref();
  const scroll: Ref<HTMLDivElement | undefined> = ref();
  const activeChild: Ref<HTMLDivElement | undefined> = ref();

  /** Emits */
  const emit = defineEmits<{
    (e: 'input', value?: string): void;
  }>();

  /** On Mount */
  onMounted(() => {
    if (root.value) {
      children.value = root.value!.getElementsByClassName(
        'item'
      ) as HTMLCollectionOf<HTMLDivElement>;
      root.value!.style.gridTemplateColumns = `repeat(${children.value.length}, 1fr)`;

      let childWidth: number = 0;
      for (let child of children.value) {
        child.addEventListener('click', handleClick);
        if (child.offsetWidth > childWidth) {
          childWidth = child.offsetWidth;
        }
        if (props.value && child.getAttribute('data-value') === props.value) {
          activeChild.value = child;
        }
      }
      for (let child of children.value) {
        child.style.width = `${childWidth}px`;
      }

      const offset: number = (root.value!.offsetWidth - childWidth) / 2;
      const offsetElements = root.value!.getElementsByClassName(
        'offset'
      ) as HTMLCollectionOf<HTMLDivElement>;
      for (let child of offsetElements) {
        child.style.width = `${offset}px`;
      }

      if (!props.value) {
        activeChild.value = children.value[0];
      }
      activeChild.value!.classList.add('active');
      activeChild.value!.scrollIntoView({ inline: 'center' });
    }
  });

  /** Methods */
  function handleClick(evt: MouseEvent) {
    activeChild.value!.classList.remove('active');
    activeChild.value = evt.target as HTMLDivElement;
    activeChild.value.classList.add('active');
    activeChild.value.scrollIntoView({ inline: 'center' });
    let value: string | null = (evt.target as HTMLDivElement).getAttribute('data-value');
    emit('input', value === null ? undefined : value);
  }
</script>

<template>
  <div class="scroll-select-root">
    <div
      class="scroll-wrapper"
      ref="scroll"
    >
      <div
        class="scroll-select"
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
  .scroll-select-root {
    position: relative;
    width: 100%;
    z-index: 1;
  }

  .scroll-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: calc(100% * 1.2);
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
  }

  .scroll-select {
    white-space: nowrap;
  }

  .scroll-select-root .offset {
    display: inline-flex;
    align-items: center;
    height: 100%;
  }

  .scroll-select-root::before {
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
</style>

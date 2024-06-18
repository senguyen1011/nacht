<script setup lang="ts">
  import { onMounted, ref, type Ref } from 'vue';

  /** Props */
  interface Props {
    value?: string;
  }
  const props = defineProps<Props>();

  /** Refs */
  const list: Ref<HTMLUListElement | undefined> = ref();
  const children: Ref<HTMLCollectionOf<HTMLLIElement> | undefined> = ref();
  const activeChild: Ref<HTMLLIElement | undefined> = ref();

  /** Emits */
  const emit = defineEmits<{
    (e: 'input', value?: string): void;
  }>();

  /** On Mount */
  onMounted(() => {
    if (list.value) {
      children.value = list.value!.getElementsByClassName(
        'item'
      ) as HTMLCollectionOf<HTMLLIElement>;

      for (let child of children.value) {
        child.addEventListener('click', handleClick);
        if (props.value && child.getAttribute('data-value') === props.value) {
          activeChild.value = child;
          activeChild.value!.classList.add('active');
          activeChild.value!.scrollIntoView();
        }
      }
    }
  });

  /** Methods */
  function handleClick(evt: MouseEvent) {
    activeChild.value!.classList.remove('active');
    activeChild.value = evt.target as HTMLLIElement;
    activeChild.value.classList.add('active');
    let value: string | null = (evt.target as HTMLDivElement).getAttribute('data-value');
    emit('input', value === null ? undefined : value);
  }
</script>

<template>

  <div class="list-select-root">
    <ul
      class="list-select"
      ref="list"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<style>
  div.list-select-root {
    position: relative;
    width: 100%;
    height: 100%;
  }
  ul.list-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    padding: var(--space-xs);
    overflow-y: auto;
    scroll-behavior: smooth;
  }
</style>

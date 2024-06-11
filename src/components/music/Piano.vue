<script setup lang="ts">
  import { computed, ref, onMounted, type ComputedRef, type Ref } from 'vue';
  import * as Tone from 'tone';
  import { mod } from '@/lib';

  /** Props */
  interface Props {
    keys?: number;
    octave?: 2 | 3 | 4 | 5;
    active?: string[];
    interactable?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    keys: 24,
    octave: 3,
    active: () => ['C3', 'E3', 'G3'],
    interactable: true
  });

  /** Data */
  const blackKeyNames: string[] = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
  const whiteKeyNames: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  /** Refs */
  const whiteKeys: Ref<HTMLButtonElement[]> = ref([]);
  const blackKeys: Ref<HTMLButtonElement[]> = ref([]);
  const whiteKeyNotes: Ref<string[]> = ref([]);
  const blackKeyNotes: Ref<string[]> = ref([]);

  /** Computed */
  const whiteKeyCount: ComputedRef<number> = computed(
    () => props.keys - Math.round((props.keys / 12) * 5)
  );
  const blackKeyCount: ComputedRef<number> = computed(() => Math.round((props.keys / 12) * 5));

  /** On Mount */
  onMounted(() => {
    const whiteKeyWidth: number = whiteKeys.value[0].getBoundingClientRect().width;
    let space: number = whiteKeyWidth * 0.6;
    const spacer: number = space * 3.2;
    let threeGroup: boolean = false;
    let count: number = 0;

    whiteKeys.value.forEach((whiteKey: HTMLButtonElement, ind: number) => {
      whiteKeyNotes.value.push(
        whiteKeyNames[mod(ind, whiteKeyNames.length)] +
          (Math.floor(ind / whiteKeyNames.length) + props.octave)
      );
    });

    blackKeys.value.forEach((blackKey: HTMLButtonElement, ind: number) => {
      blackKeyNotes.value.push(
        blackKeyNames[mod(ind, blackKeyNames.length)] +
          (Math.floor(ind / blackKeyNames.length) + props.octave)
      );
      blackKey.style.width = `${whiteKeyWidth * 0.8}px`;
      blackKey.style.left = `${space}px`;

      count++;
      if (threeGroup && count === 3) {
        space += spacer;
        threeGroup = false;
        count = 0;
      } else if (!threeGroup && count === 2) {
        space += spacer;
        threeGroup = true;
        count = 0;
      } else {
        space += spacer / 1.845;
      }
    });
  });

  /** Methods */
  async function onKeyPress(noteName: string): Promise<void> {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(noteName, '8n');
  }
</script>

<template>
  <div class="piano">
    <button
      v-for="key in whiteKeyCount"
      class="key white"
      :class="{
        first: key === 1,
        last: key === whiteKeyCount,
        active: props.active.includes(whiteKeyNotes[key - 1])
      }"
      ref="whiteKeys"
      @click="onKeyPress(whiteKeyNotes[key - 1])"
      :key="`white-key-${key}`"
    >
      <span class="indicator"></span>
    </button>
    <button
      v-for="key in blackKeyCount"
      class="key black"
      :class="{
        active: props.active.includes(blackKeyNotes[key - 1])
      }"
      ref="blackKeys"
      @click="onKeyPress(blackKeyNotes[key - 1])"
      :key="`black-key-${key}`"
    >
      <span class="indicator"></span>
    </button>
  </div>
</template>

<style>
  .piano {
    position: relative;
    display: flex;
    width: 100%;
    min-width: 364px;
    height: var(--size-28);
    gap: -1px;
  }

  .key {
    display: inline-flex;
    justify-content: center;
    align-items: flex-end;
    padding: var(--space-xs);
    background-color: var(--background-key);
    border-width: 1px;
    border-style: solid;
    border-color: var(--border-key);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: var(--radius-md);
    border-bottom-right-radius: var(--radius-md);
    outline: 0;
  }
  .key.active {
    border-color: var(--border-accent-hover);
  }

  .key.white {
    --background-key: var(--background-key-white);
    --border-key: var(--border-key-white);
    width: 100%;
    height: 100%;
  }
  .key.white.first {
    border-top-left-radius: var(--radius-xl);
    border-bottom-left-radius: var(--radius-xl);
  }
  .key.white.last {
    border-top-right-radius: var(--radius-xl);
    border-bottom-right-radius: var(--radius-xl);
  }
  .key.white:hover {
    --background-key: var(--background-key-white-hover);
    --border-key: var(--background-key-white-hover);
  }

  .key.black {
    --background-key: var(--background-key-black);
    --border-key: var(--border-key-black);
    position: absolute;
    top: 0;
    height: var(--size-16);
    border-bottom-left-radius: var(--radius-xl);
    border-bottom-right-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
  }
  .key.black:hover {
    --background-key: var(--background-key-black-hover);
    --border-key: var(--background-key-black-hover);
  }

  .key.active .indicator {
    height: var(--font-sm);
    width: var(--font-sm);
    background-color: var(--background-accent);
    border-radius: var(--radius-full);
  }
</style>

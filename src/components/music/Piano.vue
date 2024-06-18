<script setup lang="ts">
  import { computed, ref, onMounted, type ComputedRef, type Ref } from 'vue';
  import { Note } from 'tonal';
  import * as Tone from 'tone';
  import { accidentalsMap } from '@/lib/music';

  /** Props */
  interface Props {
    keyCount?: number;
    startOctave?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    endOctave?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    active?: string[];
    interactable?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    keyCount: 12,
    startOctave: 3,
    endOctave: 6,
    interactable: true
  });

  /** Data */
  const blackKeyNames: string[] = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
  const whiteKeyNames: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  /** Refs */
  const piano: Ref<HTMLDivElement | undefined> = ref();
  const whiteKeys: Ref<HTMLButtonElement[]> = ref([]);
  const blackKeys: Ref<HTMLButtonElement[]> = ref([]);

  /** Computed */
  const normalActive: ComputedRef<string[]> = computed(() => {
    if (props.active) {
      return props.active.map((note: string) => {
        const notePitch: string = Note.pitchClass(note);
        let noteOctave: number = Number(Note.octave(note));
        if (notePitch in accidentalsMap) {
          switch (notePitch) {
            case 'B#':
              noteOctave += 1;
              break;
            case 'Cb':
              noteOctave -= 1;
              break;
          }
          return `${accidentalsMap[notePitch]}${noteOctave}`;
        }
        return note;
      });
    } else {
      return [];
    }
  });

  const whiteKeyNotes: ComputedRef<string[]> = computed(() => {
    const res: string[] = [];
    for (let octInd: number = props.startOctave; octInd <= props.endOctave; octInd++) {
      whiteKeyNames.forEach((keyName: string) => {
        res.push(`${keyName}${octInd}`);
      });
    }
    return res;
  });
  const blackKeyNotes: ComputedRef<string[]> = computed(() => {
    const res: string[] = [];
    for (let octInd: number = props.startOctave; octInd <= props.endOctave; octInd++) {
      blackKeyNames.forEach((keyName: string) => {
        res.push(`${keyName}${octInd}`);
      });
    }
    return res;
  });

  /** On Mount */
  onMounted(() => {
    if (whiteKeys.value.length > 0) {
      const whiteKeyWidth: number = whiteKeys.value[0].getBoundingClientRect().width;
      let space: number = whiteKeyWidth * 0.6;
      const spacer: number = space * 3.2;
      let threeGroup: boolean = false;
      let count: number = 0;

      blackKeys.value.forEach((blackKey: HTMLButtonElement, ind: number) => {
        blackKey.style.width = `${whiteKeyWidth * 0.9}px`;
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

      if (piano.value) {
        for (const pianoKey of piano.value.children) {
          if (pianoKey.classList.contains('active')) {
            pianoKey.scrollIntoView({ inline: 'center' });
            break;
          }
        }
      }
    }
  });

  /** Methods */
  async function onKeyPress(noteName: string): Promise<void> {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(noteName, '8n');
  }
</script>

<template>
  <div class="piano-root">
    <div
      class="piano"
      ref="piano"
    >
      <button
        v-for="keyInd in whiteKeyNotes.length"
        class="key white"
        :class="{
          first: keyInd === 1,
          last: keyInd === whiteKeyNotes.length,
          active: normalActive.includes(whiteKeyNotes[keyInd - 1]),
          [whiteKeyNotes[keyInd - 1]]: true
        }"
        ref="whiteKeys"
        @click="onKeyPress(whiteKeyNotes[keyInd - 1])"
        :key="`white-key-${keyInd}`"
      >
        <span class="indicator"></span>
      </button>

      <button
        v-for="keyInd in blackKeyNotes.length"
        class="key black"
        :class="{
          active: normalActive.includes(blackKeyNotes[keyInd - 1])
        }"
        ref="blackKeys"
        @click="onKeyPress(blackKeyNotes[keyInd - 1])"
        :key="`black-key-${keyInd}`"
      >
        <span class="indicator"></span>
      </button>
    </div>
  </div>
</template>

<style>
  .piano-root {
    position: relative;
    width: 100%;
    min-width: 364px;
    height: var(--size-28);
    border-radius: var(--radius-xl);
    overflow-x: scroll;
    scroll-behavior: smooth;
  }
  .piano {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
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
    border-bottom-color: var(--border-key);
    border-left-color: var(--border-key);
    border-right-color: var(--border-key);
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
    border-top-color: var(--border-key-white);
    width: 100%;
    min-width: var(--size-6);
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
    border-top-color: var(--border-key-black);
    border-bottom-left-radius: var(--radius-xl);
    border-bottom-right-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
  }
  .key.black:hover {
    --background-key: var(--background-key-black-hover);
    --border-key: var(--background-key-black-hover);
  }

  .key.active .indicator {
    --ind-size: var(--font-sm);
    height: var(--ind-size);
    width: var(--ind-size);
    background-color: var(--background-accent);
    border-radius: var(--radius-full);
  }
</style>

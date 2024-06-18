<script setup lang="ts">
  import { computed, ref, onMounted, type ComputedRef, type Ref } from 'vue';
  import { Accidental, Vex } from 'vexflow';

  /** Props */
  type size = 'sm' | 'md' | 'lg';
  type staveAccidental = { accidental: 'b' | '#'; ind: number };
  interface Props {
    size?: size;
    clef?: 'treble' | 'bass';
    notes: string[];
  }
  const props = withDefaults(defineProps<Props>(), {
    size: 'sm',
    clef: 'treble'
  });

  /** Data */
  const baseHeight: number = 96;
  const sizeMultipler: { [key in size]: number } = { sm: 1.75, md: 3, lg: 4 };

  /** Refs */
  const score: Ref<HTMLDivElement | undefined> = ref();

  /** Computed */
  const staveNotes: ComputedRef<string[]> = computed(() =>
    props.notes.map((note: string) => note.replace('b', '').replace('#', '').split(/(\d+)/).join('/').slice(0, -1))
  );
  const staveAccidentals: ComputedRef<staveAccidental[]> = computed(
    () => {
      const res: staveAccidental[] = [];
      props.notes.forEach((note: string, ind: number) => {
        if (note.includes('b')) {
          res.push({ accidental: 'b', ind: ind });
        } else if (note.includes('#')) {
          res.push({ accidental: '#', ind: ind });
        }
      });
      return res;
    }
  );

  /** On Mount */
  onMounted(() => {
    const { Formatter, Renderer, Stave, StaveNote, Voice } = Vex.Flow;
    const height = baseHeight * sizeMultipler[props.size];
    const width = height * 1.25;
    const renderer = new Renderer(score.value as HTMLDivElement, Renderer.Backends.SVG);
    renderer.resize(width, height);
    const context = renderer.getContext();
    context.setFillStyle('currentColor');
    context.scale(sizeMultipler[props.size], sizeMultipler[props.size]);

    const stave = new Stave(-1, -5, width);
    stave.addClef(props.clef);
    stave.setBegBarType(-1);
    stave.setEndBarType(0);
    stave.setStyle({ strokeStyle: 'var(--text-muted)' });
    stave.setContext(context).draw();
    const chord = new StaveNote({ clef: props.clef, keys: staveNotes.value, duration: 'w' });
    staveAccidentals.value.forEach((accidental: staveAccidental) => {
      chord.addModifier(new Accidental(accidental.accidental), accidental.ind);
    })
    chord.setStyle({ fillStyle: 'currentColor' });
    chord.setLedgerLineStyle({ strokeStyle: 'currentColor' });
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables([chord]);
    new Formatter().joinVoices([voice]).format([voice], width);
    voice.draw(context, stave);
  });
</script>

<template>
  <div
    class="score"
    ref="score"
  ></div>
</template>

<style>
  .score {
    color: var(--text);
  }
</style>

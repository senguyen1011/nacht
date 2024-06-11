<script setup lang="ts">
  import { computed, ref, onMounted, type ComputedRef, type Ref } from 'vue';
  import { Vex } from 'vexflow';

  /** Props */
  type size = 'sm' | 'md' | 'lg';
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
  const baseHeight: number = 72;
  const sizeMultipler: { [key in size]: number } = { sm: 2, md: 3, lg: 4 };

  /** Refs */
  const score: Ref<HTMLDivElement | undefined> = ref();

  /** Computed */
  const staveNotes: ComputedRef<string[]> = computed(() =>
    props.notes.map((note: string) => note.split(/(\d+)/).join('/').slice(0, -1))
  );

  /** On Mount */
  onMounted(() => {
    const { Formatter, Renderer, Stave, StaveNote, Voice } = Vex.Flow;
    const height = baseHeight * sizeMultipler[props.size];
    const width = height;
    const renderer = new Renderer(score.value, Renderer.Backends.SVG);
    renderer.resize(width, height);
    const context = renderer.getContext();
    context.setFillStyle('currentColor');
    context.scale(sizeMultipler[props.size], sizeMultipler[props.size]);

    const stave = new Stave(-1, -25, width);
    stave.addClef(props.clef);
    stave.setBegBarType(-1);
    stave.setEndBarType(0);
    stave.setStyle({ strokeStyle: 'var(--text-muted)' });
    stave.setContext(context).draw();
    const chord = new StaveNote({ keys: staveNotes.value, duration: 'w' });
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

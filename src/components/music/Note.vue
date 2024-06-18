<script setup lang="ts">
  import { computed, useSlots, type ComputedRef } from 'vue';
  import { Note } from 'tonal';

  const slots = useSlots();
  const slotValue: ComputedRef<string> = computed(() => slots.default!()[0].children as string);
  const noteLetter: ComputedRef<string> = computed(() => Note.get(slotValue.value).letter);
  const accidental: ComputedRef<string | undefined> = computed(() => {
    const accidentals: string = Note.accidentals(slotValue.value);
    switch (accidentals) {
      case 'b':
        return '♭';
      case 'bb':
        return '𝄫';
      case '#':
        return '♯';
      case '##':
        return '𝄪';
    }
  });
  const octave: ComputedRef<number | undefined> = computed(() => Note.octave(slotValue.value));
</script>

<template>
  <span class="note">
    {{ noteLetter }}
    <span class="accidental">{{ accidental }}</span>
    {{ octave }}
  </span>
</template>

<style>
  span.note {
    display: inline-flex;
    align-items: center;
  }
  span.accidental {
    font-size: 0.75em;
    margin-left: -0.15em;
  }
</style>

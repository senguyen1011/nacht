<script setup lang="ts">
  import { computed, ref, type ComputedRef, type Ref } from 'vue';
  import { ChordType } from 'tonal';
  import { allNotes, chordTypes, getChordNotes, playChord } from '@/lib/music';

  /** Props */
  interface Props {
    noteLetter: string;
    chordType: string;
  }
  const props = defineProps<Props>();

  /** Refs */
  const noteLetter: Ref<string> = ref(props.noteLetter);
  const chordType: Ref<string> = ref(props.chordType);

  /** Computed */
  const chordNotes: ComputedRef<string[]> = computed(() =>
    getChordNotes(noteLetter.value, 4, chordType.value)
  );

  /** Emits */
  const emit = defineEmits<{
    (e: 'input', value: { noteLetter: string; chordType: string }): void;
    (e: 'submit'): void;
  }>();

  /** Methods */
  function handleInput(): void {
    playChord(chordNotes.value, false);
    emit('input', { noteLetter: noteLetter.value, chordType: chordType.value });
  }
</script>

<template>
  <div class="search">
    <ScrollSelectRoot
      :value="noteLetter"
      @input="(val: string) => { noteLetter = val; handleInput(); }"
    >
      <ScrollSelectItem
        v-for="note in allNotes"
        :value="note"
        :key="`select-note-${note}`"
      >
        <Heading size="5xl">
          <Note>{{ note }}</Note>
        </Heading>
      </ScrollSelectItem>
    </ScrollSelectRoot>
    <ListSelectRoot
      :value="props.chordType"
      @input="(val: string) => { chordType = val; handleInput(); }"
      ref="listSelect"
    >
      <ListSelectItem
        v-for="chord in chordTypes"
        :value="chord"
        :key="`select-chord-${chord}`"
      >
        <div class="options-wrapper">
          <Text
            ><Note>{{ noteLetter }}</Note> {{ ChordType.get(chord).aliases[0] }}</Text
          >
          <Text
            size="sm"
            color="muted"
            transform="capitalize"
            >{{ chord }}</Text
          >
        </div>
      </ListSelectItem>
    </ListSelectRoot>
    <Button
      color="accent"
      type="ghost"
      @click="emit('submit')"
      ><Icon name="arrowLeft" />Return</Button
    >
  </div>
</template>

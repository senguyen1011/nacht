<script setup lang="ts">
  import { RouterView, RouterLink } from 'vue-router';
  import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue';
  import { Chord, ChordType } from 'tonal';
  import { getChordNotes, playChord } from '@/lib/music';
  import Search from './Search.vue';

  /** Refs */
  const isSearching: Ref<boolean> = ref(false);
  const noteLetter: Ref<string> = ref('C');
  const chordType: Ref<string> = ref('major');
  const clef: Ref<'treble' | 'bass'> = ref('treble');
  const inversion: Ref<number> = ref(0);

  /** Computed */
  const baseOctave: ComputedRef<2 | 3 | 4 | 5> = computed(() => {
    if (clef.value === 'treble') {
      return 4;
    } else {
      return 3;
    }
  });
  const chordNotes: ComputedRef<string[]> = computed(() =>
    getChordNotes(noteLetter.value, baseOctave.value, chordType.value, inversion.value)
  );
</script>
<template>
  <main id="chords">
    <header>
      <TextField
        id="search-chords"
        type="search"
        placeholder="Search for chords"
        @click="isSearching = true"
        @input="(val?: string) => console.log('input', val)"
      />
      <Button
        color="accent"
        icon
        ><Icon name="clock"
      /></Button>
    </header>
    <div class="display">
      <template v-if="!isSearching">
        <hgroup class="titles">
          <Heading
            ><Note>{{ noteLetter }}</Note> {{ ChordType.get(chordType).aliases[0] }}</Heading
          >
          <Text
            color="muted"
            transform="capitalize"
            >{{ chordType }}</Text
          >
        </hgroup>
        <Score
          :notes="chordNotes"
          :clef="clef"
          :key="chordNotes"
        />
      </template>
      <Piano
        :octave="baseOctave"
        :active="chordNotes"
        :key="chordNotes"
      />
    </div>
    <div
      v-if="!isSearching"
      class="card"
    >
      <div class="options card-section">
        <div class="flex-row">
          <Button
            color="accent"
            type="ghost"
            @click="playChord(chordNotes, false)"
            ><Icon name="recording-1" />Play Chord</Button
          >
          <Button
            color="accent"
            type="ghost"
            @click="playChord(chordNotes, true)"
            ><Icon name="recording-2" />Play Arpeggio</Button
          >
        </div>
        <SegmentedControlRoot
          name="clef"
          :value="clef"
          @input="(val: string) => clef = (val as 'treble' | 'bass')"
          ><SegmentedControlItem value="treble">Treble</SegmentedControlItem>
          <SegmentedControlItem value="bass">Bass</SegmentedControlItem>
        </SegmentedControlRoot>
        <SegmentedControlRoot
          name="inversion"
          @input="(val: string) => inversion = Number(val)"
        >
          <SegmentedControlItem
            v-for="(note, ind) in chordNotes"
            :value="ind"
            >{{ ind === 0 ? 'Root' : ind }}</SegmentedControlItem
          >
        </SegmentedControlRoot>
      </div>
      <div class="info card-section">
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Degrees</DataListLabel>
            <DataListValue>{{
              Chord.get(`${noteLetter}${chordType}`).intervals.join(', ')
            }}</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Notes</DataListLabel>
            <DataListValue>
              <template v-for="(note, ind) in chordNotes">
                <Note>{{ note }}</Note
                >{{ ind === chordNotes.length - 1 ? '' : ',&nbsp;' }}
              </template>
            </DataListValue>
          </DataListItem>
        </DataListRoot>
      </div>
    </div>
    <Search
      v-else
      :noteLetter="noteLetter"
      :chordType="chordType"
      @input="
        val => {
          noteLetter = val.noteLetter;
          chordType = val.chordType;
        }
      "
      @submit="isSearching = false"
    />
  </main>
</template>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 100%;
    gap: var(--space-lg);
  }

  header {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--space-sm);
    padding: var(--space-lg) var(--space-lg) 0 var(--space-lg);
  }

  .display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: var(--space-lg);
  }

  .titles {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-xs);
  }

  .card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: var(--space-lg);
    gap: var(--space-lg);
    background-color: var(--background-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-2xl);
  }

  .card-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .search {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: var(--space-md);
  }

  .search .options-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
</style>

<script setup lang="ts">
  import { RouterView, RouterLink } from 'vue-router';
  import { onMounted, ref, type Ref } from 'vue';
  import { Scale, ScaleType } from 'tonal';
  import { allNotes, formatNote } from '@/lib';

  /** Refs */
  const isSearching: Ref<boolean> = ref(true);

  
  onMounted(() => {
    console.log(Scale.get('c chromatic'))
  })
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
          <Heading>C maj</Heading>
          <Text color="muted">Major</Text>
        </hgroup>
        <Score :notes="['C4', 'E4', 'G4']" />
      </template>
      <Piano />
    </div>
    <div
      v-if="!isSearching"
      class="card"
    >
      <div class="options card-section">
        <SegmentedControlRoot
          name="clef"
          @input="(val?: string) => console.log('input', val)"
          ><SegmentedControlItem value="treble">Treble</SegmentedControlItem>
          <SegmentedControlItem value="bass">Bass</SegmentedControlItem>
        </SegmentedControlRoot>
        <SegmentedControlRoot
          name="inversion"
          @input="(val?: string) => console.log('input', val)"
          ><SegmentedControlItem value="root">Root</SegmentedControlItem>
          <SegmentedControlItem value="1">1</SegmentedControlItem>
          <SegmentedControlItem value="2">2</SegmentedControlItem>
        </SegmentedControlRoot>
      </div>
      <div class="info card-section">
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Degrees</DataListLabel>
            <DataListValue>1, 3, 5</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Notes</DataListLabel>
            <DataListValue>C, E, G</DataListValue>
          </DataListItem>
        </DataListRoot>
      </div>
    </div>
    <div v-else class="search">
      <ScrollPickerRoot>
        <ScrollPickerItem
          v-for="note in allNotes"
        >
        <Heading size="5xl">

          {{ formatNote(note) }}
        </Heading>
        </ScrollPickerItem>
      </ScrollPickerRoot>
    </div>
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
    border-top-left-radius: var(--radius-xl);
    border-top-right-radius: var(--radius-xl);
  }

  .card-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .search {
    width: 100%;
  }
</style>

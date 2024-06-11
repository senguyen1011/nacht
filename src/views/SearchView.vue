<script setup lang="ts">
</script>

<template>
  <main id="chords">
    <header>
      <TextField
        id="search-chords"
        type="search"
        placeholder="Search for chords"
        @click="console.log('Open search page')"
        @input="(val?: string) => console.log('input', val)"
      />
      <Button
        color="accent"
        icon
        ><Icon name="clock"
      /></Button>
    </header>
    <div class="display">
      <Piano />
    </div>
  </main>
</template>

<style>

</style>

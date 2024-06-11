import { computed, onMounted, onUnmounted, ref, type ComputedRef } from 'vue';
/** Data */
const allNotes = [
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'E#',
  'Fb',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
  'Ab',
  'A',
  'A#',
  'Bb',
  'B',
  'B#',
  'Cb'
];

/** Methods */
function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}

function useBreakpoints() {
  const windowWidth = ref(window.innerWidth);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener('resize', onWidthChange));
  onUnmounted(() => window.removeEventListener('resize', onWidthChange));

  const type = computed(() => {
    if (windowWidth.value < 412) return 'xs';
    if (windowWidth.value >= 412 && windowWidth.value < 640) return 'sm';
    if (windowWidth.value >= 640 && windowWidth.value < 768) return 'md';
    if (windowWidth.value >= 768 && windowWidth.value < 1024) return 'lg';
    if (windowWidth.value >= 1024 && windowWidth.value < 1280) return 'xl';
    if (windowWidth.value >= 1280 && windowWidth.value < 1536) return '2xl';
  });

  const width = computed(() => windowWidth.value);

  return { width, type };
}

function addToClasses(classList: string[], val?: any, className?: string): void {
  val && classList.push(className ? `${className}-${val.toString()}` : val.toString());
}

function formatNote(note: string): string {
  if (note.includes('b') || note.includes('#')) {
    return note.replace('b', '♭').replace('#', '♯');
  } else {
    return note.replace('♭', '').replace('♯', '#');
  }
}

export { allNotes };
export { addToClasses, mod, useBreakpoints, formatNote };

import { Note, Chord } from 'tonal';
import * as Tone from 'tone';

/** Data */
const allNotes = [
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'Fb',
  'E#',
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
  'Cb',
  'B#'
];

const accidentalsMap: { [key: string]: string } = {
  'C#': 'Db',
  'D#': 'Eb',
  'E#': 'F',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb',
  'B#': 'C',
  'C##': 'D',
  'D##': 'E',
  'E##': 'Gb',
  'F##': 'G',
  'G##': 'A',
  'A##': 'B',
  'B##': 'Db',
  'Cb': 'B',
  'Fb': 'E',
  'Cbb': 'Bb',
  'Dbb': 'C',
  'Ebb': 'D',
  'Fbb': 'Eb',
  'Gbb': 'F',
  'Abb': 'G',
  'Bbb': 'A'
};

const chordTypes = [
  'major',
  'minor',
  'augmented',
  'minor augmented',
  'diminished',
  'half-diminished',
  'suspended second',
  'suspended fourth',
  'suspended fourth seventh',
  'suspended fourth flat ninth',
  'fifth',
  'sixth',
  'minor sixth',
  'sixth added ninth',
  'dominant seventh',
  'major seventh',
  'minor seventh',
  'augmented seventh',
  'diminished seventh',
  'minor/major seventh',
  'lydian dominant seventh',
  'major seventh flat sixth',
  'major seventh sharp eleventh',
  'altered',
  'major ninth',
  'minor ninth',
  'dominant flat ninth',
  'dominant sharp ninth',
  'minor/major ninth',
  'eleventh',
  'minor eleventh',
  'major sharp eleventh (lydian)',
  'dominant thirteenth',
  'major thirteenth',
  'minor thirteenth'
];

/** Methods */
function deconstructNote(noteName: string): {
  noteLetter: string;
  noteAccidental: string | null;
  noteOctave: number;
} {
  return {
    noteLetter: Note.get(noteName).letter,
    noteAccidental: Note.accidentals(noteName),
    noteOctave: Number(Note.octave(noteName))
  };
}

function formatNote(note: string): string {
  if (note.includes('b') || note.includes('#')) {
    return note.replace('b', '♭').replace('#', '♯');
  } else {
    return note.replace('♭', '').replace('♯', '#');
  }
}

function getChordNotes(
  tonic: string,
  octave: number,
  chordType: string,
  inversion?: number
): string[] {
  const res = Chord.notes(chordType, `${tonic}${octave}`);
  if (inversion) {
    for (let ind: number = 0; ind < inversion; ind++) {
      const shift = res.shift();
      const { noteLetter, noteOctave } = deconstructNote(shift!);
      res.push(`${noteLetter}${noteOctave + 1}`);
    }
  }
  return res;
}

async function playChord(chordNotes: string[], arpeggio?: boolean): Promise<void> {
  await Tone.start();
  if (arpeggio) {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    chordNotes.forEach((note: string, ind: number) => {
      synth.triggerAttackRelease(note, '8n', now + 0.25 * ind);
    });
  } else {
    const synth = new Tone.PolySynth().toDestination();
    synth.triggerAttackRelease(chordNotes, '8n');
  }
}

export { allNotes, accidentalsMap, chordTypes };
export { formatNote, deconstructNote, getChordNotes, playChord };

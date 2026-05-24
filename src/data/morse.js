// Morse alphabet and binary tree layout.
// Left child = dash (-), Right child = dot (.)
// Position convention from the chart-style tree: at any node, walking
// "outward" (away from center) keeps the dominant sign of that subtree,
// walking "down" flips to the other sign.

export const MORSE = {
  A: '.-',   B: '-...', C: '-.-.', D: '-..',  E: '.',     F: '..-.',
  G: '--.',  H: '....', I: '..',   J: '.---', K: '-.-',   L: '.-..',
  M: '--',   N: '-.',   O: '---',  P: '.--.', Q: '--.-',  R: '.-.',
  S: '...',  T: '-',    U: '..-',  V: '...-', W: '.--',   X: '-..-',
  Y: '-.--', Z: '--..',
}

// Reverse lookup
export const FROM_MORSE = Object.entries(MORSE).reduce((acc, [k, v]) => {
  acc[v] = k
  return acc
}, {})

// Binary tree: each node has letter, code, dashChild, dotChild
// Built from MORSE so we never get out of sync.
const buildTree = () => {
  const root = { code: '', letter: '', dash: null, dot: null, parent: null, depth: 0 }
  const nodeByCode = { '': root }

  // Insert each letter into the tree
  Object.entries(MORSE).forEach(([letter, code]) => {
    let current = root
    for (let i = 0; i < code.length; i++) {
      const partial = code.slice(0, i + 1)
      const sign = code[i]
      const branch = sign === '-' ? 'dash' : 'dot'
      if (!current[branch]) {
        const node = {
          code: partial,
          letter: '',
          dash: null,
          dot: null,
          parent: current,
          depth: i + 1,
          sign,
        }
        current[branch] = node
        nodeByCode[partial] = node
      }
      current = current[branch]
    }
    current.letter = letter
  })

  return { root, nodeByCode }
}

const { root: TREE_ROOT, nodeByCode: NODE_BY_CODE } = buildTree()

// Hand-tuned layout coordinates (percent of stage width / height).
// Each letter sits in one of 8 columns (4 left + 4 right of antenna).
// Outward chains share a horizontal shelf; "below" descents drop straight
// down within their column. Some rows are skipped to make room for sibling
// subtrees (e.g. T's chain begins at row 3 because M's chain occupies
// rows 1–2 in the adjacent column).
export const LAYOUT = {
  // ROOT (antenna) is x=50, y=4 (rendered separately)
  // Columns tightened toward center (gap T↔E reduced from 24 to 20 percent).
  // C sits one row above D so that D and X share a row → X–D is a straight
  // horizontal line, matching the reference chart.

  // LEFT subtree (dash side) — outward = LEFT, below = DOWN
  '-':    { x: 40, y: 10 },   // T   row 0
  '--':   { x: 28, y: 10 },   // M   row 0
  '---':  { x: 16, y: 10 },   // O   row 0
  '--.':  { x: 28, y: 22 },   // G   row 1
  '--.-': { x: 16, y: 22 },   // Q   row 1
  '--..': { x: 28, y: 32 },   // Z   row 2
  '-.':   { x: 40, y: 44 },   // N   row 3 (with K, Y on same row)
  '-.-':  { x: 28, y: 44 },   // K   row 3
  '-.--': { x: 16, y: 44 },   // Y   row 3
  '-.-.': { x: 28, y: 54 },   // C   row 4 (just below K, alone)
  '-..':  { x: 40, y: 66 },   // D   row 5 (pushed past C so X–D shares row)
  '-..-': { x: 28, y: 66 },   // X   row 5 (D's outward, straight left of D)
  '-...': { x: 40, y: 78 },   // B   row 6

  // RIGHT subtree (dot side) — outward = RIGHT, below = DOWN
  '.':    { x: 60, y: 10 },   // E   row 0
  '..':   { x: 72, y: 10 },   // I   row 0
  '...':  { x: 84, y: 10 },   // S   row 0
  '....': { x: 94, y: 10 },   // H   row 0
  '..-':  { x: 72, y: 22 },   // U   row 1
  '...-': { x: 84, y: 22 },   // V   row 1
  '..-.': { x: 72, y: 32 },   // F   row 2
  '.-':   { x: 60, y: 44 },   // A   row 3
  '.-.':  { x: 72, y: 44 },   // R   row 3
  '.-..': { x: 84, y: 44 },   // L   row 3
  '.--':  { x: 60, y: 56 },   // W   row 4
  '.--.': { x: 72, y: 56 },   // P   row 4
  '.---': { x: 60, y: 68 },   // J   row 5
}

// ROOT pseudo-position (the antenna)
export const ROOT_POS = { x: 50, y: 4 }

// Iterable list of nodes with position metadata
export const NODES = Object.entries(LAYOUT).map(([code, pos]) => ({
  code,
  letter: NODE_BY_CODE[code]?.letter || '',
  parentCode: code.slice(0, -1),
  parentPos: code.length === 1 ? ROOT_POS : LAYOUT[code.slice(0, -1)],
  pos,
  depth: code.length,
  lastSign: code.slice(-1),
}))

export { TREE_ROOT, NODE_BY_CODE }

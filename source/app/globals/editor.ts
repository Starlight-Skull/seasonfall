export enum EditorMode {
  move = 'Move',
  fill = 'Fill',
  edit = 'Edit'
}

export const $editor = {
  foreground: true,
  selectedX: 0,
  selectedY: 0,
  fill: 'none',
  scale: 3,
  mode: EditorMode.edit
}

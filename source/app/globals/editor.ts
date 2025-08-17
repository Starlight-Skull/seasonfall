import Tile from "../classes/Tile"
import { $world } from "./world"

export const $editor = {
  foreground: true,
  selectedX: 0,
  selectedY: 0,
  get selectedTile(): Tile | undefined {
    if (this.foreground) {
      return $world.foreground[this.selectedY][this.selectedX]
    } else {
      return $world.background[this.selectedY][this.selectedX]
    }
  },
  scale: 3,
  showBoxes: false,
  showLiveDebug: true,
}

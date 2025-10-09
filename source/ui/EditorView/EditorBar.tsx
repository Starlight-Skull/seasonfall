import './EditorBar.scss'
import loadWorld, { $worlds } from '../../app/data/world'
import InputSelect from '../Components/InputSelect'
import { saveWorld } from '../../app/data/world'
import InputBoolean from '../Components/InputBoolean'
import { $game } from '../../app/globals/game'
import { $tiles } from '../../app/data/textures'
import { $editor, EditorMode } from '../../app/globals/editor'

interface Props {
  exit: () => void
}

export function EditorBar(props: Props) {
  const worlds = Object.keys($worlds)
  const tiles = ['none', ...Object.keys($tiles)]

  return (
    <div id="EditorBar">
      <button onClick={props.exit}>Exit</button>
      <button onClick={() => saveWorld()}>Download</button>
      <InputSelect
        label='Mode'
        options={Object.values(EditorMode)}
        onChange={(val) => ($editor.mode = val as EditorMode)}
        value={$editor.mode}
      />
      <InputSelect
        label="World"
        options={worlds}
        onChange={(val) => loadWorld($worlds[val], val)}
        value={worlds[0]}
      />
      <InputBoolean
        label="Show Hit Boxes"
        onChange={(val) => ($game.showBoxes = val)}
        value={$game.showBoxes}
      />
      <InputSelect
        label="Tile"
        options={tiles}
        onChange={name => $editor.fill = name}
        value={tiles[0]}
      />
    </div>
  )
}

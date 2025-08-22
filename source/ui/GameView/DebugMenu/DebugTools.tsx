import { $player } from '../../../app/globals/world'
import { $game } from '../../../app/globals/game'
import InputString from '../../Components/InputString'
import InputBoolean from '../../Components/InputBoolean'
import InputNumber from '../../Components/InputNumber'

interface Props {}

export default function DebugTools(props: Props) {
  return (
    <section>
      <h3>General</h3>
      <InputBoolean
        label="Show Hit Boxes"
        value={$game.showBoxes}
        onChange={(val) => ($game.showBoxes = val)}
      />
      <InputBoolean
        label="Show Coordinates"
        value={$game.showCoords}
        onChange={(val) => ($game.showCoords = val)}
      />
      <InputBoolean
        label="Show Live Debug"
        value={$game.showLiveDebug}
        onChange={(val) => ($game.showLiveDebug = val)}
      />
      <InputBoolean
        label="Show Player Stats"
        value={$game.showPlayerStats}
        onChange={(val) => ($game.showPlayerStats = val)}
      />
      <br />
      <h3>Player</h3>
      <InputString
        label="Player Name"
        value={$player.userName}
        onChange={(val) => ($player.userName = val)}
      />
      <InputNumber
        label="HP"
        value={$player.stats.hp}
        onChange={(val) => ($player.stats.hp = val)}
        min={0}
      />
      <InputNumber
        label="Max HP"
        value={$player.stats.maxHP}
        onChange={(val) => ($player.stats.maxHP = val)}
        min={1}
      />
      <InputNumber
        label="MP"
        value={$player.stats.mp}
        onChange={(val) => ($player.stats.mp = val)}
        min={0}
      />
      <InputNumber
        label="Max MP"
        value={$player.stats.maxMP}
        onChange={(val) => ($player.stats.maxMP = val)}
        min={0}
      />
      <InputNumber
        label="XP"
        value={$player.stats.xp}
        onChange={(val) => ($player.stats.xp = val)}
        min={0}
      />
      <InputNumber
        label="Damage"
        value={$player.stats.damage}
        onChange={(val) => ($player.stats.damage = val)}
        min={0}
      />
      <InputNumber
        label="Speed"
        value={$player.stats.speed}
        onChange={(val) => ($player.stats.speed = val)}
        min={0}
      />
      <InputNumber
        label="Jump Height"
        value={$player.stats.jumpHeight}
        onChange={(val) => ($player.stats.jumpHeight = val)}
        min={0}
      />
      <InputNumber
        label="X"
        value={$player.x}
        onChange={(val) => ($player.x = val)}
      />
      <InputNumber
        label="Y"
        value={$player.y}
        onChange={(val) => ($player.y = val)}
      />
      <InputBoolean
        label="Collision"
        value={$player.collision.enabled}
        onChange={(val) => ($player.collision.enabled = val)}
      />
    </section>
  )
}

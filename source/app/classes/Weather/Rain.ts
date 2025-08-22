import Animatable from "../Animatable";
import SpriteSet from "../SpiteSet";

export default class Rain extends Animatable {
  isSnow = false

  constructor() {
    super('rain')
    this.animations = {
      rain: new SpriteSet('rain', { frames: 16 }),
      snow: new SpriteSet('snow', { frames: 16 })
    }
    this.setAnimation()
  }

  updateAnimation(isSnow: boolean) {
    if (this.isSnow === isSnow) return
    this.isSnow = isSnow
    this.setAnimation()
  }

  setAnimation() {
    if (this.isSnow) {
      this.changeAnimation(this.animations.snow)
    } else {
      this.changeAnimation(this.animations.rain)
    }
  }
}

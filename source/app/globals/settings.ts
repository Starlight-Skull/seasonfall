interface Settings {
  [key: string]: string | number | boolean | object
  scale: number
  showFPS: boolean
  api: {
    enabled: boolean
    key: string
    latitude: number
    longitude: number
    interval: number
  }
  keybindings: {
    [key: string]: string
    attack: string
    jump: string
    down: string
    left: string
    right: string
    use: string
  }
}

/**
 * User settings that will be saved.
 */
export const $settings: Settings = {
  scale: 5,
  showFPS: false,
  api: {
    enabled: false,
    key: '',
    latitude: 0,
    longitude: 0,
    interval: 600 // seconds
  },
  keybindings: {
    attack: 'Mouse0',
    jump: 'Space',
    down: 'KeyS',
    left: 'KeyA',
    right: 'KeyD',
    use: 'KeyE'
  }
}


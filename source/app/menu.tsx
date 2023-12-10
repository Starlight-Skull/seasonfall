import { geoCoderAPI, navigate } from './data'
import { player, playerStats, settings, version, weather, world } from './globals'
import { element, inputElement, quit, toStorage } from './helpers'

const versionTag = element('version') as HTMLElement
const pauseMenu = element('pauseMenu') as HTMLElement
const debugMenu = element('debugMenu') as HTMLElement

/**
 * Contains the pause menus for ease of access.
 */
const menus: any = {
  pause: element('pause') as HTMLElement,
  new: element('new') as HTMLElement,
  load: element('load') as HTMLElement,
  stats: element('stats') as HTMLElement,
  settingsGeneral: element('settingsGeneral') as HTMLElement,
  settingsApi: element('settingsApi') as HTMLElement,
  settingsKeybindings: element('settingsKeybindings') as HTMLElement
}

export function initMenu (): void {
  versionTag.innerText = version
  pauseMenu.style.visibility = 'hidden'
  debugMenu.style.visibility = 'hidden'
  for (const menusKey in menus) {
    menus[menusKey].style.display = 'none'
  }
  menus.pause.style.display = 'flex'
  pauseMenu.addEventListener('click', (ev) => { handleMenuEvent(ev.target as HTMLElement) })
}

/**
 * Handles a click event on an item in the pause menu that has a data-menu or data-action attribute.
 * @param target - The HTML element that was clicked.
 */
function handleMenuEvent (target: HTMLElement): void {
  if (target.dataset.menu != null) {
    for (const menusKey in menus) {
      menus[menusKey].style.display = 'none'
    }
    menus[target.dataset.menu].style.display = 'flex'
  }
  if (target.dataset.action !== null) {
    menuAction(target)
  }
}

/**
 * Handles a click event on an item that has a data-action attribute.
 * @param target - The HTML element that was clicked.
 */
function menuAction (target: HTMLElement): void {
  switch (target.dataset.action) {
    case 'continue':
      openPauseMenu()
      break
    case 'save':
      break
    case 'load':
      break
    case 'create':
      break
    case 'changeKey':
      target.addEventListener('keydown', setKey)
      target.addEventListener('mousedown', setKey)
      break
    case 'saveSettings':
      saveSettings()
      break
    case 'navigator':
      navigate()
      break
    case 'search':
      search((element('location') as HTMLInputElement).value, (element('apiKey') as HTMLInputElement).value)
      break
    case 'selectResult':
      if (target.children.length !== 0) {
        const option = target.children.item((target as HTMLSelectElement).selectedIndex) as HTMLOptionElement
        ;(element('lat') as HTMLInputElement).value = option.dataset.lat as string
        ;(element('lon') as HTMLInputElement).value = option.dataset.lon as string
      }
      break
    case 'quit':
      toStorage('settings', settings)
      quit()
      break
  }
}

/**
 * Calls the geoCoderAPI and adds the results to the selector
 * @param location - The location to search for
 * @param apiKey - The API key
 */
function search (location: string, apiKey: string): void {
  geoCoderAPI(location, apiKey).then((locations) => {
    if (locations.length === 0) return
    element('searchResults')?.replaceChildren()
    for (const location of locations) {
      const option = document.createElement('option')
      option.textContent = `${location.name}, ${location.state} (${location.country})`
      option.dataset.lat = location.lat.toString()
      option.dataset.lon = location.lon.toString()
      element('searchResults')?.appendChild(option)
    }
  }).catch(null)
}

/**
 * Handler for the keybindings menu.
 * @param event - A keydown or mousedown event to rebind to a game action.
 */
function setKey (event: Event): void {
  event.target?.removeEventListener('keydown', setKey)
  event.target?.removeEventListener('mousedown', setKey)
  if ((event.target as HTMLElement).dataset.key !== undefined) {
    const key = (event as KeyboardEvent).code ?? `Mouse${(event as MouseEvent).button}`
    const k = (event.target as HTMLElement).dataset.key as string
    settings.keybindings[k] = key
    ;(event.target as HTMLElement).textContent = key
  }
}

/**
 * Toggles the visibility of the pause menu and handles the associated values.
 */
export function openPauseMenu (): void {
  if (pauseMenu.style.visibility === 'hidden') {
    world.paused = true
    pauseMenu.style.visibility = 'visible'
    loadSettings()
  } else {
    world.paused = debugMenu.style.visibility === 'visible'
    pauseMenu.style.visibility = 'hidden'
    saveSettings()
  }
}

/**
 * Saves most settings from the global settings to storage.
 */
function saveSettings (): void {
  // general
  settings.scale = parseFloat((element('scale') as HTMLInputElement).value)
  settings.showFPS = (element('showFps') as HTMLInputElement).checked
  // api
  settings.api.key = (element('apiKey') as HTMLInputElement).value
  settings.api.latitude = parseFloat((element('lat') as HTMLInputElement).value)
  settings.api.longitude = parseFloat((element('lon') as HTMLInputElement).value)
  settings.api.interval = parseInt((element('interval') as HTMLInputElement).value)
  // keybindings are saved automatically
  toStorage('settings', settings)
}

/**
 * Loads most settings from the global settings into the settings menu.
 */
function loadSettings (): void {
  // general
  ;(element('scale') as HTMLInputElement).value = settings.scale.toString()
  ;(element('showFps') as HTMLInputElement).checked = settings.showFPS
  // api
  ;(element('apiKey') as HTMLInputElement).value = settings.api.key.toString()
  ;(element('lat') as HTMLInputElement).value = settings.api.latitude.toString()
  ;(element('lon') as HTMLInputElement).value = settings.api.longitude.toString()
  ;(element('interval') as HTMLInputElement).value = settings.api.interval.toString()
  // keybindings
  const keys = element('keybindingsContainer')
  keys?.replaceChildren()
  for (const key in settings.keybindings) {
    const div = document.createElement('div')
    const label = document.createElement('label')
    label.textContent = key
    div.appendChild(label)
    const button = document.createElement('button')
    button.dataset.action = 'changeKey'
    button.dataset.key = key
    button.textContent = settings.keybindings[key]
    div.appendChild(button)
    keys?.appendChild(div)
  }
  // statistics
  ;(element('nameStats') as HTMLElement).innerText = `Statistics (${player.name})`
  const stats = element('statsContainer')
  stats?.replaceChildren()
  for (const playerStatsKey in playerStats) {
    const statItem = document.createElement('p')
    statItem.textContent = `${playerStatsKey}: ${playerStats[playerStatsKey].toString()}`
    stats?.appendChild(statItem)
  }
}

/**
 * Toggles the visibility of the debug menu and handles the associated data.
 */
export function openDebugMenu (): void {
  if (debugMenu.style.visibility === 'hidden') {
    world.paused = true
    debugMenu.style.visibility = 'visible'
    // general
    ;(element('showBoxes') as HTMLInputElement).checked = world.showBoxes
    ;(element('showLiveDebug') as HTMLInputElement).checked = world.showLiveDebug
    ;(element('showPlayerStats') as HTMLInputElement).checked = world.showPlayerStats
    // player
    ;(element('hp') as HTMLInputElement).value = player.stats.hp.toString()
    ;(element('maxHp') as HTMLInputElement).value = player.stats.maxHP.toString()
    ;(element('mp') as HTMLInputElement).value = player.stats.mp.toString()
    ;(element('maxMp') as HTMLInputElement).value = player.stats.maxMP.toString()
    ;(element('xp') as HTMLInputElement).value = player.stats.xp.toString()
    ;(element('damage') as HTMLInputElement).value = player.stats.damage.toString()
    ;(element('speed') as HTMLInputElement).value = player.stats.speed.toString()
    ;(element('maxAir') as HTMLInputElement).value = player.maxAir.toString()
    ;(element('x') as HTMLInputElement).value = player.frame.x.toString()
    ;(element('y') as HTMLInputElement).value = player.frame.y.toString()
    ;(element('hasCollision') as HTMLInputElement).checked = player.hasCollision
    // weather
    for (const weatherKey in weather) {
      ;(element(weatherKey) as HTMLInputElement).value = weather[weatherKey].toString()
    }
  } else {
    world.paused = pauseMenu.style.visibility === 'visible'
    debugMenu.style.visibility = 'hidden'
    // general
    world.showBoxes = inputElement('showBoxes')?.checked ?? false
    world.showLiveDebug = inputElement('showLiveDebug')?.checked ?? false
    world.showPlayerStats = inputElement('showPlayerStats')?.checked ?? false
    // player
    player.stats.hp = parseFloat(inputElement('hp')?.value ?? '0')
    player.stats.maxHP = parseFloat(inputElement('maxHp')?.value ?? '0')
    player.stats.mp = parseFloat(inputElement('mp')?.value ?? '0')
    player.stats.maxMP = parseFloat(inputElement('maxMp')?.value ?? '0')
    player.stats.xp = parseFloat(inputElement('xp')?.value ?? '0')
    player.stats.damage = parseFloat(inputElement('damage')?.value ?? '0')
    player.stats.speed = parseFloat(inputElement('speed')?.value ?? '0')
    player.maxAir = parseFloat(inputElement('maxAir')?.value ?? '0')
    player.frame.x = parseFloat(inputElement('x')?.value ?? '0')
    player.frame.y = parseFloat(inputElement('y')?.value ?? '0')
    player.hasCollision = inputElement('hasCollision')?.checked ?? true
    // weather
    for (const weatherKey in weather) {
      const el = (element(weatherKey) as HTMLInputElement).value
      if (!isNaN(parseFloat(el))) {
        weather[weatherKey] = parseFloat(el)
      } else {
        weather[weatherKey] = el
      }
    }
  }
}

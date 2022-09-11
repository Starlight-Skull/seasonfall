import { player, playerStats, settings, weather, world } from './globals.js'
import { element } from './helpers.js'
import { quit, toStorage } from './init.js'
import { geoCoderAPI, navigate } from './data.js'

/**
 * Contains the pause menus for ease of access.
 * @type {{new: HTMLElement, settingsApi: HTMLElement, load: HTMLElement, stats: HTMLElement, settingsGeneral: HTMLElement, pause: HTMLElement, settingsKeybindings: HTMLElement}}
 */
export const menus = {
  pause: element('pause'),
  new: element('new'),
  load: element('load'),
  stats: element('stats'),
  settingsGeneral: element('settingsGeneral'),
  settingsApi: element('settingsApi'),
  settingsKeybindings: element('settingsKeybindings')
}

/**
 * Handles a click event on an item in the pause menu that has a data-menu or data-action attribute.
 * @param target - The HTML element that was clicked.
 */
export function handleMenuEvent (target) {
  if (target.dataset.menu) {
    for (const menusKey in menus) {
      menus[menusKey].style.display = 'none'
    }
    menus[target.dataset.menu].style.display = 'flex'
  }
  if (target.dataset.action) {
    menuAction(target)
  }
}

/**
 * Handles a click event on an item that has a data-action attribute.
 * @param target - The HTML element that was clicked.
 */
function menuAction (target) {
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
      search(element('location').value, element('apiKey').value)
      break
    case 'selectResult':
      if (target.children.length !== 0) {
        const option = target.children[target.selectedIndex]
        element('lat').value = option.dataset.lat
        element('lon').value = option.dataset.lon
      }
      break
    case 'quit':
      toStorage('settings', settings).then(quit)
      break
  }
}

/**
 * Calls the geoCoderAPI and adds the results to the selector
 * @param location - The location to search for
 * @param apiKey - The API key
 */
function search (location, apiKey) {
  geoCoderAPI(location, apiKey).then(locations => {
    if (locations.length === 0) return
    element('searchResults').replaceChildren()
    for (const location of locations) {
      const option = document.createElement('option')
      option.textContent = `${location.name}, ${location.state} (${location.country})`
      option.dataset.lat = location.lat
      option.dataset.lon = location.lon
      element('searchResults').appendChild(option)
    }
  })
}

/**
 * Handler for the keybindings menu.
 * @param event - A keydown or mousedown event to rebind to a game action.
 */
function setKey (event) {
  event.target.removeEventListener('keydown', setKey)
  event.target.removeEventListener('mousedown', setKey)
  const key = event.code || `Mouse${event.button}`
  settings.keybindings[event.target.dataset.key] = key
  event.target.textContent = key
}

/**
 * Toggles the visibility of the pause menu and handles the associated values.
 */
export function openPauseMenu () {
  const pauseMenu = element('pauseMenu')
  if (pauseMenu.style.visibility === 'hidden') {
    world.paused = true
    pauseMenu.style.visibility = 'visible'
    loadSettings()
  } else {
    world.paused = element('debugMenu').style.visibility === 'visible'
    pauseMenu.style.visibility = 'hidden'
    saveSettings()
  }
}

/**
 * Saves most settings to the global settings and saves them to storage.
 */
function saveSettings () {
  settings.showFPS = element('showFps').checked
  settings.showPlayerStats = element('showPlayerStats').checked
  settings.scale = parseFloat(element('scale').value)
  settings.interval = parseInt(element('interval').value)
  settings.apiKey = element('apiKey').value
  settings.latitude = parseFloat(element('lat').value)
  settings.longitude = parseFloat(element('lon').value)
  toStorage('settings', settings)
}

/**
 * Loads most settings from the global settings into the settings menu.
 */
function loadSettings () {
  // settings / general
  element('showFps').checked = settings.showFPS
  element('scale').value = settings.scale
  // settings / api
  element('apiKey').value = settings.apiKey
  element('lat').value = settings.latitude
  element('lon').value = settings.longitude
  element('interval').value = settings.interval
  // settings / keybindings
  const keys = element('keybindingsContainer')
  keys.replaceChildren()
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
    keys.appendChild(div)
  }
  // statistics
  element('nameStats').innerText = `Statistics (${player.name})`
  const stats = element('statsContainer')
  stats.replaceChildren()
  for (const playerStatsKey in playerStats) {
    const statItem = document.createElement('p')
    statItem.textContent = `${playerStatsKey}: ${playerStats[playerStatsKey]}`
    stats.appendChild(statItem)
  }
}

/**
 * Toggles the visibility of the debug menu and handles the associated data.
 */
export function openDebugMenu () {
  const debugMenu = element('debugMenu')
  if (debugMenu.style.visibility === 'hidden') {
    world.paused = true
    debugMenu.style.visibility = 'visible'
    // general
    element('showBoxes').checked = world.showBoxes
    element('showLiveDebug').checked = world.showLiveDebug
    element('showPlayerStats').checked = world.showPlayerStats
    // player
    element('hp').value = player.stats.hp
    element('maxHp').value = player.stats.maxHP
    element('mp').value = player.stats.mp
    element('maxMp').value = player.stats.maxMP
    element('xp').value = player.stats.xp
    element('damage').value = player.stats.damage
    element('speed').value = player.stats.speed
    element('maxAir').value = player.maxAir
    element('x').value = player.frame.x
    element('y').value = player.frame.y
    element('hasCollision').checked = player.hasCollision
    // weather
    for (const weatherKey in weather) {
      element(weatherKey).value = weather[weatherKey]
    }
  } else {
    world.paused = element('pauseMenu').style.visibility === 'visible'
    debugMenu.style.visibility = 'hidden'
    // general
    world.showBoxes = element('showBoxes').checked
    world.showLiveDebug = element('showLiveDebug').checked
    world.showPlayerStats = element('showPlayerStats').checked
    // player
    player.stats.hp = parseFloat(element('hp').value)
    player.stats.maxHP = parseFloat(element('maxHp').value)
    player.stats.mp = parseFloat(element('mp').value)
    player.stats.maxMP = parseFloat(element('maxMp').value)
    player.stats.xp = parseFloat(element('xp').value)
    player.stats.damage = parseFloat(element('damage').value)
    player.stats.speed = parseFloat(element('speed').value)
    player.maxAir = parseFloat(element('maxAir').value)
    player.frame.x = parseFloat(element('x').value)
    player.frame.y = parseFloat(element('y').value)
    player.hasCollision = element('hasCollision').checked
    // weather
    for (const weatherKey in weather) {
      const el = element(weatherKey).value
      if (!isNaN(parseFloat(el))) {
        weather[weatherKey] = parseFloat(el)
      } else {
        weather[weatherKey] = el
      }
    }
  }
}

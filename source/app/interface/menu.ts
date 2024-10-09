// /**
//  * Contains the pause menus for ease of access.
//  */
// const menus: any = {
//   pause: element('pause') as HTMLElement,
//   new: element('new') as HTMLElement,
//   load: element('load') as HTMLElement,
//   stats: element('stats') as HTMLElement,
//   settingsGeneral: element('settingsGeneral') as HTMLElement,
//   settingsApi: element('settingsApi') as HTMLElement,
//   settingsKeybindings: element('settingsKeybindings') as HTMLElement
// }

// export function initMenu (): void {
  // for (const menusKey in menus) {
  //   menus[menusKey].style.display = 'none'
  // }
  // menus.pause.style.display = 'flex'
  // pauseMenu.addEventListener('click', (ev) => { handleMenuEvent(ev.target as HTMLElement) })
// }

/**
 * Handles a click event on an item in the pause menu that has a data-menu or data-action attribute.
 * @param target - The HTML element that was clicked.
 */
// function handleMenuEvent (target: HTMLElement): void {
//   if (target.dataset.menu != null) {
//     for (const menusKey in menus) {
//       menus[menusKey].style.display = 'none'
//     }
//     menus[target.dataset.menu].style.display = 'flex'
//   }
//   if (target.dataset.action !== null) {
//     menuAction(target)
//   }
// }

/**
 * Handles a click event on an item that has a data-action attribute.
 * @param target - The HTML element that was clicked.
 */
// function menuAction (target: HTMLElement): void {
//   switch (target.dataset.action) {
//     case 'continue':
//       openPauseMenu()
//       break
//     case 'save':
//       break
//     case 'load':
//       break
//     case 'create':
//       break
//     case 'changeKey':
//       target.addEventListener('keydown', setKey)
//       target.addEventListener('mousedown', setKey)
//       break
//     case 'saveSettings':
//       saveSettings()
//       break
//     case 'navigator':
//       navigate()
//       break
//     case 'search':
//       search((element('location') as HTMLInputElement).value, (element('apiKey') as HTMLInputElement).value)
//       break
//     case 'selectResult':
//       if (target.children.length !== 0) {
//         const option = target.children.item((target as HTMLSelectElement).selectedIndex) as HTMLOptionElement
//         ;(element('lat') as HTMLInputElement).value = option.dataset.lat as string
//         ;(element('lon') as HTMLInputElement).value = option.dataset.lon as string
//       }
//       break
//     case 'quit':
//       toStorage('settings', settings)
//       quit()
//       break
//   }
// }

/**
 * Calls the geoCoderAPI and adds the results to the selector
 * @param location - The location to search for
 * @param apiKey - The API key
 */
// function search (location: string, apiKey: string): void {
//   geoCoderAPI(location, apiKey).then((locations) => {
//     if (locations.length === 0) return
//     element('searchResults')?.replaceChildren()
//     for (const location of locations) {
//       const option = document.createElement('option')
//       option.textContent = `${location.name}, ${location.state} (${location.country})`
//       option.dataset.lat = location.lat.toString()
//       option.dataset.lon = location.lon.toString()
//       element('searchResults')?.appendChild(option)
//     }
//   }).catch(null)
// }

/**
 * Handler for the keybindings menu.
 * @param event - A keydown or mousedown event to rebind to a game action.
 */
// function setKey (event: Event): void {
//   event.target?.removeEventListener('keydown', setKey)
//   event.target?.removeEventListener('mousedown', setKey)
//   if ((event.target as HTMLElement).dataset.key !== undefined) {
//     const key = (event as KeyboardEvent).code ?? `Mouse${(event as MouseEvent).button}`
//     const k = (event.target as HTMLElement).dataset.key as string
//     settings.keybindings[k] = key
//     ;(event.target as HTMLElement).textContent = key
//   }
// }

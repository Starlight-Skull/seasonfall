/**
 * Handles a click event on an item that has a data-action attribute.
 * @param target - The HTML element that was clicked.
 */
// function menuAction (target: HTMLElement): void {
//   switch (target.dataset.action) {
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

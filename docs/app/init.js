export const appVersion = '1.1.1/2054dd7'

/**
 * Exits the app.
 * @returns {Promise<unknown>}
 */
export async function quit () {
  window.close()
}

/**
 * Returns data for the given key from localStorage.
 * @param key - The name of requested key.
 * @returns {Promise<unknown>} - A promise with the requested data.
 */
export async function fromStorage (key) {
  return await JSON.parse(localStorage.getItem(key))
}

/**
 * Saves a given key-value pair to localStorage.
 * This data is persisted in the .storage directory.
 * @param key - The name of the key to store the value as.
 * @param value - The value to store. If this is null or undefined, the record will be erased.
 * @returns {Promise<unknown>} - Returns a promise if the data has been stored.
 */
export async function toStorage (key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}

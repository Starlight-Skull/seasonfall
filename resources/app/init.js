Neutralino.init();
setupTray();

/**
 * Toggles the fullscreen when F11 is pressed.
 */
window.addEventListener('keydown', event => {
    if (event.key === 'F11') Neutralino.window.isFullScreen().then(fullscreen => {
        if (fullscreen) {
            Neutralino.window.exitFullScreen()
                .then(Neutralino.window.unmaximize()
                    .then(Neutralino.window.maximize()));
        } else Neutralino.window.setFullScreen();
    });
});

/**
 * Sets up the tray menu if the app is in window mode and not on macOS.
 */
function setupTray() {
    if (NL_OS !== "Darwin" && NL_MODE === "window") {
        Neutralino.os.setTray({
            icon: "/resources/icons/icon_16x.png",
            menuItems: [
                {id: "GIT", text: "Open on GitHub"},
                {id: "SEP-VER", text: "-"},
                {id: "VER-APP", text: `Seasonfall: v${NL_APPVERSION}`},
                {id: "VER-SERVER", text: `Neutralino server: v${NL_VERSION}`},
                {id: "VER-CLIENT", text: `Neutralino client: v${NL_CVERSION}`},
                {id: "SEP", text: "-"},
                {id: "QUIT", text: "Quit"}
            ]
        });
        Neutralino.events.on("trayMenuItemClicked", event => {
            switch (event.detail.id) {
                case "GIT":
                    Neutralino.os.open('https://github.com/Starlight-Skull/Seasonfall');
                    break;
                case "QUIT":
                    Neutralino.app.exit();
                    break;
            }
        });
    }
}

export const appVersion = NL_APPVERSION;

/**
 * Exits the app.
 * @returns {Promise<unknown>}
 */
export async function quit() {
    await Neutralino.app.exit();
}

/**
 * Returns data for the given key from Neutralino storage.
 * @param key - The name of requested key.
 * @returns {Promise<unknown>} - A promise with the requested data.
 */
export async function fromStorage(key) {
    return await Neutralino.storage.getData(key).then(JSON.parse);
}

/**
 * Reads the .storage directory and returns all .neustorage files.
 * @returns {Promise<*[]>} - An array of strings of the filenames.
 */
export async function readStorage() {
    return await Neutralino.filesystem.readDirectory('.storage').then(result => {
        let files = [];
        for (const resultElement of result) {
            if (resultElement.type === 'FILE' && resultElement.entry.search('.neustorage') > 0) {
                resultElement.entry.replace('.neustorage')
                files.push(resultElement.entry);
            }
        }
        return files;
    }).catch(() => {
        console.log('Directory not found.');
    });
}

/**
 * Saves a given key-value pair to Neutralino storage.
 * This data is persisted in the .storage directory.
 * @param key - The name of the key to store the value as.
 * @param value - The value to store. If this is null or undefined, the record will be erased.
 * @returns {Promise<unknown>} - Returns a promise if the data has been stored.
 */
export async function toStorage(key, value) {
    return await Neutralino.storage.setData(key, JSON.stringify(value));
}

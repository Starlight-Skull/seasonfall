function setTray() {
    if(NL_MODE !== "window") {
        console.log("INFO: Tray menu is only available in the window mode.");
        return;
    }
    let tray = {
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
    };
    Neutralino.os.setTray(tray);
}

function onTrayMenuItemClicked(event) {
    switch(event.detail.id) {
        case "GIT":
            Neutralino.os.open('https://github.com/Starlight-Skull/Seasonfall');
            break;
        case "QUIT":
            Neutralino.app.exit();
            break;
    }
}

Neutralino.init();
Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);


window.addEventListener('keydown', event => {
    if (event.key === 'F11') {
        Neutralino.window.isFullScreen().then(fullscreen => {
            if (fullscreen) Neutralino.window.exitFullScreen().then(Neutralino.window.unmaximize().then(Neutralino.window.maximize()));
            else Neutralino.window.setFullScreen();
        });
    }
});

if(NL_OS !== "Darwin") {
    setTray();
}

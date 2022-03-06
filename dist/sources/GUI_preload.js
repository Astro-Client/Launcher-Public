"use strict";
// Expose protected methods that allow the renderer process to use
exports.__esModule = true;
var electron_1 = require("electron");
// the ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld("api", {
    send: function (channel, data) {
        // whitelist channels
        var validChannels = ["from_GUI_window"];
        if (validChannels.includes(channel)) {
            electron_1.ipcRenderer.send(channel, data);
        }
    },
    receive: function (channel, func) {
        var validChannels = ["to_GUI_window"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            electron_1.ipcRenderer.on(channel, function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return func.apply(void 0, args);
            });
        }
    }
});

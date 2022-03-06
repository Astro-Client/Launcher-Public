"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.config = void 0;
var path_1 = __importDefault(require("path"));
exports.config = {
    "minecraft": {
        "ram": {
            "min": "2000",
            "max": "2000"
        },
        "versions": {
            "1.8.9": "1.8.9",
            "1.12.2": "1.12.2"
        }
    },
    "auth": {
        "authfile": "./creditlogin"
    },
    "version": {
        "id": "0.6.0",
        "type": "production",
        "file": path_1["default"].join("./asset/v.dt")
    },
    "remote_config_url": "https://cdn.astroclient.net/attachments/app/config.data.cert",
    "server_status_api": "https://api.astroclient.net/v2/servers/status?ref=launcher"
};

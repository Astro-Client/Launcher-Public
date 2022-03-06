"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.InitSources = void 0;
var checkServersStatus_1 = require("./checkServersStatus");
var TokenAuthManager_1 = __importDefault(require("./TokenAuthManager"));
var utils_1 = __importDefault(require("./utils"));
var AutoAuth_1 = require("./AutoAuth");
var MinecraftLauncher_1 = require("./MinecraftLauncher");
var WindowsInitializer_1 = require("./WindowsInitializer");
var app_1 = require("../app");
var UtilsAPI_1 = require("./UtilsAPI");
var InitSources = function () {
    var Sources = {
        Logger: (0, app_1.getLogger)(),
        MinecraftLauncher: (0, MinecraftLauncher_1.MinecraftLauncherModule)(),
        AutoAuth: (0, AutoAuth_1.AutoAuthModule)(),
        WindowsInitializer: (0, WindowsInitializer_1.WindowsInitializerModule)(),
        TokenAuthManager: TokenAuthManager_1["default"],
        Utils: utils_1["default"],
        CheckServersStatus: (0, checkServersStatus_1.CheckServersModule)(),
        UtilsAPI: (0, UtilsAPI_1.UtilsAPIModule)()
    };
    return Sources;
};
exports.InitSources = InitSources;

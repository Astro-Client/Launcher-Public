"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.WindowsInitializerModule = void 0;
var app_1 = require("./../app");
var utils_1 = require("./utils");
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var logger;
var InitSplashScreenLoading = function () {
    var splashScreenLoading = new electron_1.BrowserWindow({
        width: 325,
        height: 400,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true
        },
        show: false
    });
    splashScreenLoading.setIcon(path_1["default"].join(__dirname, '../../asset/icons/icon.png'));
    splashScreenLoading.loadURL(path_1["default"].join(__dirname, '../../asset/splash.html'));
    logger.log("[WindowsInitializer] Splash Screen successfuly init", logger.log_options().info);
    (0, app_1.getLauncher)().setWindowObject("splashScreenLoading", splashScreenLoading);
    return splashScreenLoading;
};
var initMainWindow = function () {
    var Launcher = (0, app_1.getLauncher)(), mainWindow;
    var mainScreenSize = electron_1.screen.getPrimaryDisplay().size;
    var window_width = parseInt((mainScreenSize.width * 0.80).toString());
    var window_height = parseInt(((window_width * 1080) / 1920).toString());
    window_height += parseInt((window_height * 0.02).toString());
    var zoom_factor = window_width / 1536;
    zoom_factor = parseFloat(zoom_factor.toFixed(2)) - 0.005;
    logger.log("[WindowsInitializer] mainScreenSize: " + mainScreenSize.width + "x" + mainScreenSize.height + "; Zoom factor: " + zoom_factor + "; Zoom Window: " + window_width + ";", logger.log_options().info);
    mainWindow = new electron_1.BrowserWindow({
        width: window_width,
        height: window_height,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true
        },
        frame: false,
        /*minWidth: 1152,*/
        /*minHeight: 648,*/
        resizable: false,
        fullscreenable: false,
        show: false,
        darkTheme: true
    });
    mainWindow.setIcon(path_1["default"].join(__dirname, '../../asset/icons/icon.png'));
    mainWindow.loadURL(Launcher.remoteConfig.proxy.app + "/launcher/");
    // mainWindow.webContents.session.clearCache(function(){
    //     console.log("[CACHE] Cache Successfuly Clear")
    // });
    mainWindow.once('ready-to-show', function () {
        mainWindow.webContents.setZoomFactor(zoom_factor);
        mainWindow.show();
    });
    mainWindow.webContents.on("before-input-event", function (event, input) {
        if (input.code == 'F4' && input.alt) {
            event.preventDefault();
            return (0, utils_1.end_all_process)();
        }
    });
    (0, app_1.getLauncher)().setWindowObject("main", mainWindow);
    return mainWindow;
};
var InitLoginWindow = function () {
    var Launcher = (0, app_1.getLauncher)(), loginWindow = new electron_1.BrowserWindow({
        width: 425,
        height: 575,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true
        },
        frame: false,
        minWidth: 1150,
        minHeight: 700,
        resizable: false,
        fullscreenable: false
    });
    loginWindow.setIcon(path_1["default"].join(__dirname, '../../asset/icons/icon.png'));
    loginWindow.loadURL(Launcher.remoteConfig.proxy.app + "/launcher/login");
    loginWindow.once('ready-to-show', function () {
        loginWindow.show();
    });
    (0, app_1.getLauncher)().setWindowObject("login", loginWindow);
    return loginWindow;
};
var ReportToWindowAnError = function (window, response, draftLog) {
    draftLog("[MainProccess] PreLaunch Opperations failed, sub-process failed, step (1/3)", logger.log_options().critical);
    if (response.status == "ERR-CONNECTION")
        return window.webContents.send("ERROR", { type: response.status });
    if (response.status == "ERR-UPKEEP")
        return window.webContents.send("ERROR", { type: response.status });
    if (response.status == "ERR-OUTDATED")
        return window.webContents.send("ERROR", { type: response.status });
    if (response.status == "ERR-FATAL")
        return window.webContents.send("ERROR", { type: response.status });
};
var WindowsInitializerModule = function () {
    logger = (0, app_1.getLogger)();
    var WindowsInitializer = {
        InitSplashScreenLoading: InitSplashScreenLoading,
        initMainWindow: initMainWindow,
        InitLoginWindow: InitLoginWindow,
        ReportToWindowAnError: ReportToWindowAnError
    };
    return WindowsInitializer;
};
exports.WindowsInitializerModule = WindowsInitializerModule;

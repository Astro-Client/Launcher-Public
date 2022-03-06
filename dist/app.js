"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getLogger = exports.getLauncher = void 0;
var electron_1 = require("electron");
var utils_1 = require("./sources/utils");
var config_1 = require("./config");
var logger_1 = require("./sources/logger");
var Launcher_1 = require("./Launcher");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//! /////////////////////////////////////
//!  => Export & Variable Declaration ///
//! /////////////////////////////////////
var logger = (0, logger_1.loggerModule)(__dirname + "/astrolog.txt");
var AstroClientLauncher;
var getLauncher = function () {
    return AstroClientLauncher;
};
exports.getLauncher = getLauncher;
var getLogger = function () {
    return logger;
};
exports.getLogger = getLogger;
//! ///////////////////////////
//!  => PreLaunch Fonction  ///
//! ///////////////////////////
var preLaunchOpperation = function (window, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var PreLaunchProgress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                PreLaunchProgress = logger.log("[MainProccess] PreLaunch Opperations started, step (1/4)", logger.log_options().loading);
                return [4 /*yield*/, (0, utils_1.sleep)(2000)];
            case 1:
                _a.sent(); // Waiting page ok
                AstroClientLauncher.Sources.CheckServersStatus.check().then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                    var remoteConfig, RemoteConfigObject, err;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (response.status != "OK")
                                    return [2 /*return*/, AstroClientLauncher.Sources.WindowsInitializer.ReportToWindowAnError(window, response, PreLaunchProgress)];
                                PreLaunchProgress("[MainProccess] PreLaunch Opperations started, step (2/4)", logger.log_options().loading);
                                return [4 /*yield*/, AstroClientLauncher.Protocols.BrainFuck.loadCertifiedRemoteData(config_1.config.remote_config_url)];
                            case 1:
                                remoteConfig = _a.sent();
                                if (typeof (remoteConfig.data) == "string") {
                                    logger.log(" • [BrainFuck] Remote Config Aquire!", logger.log_options().info);
                                    RemoteConfigObject = JSON.parse(remoteConfig.data);
                                    AstroClientLauncher.setRemoteConfig(RemoteConfigObject);
                                    PreLaunchProgress("[MainProccess] PreLaunch Opperations started, step (3/4)", logger.log_options().loading);
                                    AstroClientLauncher.Sources.AutoAuth.LoginUser(function (token) { return __awaiter(void 0, void 0, void 0, function () {
                                        var GettingUserInfosStatus, JWT_Data, PlayerInfoResponse;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    AstroClientLauncher.setToken(token);
                                                    PreLaunchProgress("[MainProccess] PreLaunch Opperations started, step (4/4)", logger.log_options().loading);
                                                    GettingUserInfosStatus = logger.log(" • [UtilsAPI] Getting Player's Infos...", logger.log_options().loading);
                                                    logger.log("  ->  " + jsonwebtoken_1["default"].decode(token), logger.log_options().warn);
                                                    JWT_Data = jsonwebtoken_1["default"].decode(token);
                                                    return [4 /*yield*/, AstroClientLauncher.Sources.UtilsAPI.GetPlayerInfos(JWT_Data._id)];
                                                case 1:
                                                    PlayerInfoResponse = _a.sent();
                                                    if (PlayerInfoResponse.PlayerInfos && !PlayerInfoResponse.err) {
                                                        PreLaunchProgress("[MainProccess] PreLaunch Opperations Finished Successfuly !", logger.log_options().info);
                                                        GettingUserInfosStatus(" • [UtilsAPI] User identified successfuly as '" + PlayerInfoResponse.PlayerInfos.username + "'", logger.log_options().info);
                                                        AstroClientLauncher.setPlayerInfo(PlayerInfoResponse.PlayerInfos);
                                                        callback();
                                                    }
                                                    else {
                                                        PreLaunchProgress("[MainProccess] PreLaunch Opperations failed, sub-process failed, step (4/4)", logger.log_options().critical);
                                                        GettingUserInfosStatus(" • [UtilsAPI] Cannot get player infos, error: " + PlayerInfoResponse.err, logger.log_options().critical);
                                                        (0, utils_1.end_all_process)();
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                }
                                else {
                                    err = remoteConfig.err;
                                    PreLaunchProgress("[MainProccess] PreLaunch Opperations failed, sub-process failed, step (2/4)", logger.log_options().critical);
                                    logger.log(" • [BrainFuck] Cannot load remote config", logger.log_options().critical);
                                    if (err)
                                        logger.log(err.toString(), logger.log_options().critical);
                                    if (remoteConfig.data)
                                        console.log(remoteConfig.data);
                                    (0, utils_1.end_all_process)();
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
var InitLauncherProcess = function () {
    var LauncherDependencyStatus = logger.log("[MainProccess] Initialising Main engine & sub-proccess...", logger.log_options().loading);
    var ObjectCreationStatus = logger.log(" • Creating Launcher Object", logger.log_options().loading);
    AstroClientLauncher = new Launcher_1.Launcher();
    ObjectCreationStatus(" • Object Launcher Successfuly created", logger.log_options().info);
    var SourcesInitStatus = logger.log(" • Initialising all Launcher Sources", logger.log_options().loading);
    AstroClientLauncher.InitLauncherSources();
    SourcesInitStatus(" • Launcher's Sources Initialised!", logger.log_options().info);
    var ProtocolsInitStatus = logger.log(" • Initialising all Launcher's Protocols", logger.log_options().loading);
    AstroClientLauncher.InitLauncherProtocols();
    ProtocolsInitStatus(" • Launcher's Protocols Initialised!", logger.log_options().info);
    LauncherDependencyStatus("[MainProccess] Sucessfuly finished Launcher Init !", logger.log_options().info);
};
//! //////////////////////////////
//!  => Launched Function & Co ///
//! //////////////////////////////
var LaunchClient = function () { return __awaiter(void 0, void 0, void 0, function () {
    var RPC_STATUS;
    var _a, _b;
    return __generator(this, function (_c) {
        AstroClientLauncher.Sources.WindowsInitializer.initMainWindow();
        (_a = AstroClientLauncher.Windows) === null || _a === void 0 ? void 0 : _a.splashScreenLoading.webContents.send('closeSplash', {});
        (_b = AstroClientLauncher.Windows) === null || _b === void 0 ? void 0 : _b.splashScreenLoading.destroy();
        RPC_STATUS = {
            state: 'Launcher - ' + config_1.config.version.id,
            details: 'In menu',
            startTimestamp: 0,
            largeImageKey: "in-menu",
            smallImageKey: "steve",
            smallImageText: AstroClientLauncher.PlayerInfo.username,
            instance: true
        };
        if (AstroClientLauncher.PlayerInfo.isadmin)
            RPC_STATUS["details"] = "Admin - In Menu";
        AstroClientLauncher.updateDiscordRP(RPC_STATUS);
        logger.log("[DEBUG_FIESTA] WE DID IT NEWTOON, THIS IS FUCKING WORKING !!!! TOKEN: " + AstroClientLauncher.Auth.token, logger.log_options().critical);
        AstroClientLauncher.setStatus("READY");
        AstroClientLauncher.InitLauncherMinecraft(function (e, config) { return __awaiter(void 0, void 0, void 0, function () {
            var AssetsifyError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AstroClientLauncher.Protocols.LayerBreaker.Assetsify(config.version)];
                    case 1:
                        AssetsifyError = _a.sent();
                        if (AssetsifyError) {
                            AstroClientLauncher.setStatus("READY");
                            return [2 /*return*/, logger.log("[Assetsify] Error was Repported: " + AssetsifyError, logger.log_options().error)];
                        }
                        AstroClientLauncher.Sources.MinecraftLauncher.LaunchMinecraftClient(config);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
//! ////////////////////
//!  => Main Process ///
//! ////////////////////
electron_1.app.whenReady().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        electron_1.app.setAsDefaultProtocolClient("astroclient");
        InitLauncherProcess();
        AstroClientLauncher.Sources.WindowsInitializer.InitSplashScreenLoading();
        if (!((_a = AstroClientLauncher.Windows) === null || _a === void 0 ? void 0 : _a.splashScreenLoading))
            return [2 /*return*/, logger.log("[MainProcess] No splashScreenLoading init, stop process", logger.log_options().critical)];
        (_b = AstroClientLauncher.Windows) === null || _b === void 0 ? void 0 : _b.splashScreenLoading.once('ready-to-show', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                if (!((_a = AstroClientLauncher.Windows) === null || _a === void 0 ? void 0 : _a.splashScreenLoading))
                    return [2 /*return*/];
                (_b = AstroClientLauncher.Windows) === null || _b === void 0 ? void 0 : _b.splashScreenLoading.webContents.send('updater_version', { "id": config_1.config.version.id.toString() });
                (_c = AstroClientLauncher.Windows) === null || _c === void 0 ? void 0 : _c.splashScreenLoading.show();
                preLaunchOpperation((_d = AstroClientLauncher.Windows) === null || _d === void 0 ? void 0 : _d.splashScreenLoading, function () {
                    logger.log("[MainProcess] Launcher successfuly started!", logger.log_options().info);
                    LaunchClient(); //(remoteConfig, splashScreenLoading, logger, AstroClientLaunchingStatus);
                });
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); });
console.log("\n $$$$$$\\             $$\\                                $$$$$$\\  $$\\ $$\\                     $$\\     \n$$  __$$\\            $$ |                              $$  __$$\\ $$ |\\__|                    $$ |    \n$$ /  $$ | $$$$$$$\\$$$$$$\\    $$$$$$\\   $$$$$$\\        $$ /  \\__|$$ |$$\\  $$$$$$\\  $$$$$$$\\$$$$$$\\   \n$$$$$$$$ |$$  _____\\_$$  _|  $$  __$$\\ $$  __$$\\       $$ |      $$ |$$ |$$  __$$\\ $$  __$$\\_$$  _|  \n$$  __$$ |\\$$$$$$\\   $$ |    $$ |  \\__|$$ /  $$ |      $$ |      $$ |$$ |$$$$$$$$ |$$ |  $$ |$$ |    \n$$ |  $$ | \\____$$\\  $$ |$$\\ $$ |      $$ |  $$ |      $$ |  $$\\ $$ |$$ |$$   ____|$$ |  $$ |$$ |$$\\ \n$$ |  $$ |$$$$$$$  | \\$$$$  |$$ |      \\$$$$$$  |      \\$$$$$$  |$$ |$$ |\\$$$$$$$\\ $$ |  $$ |\\$$$$  |\n\\__|  \\__|\\_______/   \\____/ \\__|       \\______/        \\______/ \\__|\\__| \\_______|\\__|  \\__| \\____/ \n                                                                                                     \n-----------------------------------------------------------------------------------------------------\n--------------------------------- Welcome to our launcher -------------------------------------------\n-----------------------------------------------------------------------------------------------------\n\nWait... what are you trying to do ?? Reverse Engenering ?? Hacking O-O ??\nWhatever, join us and became a official contributer for this Open Source Client !\n\nInsta: https://www.instagram.com/astroclient/\nTwitter: https://twitter.com/astroclient0\nDiscord: https://discord.com/invite/5ezgfdEnHN\n");

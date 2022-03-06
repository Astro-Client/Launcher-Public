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
exports.__esModule = true;
exports.MinecraftLauncherModule = void 0;
var app_1 = require("./../app");
var config_1 = require("../config");
var logger;
var MinecraftDebugEvent = function (e) {
    var _a, _b, _c;
    var Launcher = (0, app_1.getLauncher)();
    logger.log('[MinecraftLauncher] DATA: ' + e, logger.log_options().info);
    if (e.indexOf("Couldn't start Minecraft due to: Error: Command failed: \"java\" -version") > -1) {
        logger.log("[MinecraftLauncher] Java Exception, no instance because the command failed (no found java): please check your java environment", logger.log_options().error);
        Launcher.setStatus("NOT-READY");
        return (_a = Launcher.Windows) === null || _a === void 0 ? void 0 : _a.main.webContents.send('debugGameLaunch', "Fail to start Astro Client, Java no found, download it before restarting !");
        // Launcher.Windows?.main.webContents.send('game_stopped', {}); Keep message up keep to user
    }
    if (e.indexOf("[Client thread/INFO]: Stopping!") > -1) {
        logger.log("[MinecraftLauncher] Minecraft session end!", logger.log_options().warn);
        Launcher.setStatus("READY");
        return (_b = Launcher.Windows) === null || _b === void 0 ? void 0 : _b.main.webContents.send('game_stopped', "");
    }
    e = e.split(":")[3];
    if (!e)
        return;
    if (e.length > 64) {
        var splitLogString = e.split('');
        e = '';
        for (var i = 0; i < 64; i++) {
            e = e + splitLogString[i];
        }
        e = e += '...';
    }
    (_c = Launcher.Windows) === null || _c === void 0 ? void 0 : _c.main.webContents.send('debugGameLaunch', e);
};
var GetMCAuthToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err, token, Launcher, options, response;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                Launcher = (0, app_1.getLauncher)();
                if (!Launcher.Auth.token) {
                    err = new Error("[MinecraftLauncher] No Launcher.Auth.token assigned!");
                    return [2 /*return*/, { err: err, token: token }];
                }
                options = {
                    method: "get",
                    url: Launcher.remoteConfig.proxy.app + "/apiv1/user/" + Launcher.PlayerInfo._id + "/launchToken",
                    headers: {
                        "launcherToken": Launcher.Auth.token.toString()
                    }
                };
                return [4 /*yield*/, Launcher.Sources.Utils.request(options)];
            case 1:
                response = _c.sent();
                if (((_a = response.response) === null || _a === void 0 ? void 0 : _a.status) == 200 && response.response.data.Success == true && !response._err) {
                    token = new Promise(function (resolve, reject) { var _a; return resolve((_a = response.response) === null || _a === void 0 ? void 0 : _a.data.token); }); // Create a promise here
                    return [2 /*return*/, { err: err, token: token }];
                }
                else {
                    err = new Error("[MinecraftLauncher] Cannot get Minecraft launch token, error" + response._err || ((_b = response.response) === null || _b === void 0 ? void 0 : _b.data.message));
                    return [2 /*return*/, { err: err, token: token }];
                }
                return [2 /*return*/];
        }
    });
}); };
var LaunchMinecraftClient = function (launchConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var raw_versions, parse_version, LaunchingError, MinecraftTokenResponse, opts;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                (_a = (0, app_1.getLauncher)().Windows) === null || _a === void 0 ? void 0 : _a.main.webContents.send('game_starting');
                raw_versions = config_1.config.minecraft.versions;
                parse_version = raw_versions[launchConfig.version];
                LaunchingError = logger.log("[MinecraftLauncher] [DEBUG] Starting Minecraft Launcher in version " + parse_version, logger.log_options().loading);
                logger.log(" -> [DEBUG] Starting Minecraft with ".concat(config_1.config.minecraft.ram.min, "M/").concat(config_1.config.minecraft.ram.max, "M of ram."), logger.log_options().info);
                if (config_1.config.version.type == "dev")
                    (0, app_1.getLauncher)().updateDiscordRP({ details: 'Developer Core Tool Kit | Glorious goes brrrrrr' });
                return [4 /*yield*/, GetMCAuthToken()];
            case 1:
                MinecraftTokenResponse = _b.sent();
                if (!MinecraftTokenResponse.err && MinecraftTokenResponse.token) {
                    opts = {
                        forge: "./minecraft/versions/forge-".concat(parse_version, ".jar"),
                        installer: "./minecraft/versions/forge-".concat(parse_version, ".jar"),
                        authorization: MinecraftTokenResponse.token,
                        root: "./minecraft",
                        version: {
                            number: launchConfig.version,
                            type: "release"
                        },
                        memory: {
                            min: config_1.config.minecraft.ram.min,
                            max: config_1.config.minecraft.ram.max
                        }
                    };
                    (0, app_1.getLauncher)().MinecraftClient.launch(opts);
                }
                else {
                    LaunchingError("[MinecraftLauncher] Cannot start minecraft launcher, Error: " + MinecraftTokenResponse.err, logger.log_options().error);
                }
                return [2 /*return*/];
        }
    });
}); };
var MinecraftLauncherModule = function () {
    logger = (0, app_1.getLogger)();
    var MinecraftLauncher = {
        MinecraftDebugEvent: MinecraftDebugEvent,
        LaunchMinecraftClient: LaunchMinecraftClient
    };
    return MinecraftLauncher;
};
exports.MinecraftLauncherModule = MinecraftLauncherModule;

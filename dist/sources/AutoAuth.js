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
exports.AutoAuthModule = void 0;
var utils_1 = require("./utils");
var app_1 = require("./../app");
var electron_1 = require("electron");
var fs_1 = __importDefault(require("fs"));
var config_1 = require("../config");
var TokenAuthManager_1 = require("./TokenAuthManager");
var logger;
var getAuthFile = function () {
    var FileLoadingProgression = logger.log('  -> [AuthFile] Checking Auth File for eventualy stored token...', logger.log_options().loading);
    try {
        if (!fs_1["default"].existsSync(config_1.config.auth.authfile))
            fs_1["default"].writeFileSync(config_1.config.auth.authfile, "");
        var data = fs_1["default"].readFileSync(config_1.config.auth.authfile, 'utf8');
        if (data != "") {
            var launcherToken = JSON.parse(data.toString());
            FileLoadingProgression('  -> [AuthFile] Stored LauncherToken find in File!', logger.log_options().info);
            return { err: undefined, launcherToken: launcherToken.t };
        }
        else {
            FileLoadingProgression('  -> [AuthFile] No LauncherToken find in File!', logger.log_options().warn);
            return { err: undefined, launcherToken: undefined };
        }
    }
    catch (e) {
        FileLoadingProgression('  -> [AuthFile] File System Opperation Failed!', logger.log_options().error);
        return { err: new Error("[AuthFile] Login By File Failed, erreur report: " + e.toString()), launcherToken: undefined };
    }
};
var saveLauncherToken = function (launcherToken) {
    var SaveTokenLoadingProgression = logger.log('  -> [AuthFile] Saving Auth Token...', logger.log_options().loading);
    try {
        fs_1["default"].writeFileSync(config_1.config.auth.authfile, JSON.stringify({ "t": launcherToken }, null, 4));
        SaveTokenLoadingProgression('  -> [AuthFile] Token Successfuly saved', logger.log_options().info);
        return undefined;
    }
    catch (e) {
        SaveTokenLoadingProgression('  -> [AuthFile] File System Opperation Failed.', logger.log_options().error);
        return new Error("[AuthFile] Save Launcher Token Opperation failed, Error: " + e.toString());
    }
};
var Logout = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fs_1["default"].writeFileSync(config_1.config.auth.authfile, '');
        logger.log('[AutoLogger] Successufly Deleted Client Session, user logout.', logger.log_options().warn);
        return [2 /*return*/];
    });
}); };
var LoginByFile = function (LauncherToken, LoginProgression, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var CheckingTokenProgression, CheckLauncherTokenResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                CheckingTokenProgression = logger.log('  -> [CheckingLauncherToken] Checking Stored Auth Token throw Astro Client Servers', logger.log_options().loading);
                return [4 /*yield*/, (0, TokenAuthManager_1.CheckLauncherToken)(LauncherToken)];
            case 1:
                CheckLauncherTokenResult = _a.sent();
                if (!CheckLauncherTokenResult.valide) return [3 /*break*/, 3];
                CheckingTokenProgression("  -> [CheckingLauncherToken] Stored Auth Token Valide!", logger.log_options().info);
                LoginProgression(' • [AutoAuth] Successufly AutoLoged', logger.log_options().info);
                return [4 /*yield*/, (0, TokenAuthManager_1.apply_session_auth_cookie)(LauncherToken)];
            case 2:
                _a.sent();
                callback(LauncherToken);
                return [3 /*break*/, 4];
            case 3:
                if (!CheckLauncherTokenResult.valide && !CheckLauncherTokenResult.err) {
                    CheckingTokenProgression("  -> [CheckingLauncherToken] Stored Auth Token InValide, start manual methode!", logger.log_options().warn);
                    LoginProgression(' • [AutoAuth] AutoLoger Using Manual Login Proccess, checking LauncherToken validity, step 1/2', logger.log_options().loading);
                    LoginManual(LoginProgression, callback);
                }
                else {
                    CheckingTokenProgression("  -> [CheckingLauncherToken] Unknow Error... Skiping step, start manual methode!", logger.log_options().warn);
                    LoginProgression(' • [AutoAuth] AutoLoger Using Manual Login Proccess, checking LauncherToken validity, step 1/2', logger.log_options().loading);
                    LoginManual(LoginProgression, callback);
                }
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var LoginManual = function (LoginProgression, callback) {
    (0, app_1.getLauncher)().Sources.WindowsInitializer.InitLoginWindow();
    logger.log('  -> [ManualLogin] Login Window Sucessfuly Init!', logger.log_options().info);
    var GeneratinTokenProgression = logger.log('  -> [ManualLogin] Waiting for classic User Auth Token throw Login Window...', logger.log_options().loading);
    electron_1.ipcMain.on('successLogin', function (event, data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, err, launcherToken;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    (_b = (0, app_1.getLauncher)().Windows) === null || _b === void 0 ? void 0 : _b.login.destroy();
                    GeneratinTokenProgression("  -> [ManualLogin] User Token receive, generatin Launcher token...", logger.log_options().loading);
                    return [4 /*yield*/, (0, TokenAuthManager_1.CreatelauncherToken)(data.loginToken)];
                case 1:
                    _a = _c.sent(), err = _a.err, launcherToken = _a.launcherToken;
                    if (!(launcherToken && !err)) return [3 /*break*/, 3];
                    GeneratinTokenProgression("  -> [ManualLogin] Launcher Token Generated !", logger.log_options().info);
                    LoginProgression(' • [AutoAuth] Successufly AutoLoged', logger.log_options().info);
                    saveLauncherToken(launcherToken);
                    return [4 /*yield*/, (0, TokenAuthManager_1.apply_session_auth_cookie)(launcherToken)];
                case 2:
                    _c.sent();
                    callback(launcherToken);
                    return [3 /*break*/, 4];
                case 3:
                    LoginProgression(" • [AutoAuth] Error, login token parse by login windows are invalide (error code 0xAA01)!\n" + (err === null || err === void 0 ? void 0 : err.toString()), logger.log_options().critical);
                    console.error("A Major error was report (error code 0xAA01) !\nCheck yout network and restart the Launcher.\nIf this persiste, contact the Staff.");
                    (0, utils_1.end_all_process)();
                    _c.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
var LoginUser = function (callback) { return __awaiter(void 0, void 0, void 0, function () {
    var LoginProgression, getAuthFileResult;
    return __generator(this, function (_a) {
        LoginProgression = logger.log(' • [AutoAuth] Starting AutoLoger Proccess, step 0/2', logger.log_options().loading);
        getAuthFileResult = getAuthFile();
        if (getAuthFileResult.launcherToken && !getAuthFileResult.err) {
            LoginProgression(' • [AutoAuth] AutoLoger Use File Proccess, checking LauncherToken validity, step 1/2', logger.log_options().loading);
            LoginByFile(getAuthFileResult.launcherToken, LoginProgression, callback);
        }
        else {
            LoginProgression(' • [AutoAuth] AutoLoger Using Manual Login Proccess, checking LauncherToken validity, step 1/2', logger.log_options().loading);
            LoginManual(LoginProgression, callback);
        }
        return [2 /*return*/];
    });
}); };
var AutoAuthModule = function () {
    logger = (0, app_1.getLauncher)().getLogger();
    var AutoAuth = {
        LoginUser: LoginUser,
        Logout: Logout
    };
    return AutoAuth;
};
exports.AutoAuthModule = AutoAuthModule;

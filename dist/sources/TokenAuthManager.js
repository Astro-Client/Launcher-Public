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
exports.GetPersonnalInformation = exports.apply_session_auth_cookie = exports.CreatelauncherToken = exports.CheckLauncherToken = void 0;
var app_1 = require("./../app");
var electron_1 = require("electron");
var config_1 = require("../config");
var utils_1 = require("./utils");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var CheckLauncherToken = function (Token) { return __awaiter(void 0, void 0, void 0, function () {
    var Launcher, options, _a, _err, response, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Launcher = (0, app_1.getLauncher)();
                options = {
                    'method': 'GET',
                    'url': Launcher.remoteConfig.proxy.api + "/v2/launcher/verifylauncherToken/" + Token,
                    'headers': {
                        'User-Agent': 'AstroClientFetch/' + config_1.config.version.id
                    }
                };
                return [4 /*yield*/, (0, utils_1.request)(options)];
            case 1:
                _a = _b.sent(), _err = _a._err, response = _a.response;
                if (response && !_err) {
                    data = response === null || response === void 0 ? void 0 : response.data;
                    if (data.Success == true) {
                        if (data.valide == true) {
                            // CheckLauncherTokenStatus("[TokenAuthManager] Checking launcher Token opperation finish, Token Valide!", logger.log_options().info)
                            return [2 /*return*/, { err: undefined, valide: true }];
                        }
                        else {
                            // CheckLauncherTokenStatus("[TokenAuthManager] Checking launcher Token opperation finish, Token InValide!", logger.log_options().warn)
                            return [2 /*return*/, { err: undefined, valide: false }];
                        }
                    }
                    else {
                        return [2 /*return*/, { err: new Error("[TokenAuthManager] Checking launcher Token opperation Failed, Astro Client Servers return Success:false"), valide: false }];
                    }
                }
                else {
                    // CheckLauncherTokenStatus("[TokenAuthManager] Checking launcher Token opperation Failed, Cannot join Astro Client Servers!", logger.log_options().error);
                    return [2 /*return*/, { err: new Error("[TokenAuthManager] Checking launcher Token opperation Failed, Cannot join Astro Client Servers!"), valide: false }];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.CheckLauncherToken = CheckLauncherToken;
var CreatelauncherToken = function (Token) { return __awaiter(void 0, void 0, void 0, function () {
    var Launcher, options, _a, _err, response, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Launcher = (0, app_1.getLauncher)();
                options = {
                    'method': 'GET',
                    'url': Launcher.remoteConfig.proxy.api + "/v2/launcher/getLauncherToken/" + Token,
                    'headers': {
                        'User-Agent': 'AstroClientFetch/' + config_1.config.version.id
                    }
                };
                return [4 /*yield*/, (0, utils_1.request)(options)];
            case 1:
                _a = _b.sent(), _err = _a._err, response = _a.response;
                if (!_err && response) {
                    data = response === null || response === void 0 ? void 0 : response.data;
                    if (data.Success == true) {
                        if (data.launcherToken) {
                            return [2 /*return*/, { err: undefined, launcherToken: data.launcherToken }];
                        }
                        else {
                            return [2 /*return*/, { err: new Error("[TokenAuthManager] CreateLauncher Token Failed, no launcher token returns by Astro Client Servers"), launcherToken: undefined }];
                        }
                    }
                    else {
                        return [2 /*return*/, { err: new Error("[TokenAuthManager] CreateLauncher Token Failed, Astro Client Servers return Success:false"), launcherToken: undefined }];
                    }
                }
                else {
                    return [2 /*return*/, { err: new Error("[TokenAuthManager] Creating Launcher Token opperation Failed, Cannot join Astro Client Servers!"), launcherToken: undefined }];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.CreatelauncherToken = CreatelauncherToken;
var apply_session_auth_cookie = function (LauncherToken) { return __awaiter(void 0, void 0, void 0, function () {
    var Launcher, cookie, cookie_debug, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Launcher = (0, app_1.getLauncher)();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!(config_1.config.version.type == "production" || config_1.config.version.type == "lab")) return [3 /*break*/, 3];
                cookie = { url: Launcher.remoteConfig.proxy.app, name: 'launcherToken', value: LauncherToken };
                return [4 /*yield*/, electron_1.session.defaultSession.cookies.set(cookie)];
            case 2:
                _a.sent();
                Launcher.System.logger.log("  -> [AutoAuth] Session Auth Cookie Successfuly Apply!", Launcher.System.logger.log_options().info);
                return [3 /*break*/, 5];
            case 3:
                cookie_debug = { url: "http://127.0.0.1:8081/", name: 'launcherToken', value: LauncherToken };
                return [4 /*yield*/, electron_1.session.defaultSession.cookies.set(cookie_debug)];
            case 4:
                _a.sent();
                Launcher.System.logger.log("  -> [AutoAuth] {DEV} Session Auth Cookie Successfuly Apply!", Launcher.System.logger.log_options().info);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.apply_session_auth_cookie = apply_session_auth_cookie;
var GetPersonnalInformation = function (token) {
    var _a;
    var decoded = (_a = jsonwebtoken_1["default"].decode(token, { complete: true })) === null || _a === void 0 ? void 0 : _a.payload;
    var infos = JSON.parse(decoded);
    return infos;
};
exports.GetPersonnalInformation = GetPersonnalInformation;
exports["default"] = {
    CheckLauncherToken: exports.CheckLauncherToken,
    CreatelauncherToken: exports.CreatelauncherToken,
    apply_session_auth_cookie: exports.apply_session_auth_cookie,
    GetPersonnalInformation: exports.GetPersonnalInformation
};

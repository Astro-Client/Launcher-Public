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
exports.LayerBreakerModule = exports.LayerBreaker = void 0;
var app_1 = require("../app");
var utils_1 = require("../sources/utils");
var node_crypto_1 = require("node:crypto");
var fs_1 = require("fs");
var async_1 = require("async");
var axios_1 = __importDefault(require("axios"));
var node_fs_1 = require("node:fs");
var promises_1 = require("fs/promises");
var node_path_1 = __importDefault(require("node:path"));
var logger;
var LayerBreaker;
(function (LayerBreaker) {
    ;
    ;
    ;
    ;
    ;
})(LayerBreaker = exports.LayerBreaker || (exports.LayerBreaker = {}));
var PathFormater = function (targetpath) {
    var replacer = [
        "minecraft://=./minecraft/",
        "astroclient://=./minecraft/.astroclient/"
    ];
    replacer.forEach(function (item) {
        var replacerDetail = item.split("=");
        targetpath = targetpath.replace(replacerDetail[0], replacerDetail[1]);
    });
    return targetpath;
};
var getCorespondingAssetsURL = function (version) { return __awaiter(void 0, void 0, void 0, function () {
    var err, assetsConfigurationURL, versionAssetsHubURL, _a, AssetHubURLreponse, GivedVersionAssetRelease;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                versionAssetsHubURL = (0, app_1.getLauncher)().remoteConfig.assets[version];
                if (!(typeof (versionAssetsHubURL) == "string")) return [3 /*break*/, 4];
                _a = versionAssetsHubURL.split(":")[0];
                switch (_a) {
                    case "web": return [3 /*break*/, 1];
                }
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, (0, utils_1.getUrlData)(versionAssetsHubURL.replace("web:", ""))];
            case 2:
                AssetHubURLreponse = _b.sent();
                if (AssetHubURLreponse.err == undefined && AssetHubURLreponse.data) {
                    GivedVersionAssetRelease = AssetHubURLreponse.data;
                    assetsConfigurationURL = GivedVersionAssetRelease[(0, app_1.getLauncher)().releaseType];
                }
                else
                    err = AssetHubURLreponse.err;
                return [3 /*break*/, 3];
            case 3: return [3 /*break*/, 5];
            case 4:
                err = new Error("[LayerBreaker] Cannot get remote VERSION_ASSETS_HUB_URL from remoteConfig!");
                _b.label = 5;
            case 5: return [2 /*return*/, { err: err, assetsConfigurationURL: assetsConfigurationURL }];
        }
    });
}); };
var LoadAssetsConfiguration = function (configURL) { return __awaiter(void 0, void 0, void 0, function () {
    var err, AssetsConfig, URLreponse, minVersionrequire, launcherVersion;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.getUrlData)(configURL)];
            case 1:
                URLreponse = _a.sent();
                if (URLreponse.err == undefined) {
                    AssetsConfig = URLreponse.data;
                    minVersionrequire = parseInt(AssetsConfig.minimumLauncherVersion.split(".").join(""));
                    launcherVersion = parseInt((0, app_1.getLauncher)().version.split(".").join(""));
                    if (!(launcherVersion >= minVersionrequire)) {
                        AssetsConfig = undefined;
                        err = new Error("[LayerBreaker] Launcher version is too old!");
                    }
                }
                else
                    err = URLreponse.err;
                return [2 /*return*/, { err: err, AssetsConfig: AssetsConfig }];
        }
    });
}); };
var DownloadAsset = function (asset) { return __awaiter(void 0, void 0, void 0, function () {
    var url, path, writer, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = asset.downloads.artifact.url;
                path = PathFormater(asset.downloads.artifact.path + asset.name);
                writer = (0, fs_1.createWriteStream)(path);
                return [4 /*yield*/, (0, axios_1["default"])({
                        url: url,
                        method: 'GET',
                        responseType: 'stream'
                    })];
            case 1:
                response = _a.sent();
                response.data.pipe(writer);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        writer.on('finish', resolve);
                        writer.on('error', reject);
                    })];
        }
    });
}); };
var CheckAssets = function (assets) {
    return new Promise(function (resolve, reject) {
        (0, async_1.forEach)(assets, function (asset, next) { return __awaiter(void 0, void 0, void 0, function () {
            var ProccessingAssetLoading, file_path, fd, hash;
            return __generator(this, function (_a) {
                ProccessingAssetLoading = logger.log(" \u2022 (".concat(asset.name, ") Proccessing asset file..."), logger.log_options().loading);
                file_path = PathFormater(asset.downloads.artifact.path + asset.name);
                if ((0, node_fs_1.existsSync)(file_path)) {
                    ProccessingAssetLoading(" \u2022 (".concat(asset.name, ") Asset already existe, checking digital signature (").concat(asset.downloads.artifact.hashMethode.toString(), " hash)"), logger.log_options().loading);
                    fd = (0, fs_1.createReadStream)(file_path);
                    hash = (0, node_crypto_1.createHash)(asset.downloads.artifact.hashMethode.toString());
                    hash.setEncoding('hex');
                    fd.on('end', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var return_hashfile;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        hash.end();
                                        return_hashfile = hash.read();
                                        if (!(return_hashfile != asset.downloads.artifact.hash)) return [3 /*break*/, 2];
                                        ProccessingAssetLoading(" \u2022 (".concat(asset.name, ") Asset invalide hash, re-downloading it at ").concat(asset.downloads.artifact.url), logger.log_options().loading);
                                        return [4 /*yield*/, DownloadAsset(asset)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        ProccessingAssetLoading(" \u2022 (".concat(asset.name, ") Asset successfuly proccessed!"), logger.log_options().info);
                                        return [2 /*return*/, next()];
                                }
                            });
                        });
                    });
                    fd.pipe(hash);
                }
                else {
                    (0, promises_1.mkdir)(node_path_1["default"].dirname(PathFormater(asset.downloads.artifact.path + asset.name)), {
                        recursive: true
                    }).then(function (x) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ProccessingAssetLoading(" \u2022 (".concat(asset.name, ") Asset do not existe, downloading it at ").concat(asset.downloads.artifact.url), logger.log_options().loading);
                                    return [4 /*yield*/, DownloadAsset(asset)];
                                case 1:
                                    _a.sent();
                                    ProccessingAssetLoading(" \u2022 (".concat(asset.name, ") Asset successfuly proccessed!"), logger.log_options().info);
                                    return [2 /*return*/, next()];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        }); }, function (err) {
            if (!err)
                resolve(undefined);
            else
                reject(err);
        });
    });
};
var DirectorySubRulesProccessor = function (directoryTargetpath, subRules, callback) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, async_1.forEach)(subRules, function (rule, next) {
            switch (rule.type) {
                case "restrictListFile":
                    var files = (0, fs_1.readdirSync)(directoryTargetpath);
                    var files_dif = (0, utils_1.DifTooArray)(files, rule.value);
                    if (files_dif[0])
                        (0, utils_1.deleteFiles)(files_dif, directoryTargetpath, next);
                    else
                        next();
                    break;
            }
        }, function (err) {
            callback(err);
        });
        return [2 /*return*/];
    });
}); };
var RulesProccessor = function (rules) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    (0, async_1.forEach)(rules, function (rule, next) {
                        switch (rule.targetType) {
                            case "directory":
                                DirectorySubRulesProccessor(PathFormater(rule.targetPath), rule.rules, function (e) {
                                    console.log(e);
                                    next();
                                });
                                break;
                            case "file":
                                break;
                        }
                    }, function (err) {
                        if (!err)
                            resolve(undefined);
                        else
                            reject(err);
                    });
                    return [2 /*return*/];
                });
            }); })];
    });
}); };
var Assetsify = function (version) { return __awaiter(void 0, void 0, void 0, function () {
    var err, ProccessingAssetsLoading, assetsConfigurationURL, assetsConfiguration, DownloadAssetsResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ProccessingAssetsLoading = logger.log("[LayerBreaker] Starting Aquire Assetsify Config...", logger.log_options().loading);
                return [4 /*yield*/, getCorespondingAssetsURL(version)];
            case 1:
                assetsConfigurationURL = _a.sent();
                if (!(assetsConfigurationURL.err == undefined && assetsConfigurationURL.assetsConfigurationURL)) return [3 /*break*/, 10];
                return [4 /*yield*/, LoadAssetsConfiguration(assetsConfigurationURL.assetsConfigurationURL)];
            case 2:
                assetsConfiguration = _a.sent();
                if (!(assetsConfiguration.err == undefined && assetsConfiguration.AssetsConfig)) return [3 /*break*/, 8];
                ProccessingAssetsLoading("[LayerBreaker] Running BeforeAll Rules...", logger.log_options().loading);
                return [4 /*yield*/, RulesProccessor(assetsConfiguration.AssetsConfig.rulesEvent.beforeAll)];
            case 3:
                _a.sent();
                ProccessingAssetsLoading("[LayerBreaker] Assetsify Config Aquire, starting checing assets...", logger.log_options().loading);
                return [4 /*yield*/, CheckAssets(assetsConfiguration.AssetsConfig.assets)];
            case 4:
                DownloadAssetsResult = _a.sent();
                ProccessingAssetsLoading("[LayerBreaker] Running AfterAll Rules...", logger.log_options().loading);
                if (!!DownloadAssetsResult) return [3 /*break*/, 6];
                return [4 /*yield*/, RulesProccessor(assetsConfiguration.AssetsConfig.rulesEvent.afterAll)];
            case 5:
                _a.sent();
                ProccessingAssetsLoading("[LayerBreaker] Assets Successfuly proccessed!", logger.log_options().info);
                return [3 /*break*/, 7];
            case 6: return [2 /*return*/, err = new Error(DownloadAssetsResult)];
            case 7: return [3 /*break*/, 9];
            case 8:
                err = assetsConfiguration.err;
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                err = assetsConfigurationURL.err;
                _a.label = 11;
            case 11: return [2 /*return*/, err];
        }
    });
}); };
var LayerBreakerModule = function () {
    logger = (0, app_1.getLogger)();
    return { Assetsify: Assetsify };
};
exports.LayerBreakerModule = LayerBreakerModule;

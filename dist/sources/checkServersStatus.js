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
exports.CheckServersModule = void 0;
var app_1 = require("../app");
var config_1 = require("../config");
var utils_1 = require("./utils");
var logger;
var check = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err, status, options, draftStatus, requestResult, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = "ERR-FATAL";
                options = {};
                options["method"] = "get";
                options["url"] = config_1.config.server_status_api.toString();
                options["headers"] = { 'User-Agent': 'AstroClient/Launcher' };
                draftStatus = logger.log(' • [ServerStatus] Requesting Astro Client Server... Checking information\r', {});
                return [4 /*yield*/, (0, utils_1.request)(options)];
            case 1:
                requestResult = _a.sent();
                if (!requestResult._err && requestResult.response) {
                    if (requestResult.response.status == 200) {
                        data = void 0;
                        data = requestResult.response.data;
                        if (data.upkeep == undefined) {
                            draftStatus(' • [ServerStatus] Critical Error during Requesting Astro Client Server: ERR-FATAL', logger.log_options().critical);
                            logger.log(" => Cannot parse JSON data, " + requestResult.response.data, logger.log_options().critical);
                            console.log(requestResult.response.data);
                            err = new Error("[CheckServersStatus] Cannot parse JSON data!");
                            status = "ERR-FATAL";
                            return [2 /*return*/, { err: err, status: status }];
                        }
                        if (data.upkeep != true) {
                            if (data.ip.ban != true) {
                                draftStatus(' • [ServerStatus] Requesting Astro Client Server... DONE', logger.log_options().info);
                                status = "OK";
                            }
                            else {
                                err = new Error("[CheckServersStatus] Internet IP Banned from Astro Client Networks!");
                                status = "ERR-BANIP";
                            }
                        }
                        else {
                            err = new Error("[CheckServersStatus] Servers currently up-keeping");
                            status = "ERR-UPKEEP";
                        }
                    }
                    else {
                        err = new Error("[CheckServersStatus] server return no-200 status!");
                        status = "ERR-CONNECTION";
                    }
                }
                else {
                    draftStatus(' • [ServerStatus] Critical Error during Requesting Astro Client Server: ERR-CONNECTION', logger.log_options().critical);
                    logger.log(" => " + requestResult._err + " " + requestResult.response, logger.log_options().critical);
                    err = requestResult._err;
                    status = "ERR-CONNECTION";
                }
                return [2 /*return*/, { err: err, status: status }];
        }
    });
}); };
/*
Error List Doc:
    ERR-CONNECTION
    ERR-UPKEEP
    ERR-OUTDATED
    ERR-FATAL
*/
var CheckServersModule = function () {
    logger = (0, app_1.getLogger)();
    return { check: check };
};
exports.CheckServersModule = CheckServersModule;

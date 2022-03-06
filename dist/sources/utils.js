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
exports.end_all_process = exports.deleteFiles = exports.DifTooArray = exports.request = exports.getUrlData = exports.sleep = void 0;
var axios_1 = __importDefault(require("axios"));
var child_process_1 = require("child_process");
var electron_1 = require("electron");
var fs_1 = require("fs");
var path_1 = require("path");
var underscore_1 = require("underscore");
// ! utils
var sleep = function (milliseconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
};
exports.sleep = sleep;
var getUrlData = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var err, data, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get(url)];
            case 1:
                response = _a.sent();
                if (response.status == 200) {
                    data = response.data;
                }
                else {
                    err = new Error('[BRAINFUCK] URL status no-200!');
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                err = new Error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, { err: err, data: data }];
        }
    });
}); };
exports.getUrlData = getUrlData;
var request = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var _err, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].request(options)];
            case 1:
                response = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                _err = new Error(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, { _err: _err, response: response }];
        }
    });
}); };
exports.request = request;
var DifTooArray = function (array1, array2) {
    return (0, underscore_1.difference)(array1, array2);
};
exports.DifTooArray = DifTooArray;
var deleteFiles = function (files, directory, callback) {
    var i = files.length;
    files.forEach(function (filepath) {
        (0, fs_1.unlink)((0, path_1.join)(directory, filepath), function (err) {
            i--;
            if (err) {
                callback(err);
                return;
            }
            else if (i <= 0) {
                callback(null);
            }
        });
    });
};
exports.deleteFiles = deleteFiles;
// When all windows are close, be sur all proccess done
var end_all_process = function () {
    (0, child_process_1.exec)('taskkill /f /im "Astro Client.exe"');
    electron_1.app.exit();
};
exports.end_all_process = end_all_process;
exports["default"] = {
    sleep: exports.sleep,
    getUrlData: exports.getUrlData,
    request: exports.request,
    DifTooArray: exports.DifTooArray,
    deleteFiles: exports.deleteFiles,
    end_all_process: exports.end_all_process
};

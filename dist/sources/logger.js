"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.loggerModule = void 0;
var draftlog_1 = __importDefault(require("draftlog"));
var fs_1 = __importDefault(require("fs"));
var colors_1 = __importDefault(require("colors"));
var _filepath;
var _textformater = function (log, options) {
    var finaltext = log;
    if (options.textColor)
        finaltext = finaltext[options.textColor.toString()];
    if (options.backgroundColor)
        finaltext = finaltext[options.backgroundColor];
    if (options.styles) {
        if (options.styles.indexOf("bold") >= 0)
            finaltext = finaltext["bold"];
        if (options.styles.indexOf("dim") >= 0)
            finaltext = finaltext["dim"];
        if (options.styles.indexOf("italic") >= 0)
            finaltext = finaltext["italic"];
        if (options.styles.indexOf("underline") >= 0)
            finaltext = finaltext["underline"];
        if (options.styles.indexOf("inverse") >= 0)
            finaltext = finaltext["inverse"];
        if (options.styles.indexOf("strikethrough") >= 0)
            finaltext = finaltext["strikethrough"];
    }
    return finaltext;
};
var _log = function (log, options) {
    var finaltext = _textformater(log, options);
    fs_1["default"].appendFileSync(_filepath, log + "\n");
    var DraftLogStored = console.draft(finaltext);
    return function (log, options) {
        DraftLogStored(_textformater(log, options));
    };
};
var loggerModule = function (filepath) {
    _filepath = filepath;
    (0, draftlog_1["default"])(console);
    colors_1["default"].enable();
    fs_1["default"].writeFileSync(filepath, ''); // clear log file
    return {
        log: _log,
        log_options: function () {
            var LogsPreConfigs = {
                "critical": { textColor: "white", backgroundColor: "bgBrightRed", styles: ["bold"] },
                "error": { textColor: "red", styles: ["bold"] },
                "warn": { textColor: "yellow" },
                "info": { textColor: "green" },
                "loading": {}
            };
            return LogsPreConfigs;
        }
    };
};
exports.loggerModule = loggerModule;

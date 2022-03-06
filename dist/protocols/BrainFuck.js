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
exports.BrainFuckModule = exports.VerifyDataOrigin = void 0;
var crypto_1 = require("crypto");
var dns_1 = require("dns");
var app_1 = require("../app");
var utils_1 = require("../sources/utils");
var enableroute = ["app._cert"];
var logger, dns;
var ResolvePublicKey = function (domain_zone) { return __awaiter(void 0, void 0, void 0, function () {
    var err, publicKey, data, DNS_data_parse, PublicKeyRaw;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!(enableroute.indexOf(domain_zone) >= 0)) return [3 /*break*/, 1];
                err = new Error("[BrainFuck] Invalide DNS zone");
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, dns.resolveTxt(domain_zone + ".astroclient.net")];
            case 2:
                data = _a.sent();
                DNS_data_parse = data[0].join('');
                PublicKeyRaw = DNS_data_parse.split(';')[0].split("=")[1];
                publicKey = (0, crypto_1.createPublicKey)({
                    key: Buffer.from(PublicKeyRaw, 'base64'),
                    type: "spki",
                    format: "der"
                });
                _a.label = 3;
            case 3: return [2 /*return*/, { err: err, publicKey: publicKey }];
        }
    });
}); };
var VerifyDataOrigin = function (data, signature) { return __awaiter(void 0, void 0, void 0, function () {
    var err, certified, response, verify;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ResolvePublicKey("app._cert")];
            case 1:
                response = _a.sent();
                if (!response.err && response.publicKey) {
                    verify = (0, crypto_1.createVerify)("SHA256");
                    verify.update(data);
                    verify.end();
                    certified = verify.verify(response.publicKey, signature);
                }
                else
                    err = response.err;
                return [2 /*return*/, { err: err, certified: certified }];
        }
    });
}); };
exports.VerifyDataOrigin = VerifyDataOrigin;
var getBrainFuckFomat = function (plaintext) {
    var err, BrainFuckFormat;
    var pem = Buffer.from(plaintext, 'base64').toString('ascii');
    var data = pem.split("--------ConfigDataStart--------\n")[1].split("\n--------ConfigDataEnd--------")[0];
    var signature = pem.split("--------SignatureStart--------\n")[1].split("\n--------SignatureEnd--------")[0];
    if (data && signature) {
        BrainFuckFormat = {
            "data": data,
            "signature": Buffer.from(signature, 'base64')
        };
    }
    else {
        err = new Error("[BrainFuck] Invalide BrainFuck Data Format");
    }
    return { err: err, BrainFuckFormat: BrainFuckFormat };
};
var loadCertifiedRemoteData = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var err, data, URLreponse, FormaterResponse, BrainFuckResponse, DataOriginCertifier;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.getUrlData)(url)];
            case 1:
                URLreponse = _a.sent();
                if (!(URLreponse.err == undefined)) return [3 /*break*/, 5];
                FormaterResponse = getBrainFuckFomat(URLreponse.data);
                if (!(FormaterResponse.err == null && FormaterResponse.BrainFuckFormat)) return [3 /*break*/, 3];
                BrainFuckResponse = FormaterResponse.BrainFuckFormat;
                return [4 /*yield*/, (0, exports.VerifyDataOrigin)(BrainFuckResponse.data, BrainFuckResponse.signature)];
            case 2:
                DataOriginCertifier = _a.sent();
                if (!DataOriginCertifier.err && DataOriginCertifier.certified) {
                    data = Buffer.from(BrainFuckResponse.data, 'base64').toString('ascii');
                }
                else
                    (err == undefined) ? err = new Error("[BrainFuck] Signature Error, Emitter not cert.") : err = DataOriginCertifier.err;
                return [3 /*break*/, 4];
            case 3:
                err = FormaterResponse.err;
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err = URLreponse.err;
                _a.label = 6;
            case 6: return [2 /*return*/, { err: err, data: data }];
        }
    });
}); };
var loadCertifiedLocalData = function (plaintext) { return __awaiter(void 0, void 0, void 0, function () {
    var err, data, FormaterResponse, BrainFuckResponse, DataOriginCertifier;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                FormaterResponse = getBrainFuckFomat(plaintext);
                if (!(FormaterResponse.err == null && FormaterResponse.BrainFuckFormat)) return [3 /*break*/, 2];
                BrainFuckResponse = FormaterResponse.BrainFuckFormat;
                return [4 /*yield*/, (0, exports.VerifyDataOrigin)(BrainFuckResponse.data, BrainFuckResponse.signature)];
            case 1:
                DataOriginCertifier = _a.sent();
                if (!DataOriginCertifier.err && DataOriginCertifier.certified) {
                    data = Buffer.from(BrainFuckResponse.data, 'base64').toString('ascii');
                }
                else
                    (err == undefined) ? err = new Error("[BrainFuck] Signature Error, Emitter not cert.") : err = DataOriginCertifier.err;
                return [3 /*break*/, 3];
            case 2:
                err = FormaterResponse.err;
                _a.label = 3;
            case 3: return [2 /*return*/, { err: err, data: data }];
        }
    });
}); };
var BrainFuckModule = function () {
    logger = (0, app_1.getLogger)();
    dns = new dns_1.promises.Resolver();
    return { loadCertifiedLocalData: loadCertifiedLocalData, loadCertifiedRemoteData: loadCertifiedRemoteData };
};
exports.BrainFuckModule = BrainFuckModule;

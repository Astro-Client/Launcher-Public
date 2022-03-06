"use strict";
exports.__esModule = true;
exports.InitProtocols = void 0;
var LayerBreaker_1 = require("./LayerBreaker");
var BrainFuck_1 = require("./BrainFuck");
var InitProtocols = function () {
    var Protocols = {
        BrainFuck: (0, BrainFuck_1.BrainFuckModule)(),
        LayerBreaker: (0, LayerBreaker_1.LayerBreakerModule)()
    };
    return Protocols;
};
exports.InitProtocols = InitProtocols;

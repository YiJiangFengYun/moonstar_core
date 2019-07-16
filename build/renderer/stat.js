"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stats = {
    drawCall: 0,
    costTime: 0,
    drawCallBuffer: [],
    drawCallBufferIndex: 0,
    costTimeBuffer: [],
    costTimeBufferIndex: 0,
    drawCallFrame: 0,
    costTimeFrame: 0,
    beginTime: 0,
    init: function (frameRate) {
        var bufferLen = Math.round(frameRate);
        exports.stats.costTimeBuffer.length = bufferLen;
        exports.stats.drawCallBuffer.length = bufferLen;
        exports.stats.costTimeBufferIndex = 0;
        exports.stats.drawCallBufferIndex = 0;
    },
    begin: function () {
        exports.stats.drawCallFrame = 0;
        exports.stats.costTimeFrame = 0;
        exports.stats.beginTime = new Date().getTime();
    },
    end: function () {
        // Get cost time of a frame.
        var now = new Date().getTime();
        exports.stats.costTimeFrame = now - exports.stats.beginTime;
        // Get the avarage values
        var costTimeBuffer = exports.stats.costTimeBuffer;
        var drawCallBuffer = exports.stats.drawCallBuffer;
        costTimeBuffer[exports.stats.costTimeBufferIndex % costTimeBuffer.length] = exports.stats.costTimeFrame;
        drawCallBuffer[exports.stats.drawCallBufferIndex % drawCallBuffer.length] = exports.stats.drawCallFrame;
        ++exports.stats.costTimeBufferIndex;
        ++exports.stats.drawCallBufferIndex;
        var len = Math.min(exports.stats.costTimeBufferIndex, costTimeBuffer.length);
        var total = 0;
        for (var i = 0; i < len; ++i) {
            total += costTimeBuffer[i];
        }
        exports.stats.costTime = total / len;
        len = Math.min(exports.stats.drawCallBufferIndex, drawCallBuffer.length);
        total = 0;
        for (var i = 0; i < len; ++i) {
            total += drawCallBuffer[i];
        }
        exports.stats.drawCall = Math.round(total / len);
    },
    addDrawCall: function () {
        exports.stats.drawCallFrame += 1;
    }
};
//# sourceMappingURL=stat.js.map
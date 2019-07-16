"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueueArrayFixed = /** @class */ (function () {
    function QueueArrayFixed(capacity) {
        if (capacity === void 0) { capacity = 0; }
        this._contents = [];
        this._start = 0;
        this._end = 0;
        this._capacity = 0;
        this._length = 0;
        this._capacity = capacity;
        this._contents.length = capacity;
        this._length = 0;
    }
    QueueArrayFixed.prototype.back = function () {
        if (!this._length)
            return undefined;
        return this._contents[this._end - 1];
    };
    QueueArrayFixed.prototype.front = function () {
        if (!this._length)
            return undefined;
        return this._contents[this._start];
    };
    QueueArrayFixed.prototype.push = function (item) {
        var capacity = this._capacity;
        var contents = this._contents;
        var end = this._end;
        var length = this._length;
        contents[end] = item;
        ++length;
        end = (end + 1) % capacity;
        if (length > capacity) {
            //Not change length.
            //Change start and end.
            this._end = end;
            this._start = end;
        }
        else {
            this._length = length;
            this._end = end;
        }
    };
    QueueArrayFixed.prototype.pop = function () {
        if (this._length > 0) {
            var start = this._start;
            var item = this._contents[start];
            this._start = (start + 1) % this._capacity;
            --this._length;
            return item;
        }
        else {
            return undefined;
        }
    };
    QueueArrayFixed.prototype.empty = function () {
        this._start = 0;
        this._end = 0;
        this._length = 0;
    };
    QueueArrayFixed.prototype.getItem = function (index) {
        if (index >= this._length) {
            return undefined;
        }
        else {
            index = (this._start + index) % this._capacity;
            return this._contents[index];
        }
    };
    Object.defineProperty(QueueArrayFixed.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueueArrayFixed.prototype, "capacity", {
        get: function () {
            return this._capacity;
        },
        enumerable: true,
        configurable: true
    });
    return QueueArrayFixed;
}());
exports.QueueArrayFixed = QueueArrayFixed;
//# sourceMappingURL=queue_array_fixed.js.map
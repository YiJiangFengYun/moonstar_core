export class QueueArrayFixed<T> {
    private _contents: T[] = [];
    private _start: number = 0;
    private _end: number = 0;
    private _capacity: number = 0;
    private _length: number = 0;

    public constructor(capacity: number = 0) {
        this._capacity = capacity;
        this._contents.length = capacity;
        this._length = 0;
    }

    public back(): T {
        if (! this._length) return undefined;
        return this._contents[this._end - 1];
    }

    public front(): T {
        if (! this._length) return undefined;
        return this._contents[this._start];
    }

    public push(item: T) {
        let capacity = this._capacity;
        let contents = this._contents;
        let end = this._end;
        let length = this._length;
        contents[end] = item;
        ++length;
        end = (end + 1) % capacity;
        if (length > capacity) {
            //Not change length.
            //Change start and end.
            this._end = end;
            this._start = end;
        } else {
            this._length = length;
            this._end = end;
        }
    }

    public pop(): T {
        if (this._length > 0) {
            let start = this._start;
            let item = this._contents[start];
            this._start = (start + 1) % this._capacity;
            --this._length;
            return item;
        } else {
            return undefined;
        }
    }

    public empty() {
        this._start = 0;
        this._end = 0;
        this._length = 0;
    }

    public getItem(index: number): T {
        if (index >= this._length) {
            return undefined;
        } else {
            index = (this._start + index) % this._capacity;
            return this._contents[index];
        }
    }

    public get length() {
        return this._length;
    }

    public get capacity(): number {
        return this._capacity;
    }

}
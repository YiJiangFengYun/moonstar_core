export declare class QueueArrayFixed<T> {
    private _contents;
    private _start;
    private _end;
    private _capacity;
    private _length;
    constructor(capacity?: number);
    back(): T;
    front(): T;
    push(item: T): void;
    pop(): T;
    empty(): void;
    getItem(index: number): T;
    get length(): number;
    get capacity(): number;
}

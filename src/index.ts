import { Readable } from 'stream';

export class BufferStream extends Readable {
    private _buffer: Buffer | null;

    public constructor(buffer: Buffer, encoding?: BufferEncoding) {
        super({ encoding });
        this._buffer = buffer;
    }

    public _read(): void {
        this.push(this._buffer);
        this._buffer = null;
    }
}

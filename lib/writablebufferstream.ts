import { Writable } from 'node:stream';

export class WritableBufferStream extends Writable {
    private _buffer: Buffer | null = null;

    public override _write(chunk: unknown, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
        let buf: Buffer | undefined;
        if (Buffer.isBuffer(chunk)) {
            buf = chunk;
        } else if (chunk !== undefined && chunk !== null) {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            buf = Buffer.from(`${chunk}`, encoding);
        }

        if (buf) {
            this._buffer = Buffer.concat([this._buffer, buf].filter(Boolean) as Buffer[]);
        }

        callback();
    }

    public writeP(chunk: unknown, encoding?: BufferEncoding): Promise<void> {
        return new Promise((resolve, reject) => {
            const callback = (err?: Error | null): void => {
                // istanbul ignore if
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            };

            if (encoding !== undefined) {
                this.write(chunk, encoding, callback);
            } else {
                this.write(chunk, callback);
            }
        });
    }

    public clear(): void {
        this._buffer = null;
    }

    public override toString(): string {
        return this._buffer ? this._buffer.toString() : '';
    }
}

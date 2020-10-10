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

export function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    const chunks: Buffer[] = [];
    return new Promise<Buffer>((resolve, reject) => {
        stream.once('error', reject);
        stream.on('data', (chunk: Buffer) => chunks.push(chunk));
        stream.once('end', () => resolve(Buffer.concat(chunks)));
    });
}

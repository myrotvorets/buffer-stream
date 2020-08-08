import fs from 'fs';
import { Readable } from 'stream';
import { promisify } from 'util';
import { BufferStream, streamToBuffer } from '../';

const error = new Error('путин - хуйло');
const readFile = promisify(fs.readFile);

class FailingStream extends Readable {
    public _read(): void {
        this.emit('error', error);
    }
}

describe('BufferStream', (): void => {
    it('should convert a Buffer into a ReadableStream', (): Promise<unknown> => {
        const buf = Buffer.from('123');
        const stream = new BufferStream(buf);

        return expect(streamToBuffer(stream)).resolves.toStrictEqual(buf);
    });
});

describe('streamToBuffer', (): void => {
    it('should reject on stream faulres', (): Promise<unknown> => {
        const stream = new FailingStream();
        return expect(streamToBuffer(stream)).rejects.toStrictEqual(error);
    });

    it('should produce the same result as readFile', async () => {
        const expected = await readFile(__filename);
        const stream = fs.createReadStream(__filename);
        return expect(streamToBuffer(stream)).resolves.toStrictEqual(expected);
    });
});

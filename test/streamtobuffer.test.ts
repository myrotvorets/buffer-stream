import { createReadStream, promises } from 'node:fs';
import { Readable } from 'node:stream';
import { streamToBuffer } from '../lib';

const error = new Error('путин - хуйло');

class FailingStream extends Readable {
    public override _read(): void {
        this.emit('error', error);
    }
}

describe('streamToBuffer', (): void => {
    it('should reject on stream faulres', (): Promise<unknown> => {
        const stream = new FailingStream();
        return expect(streamToBuffer(stream)).rejects.toStrictEqual(error);
    });

    it('should produce the same result as readFile', async () => {
        const expected = await promises.readFile(__filename);
        const stream = createReadStream(__filename);
        return expect(streamToBuffer(stream)).resolves.toStrictEqual(expected);
    });
});

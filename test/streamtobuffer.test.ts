import { createReadStream, promises } from 'node:fs';
import { Readable } from 'node:stream';
import { streamToBuffer } from '../lib';

import './types';

const error = new Error('путин - хуйло');

class FailingStream extends Readable {
    public override _read(): void {
        this.emit('error', error);
    }
}

describe('streamToBuffer', function () {
    it('should reject on stream faulres', function () {
        const stream = new FailingStream();
        return streamToBuffer(stream).then(
            () => expect.fail('should not resolve'),
            (err) => expect(err).to.equal(error),
        );
    });

    it('should produce the same result as readFile', async function () {
        const expected = await promises.readFile(__filename);
        const stream = createReadStream(__filename);
        return streamToBuffer(stream).then((result) => expect(result).to.deep.equal(expected));
    });
});

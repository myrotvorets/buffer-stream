import { createReadStream, promises } from 'node:fs';
import { Readable } from 'node:stream';
import { expect } from 'chai';
import { streamToBuffer } from '../lib';

const error = new Error('путин - хуйло');

class FailingStream extends Readable {
    public override _read(): void {
        this.emit('error', error);
    }
}

describe('streamToBuffer', function () {
    it('should reject on stream faulres', function () {
        const stream = new FailingStream();
        return expect(streamToBuffer(stream)).to.be.eventually.rejectedWith(error);
    });

    it('should produce the same result as readFile', async function () {
        const expected = await promises.readFile(__filename);
        const stream = createReadStream(__filename);
        return expect(streamToBuffer(stream)).to.become(expected);
    });
});

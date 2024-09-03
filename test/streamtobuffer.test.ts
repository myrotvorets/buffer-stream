import { describe, it } from 'node:test';
import { deepEqual, equal, fail } from 'node:assert/strict';
import { createReadStream, promises } from 'node:fs';
import { Readable } from 'node:stream';
import { streamToBuffer } from '../lib';

const error = new Error('путин - хуйло');

class FailingStream extends Readable {
    public override _read(): void {
        this.emit('error', error);
    }
}

void describe('streamToBuffer', async () => {
    await it('should reject on stream faulres', () => {
        const stream = new FailingStream();
        return streamToBuffer(stream).then(
            () => {
                fail('should not resolve');
            },
            (err: unknown) => {
                equal(err, error);
            },
        );
    });

    await it('should produce the same result as readFile', async () => {
        const expected = await promises.readFile(__filename);
        const stream = createReadStream(__filename);
        const result = await streamToBuffer(stream);
        deepEqual(result, expected);
    });
});

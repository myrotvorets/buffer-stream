import { describe, it } from 'node:test';
import { deepEqual } from 'node:assert/strict';
import { BufferStream, streamToBuffer } from '../lib';

void describe('BufferStream', async () => {
    await it('should convert a Buffer into a ReadableStream', async () => {
        const buf = Buffer.from('123');
        const stream = new BufferStream(buf);
        const result = await streamToBuffer(stream);
        deepEqual(result, buf);
    });
});

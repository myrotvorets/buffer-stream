import { expect } from 'chai';
import { BufferStream, streamToBuffer } from '../lib';

describe('BufferStream', function (): void {
    it('should convert a Buffer into a ReadableStream', function () {
        const buf = Buffer.from('123');
        const stream = new BufferStream(buf);

        return expect(streamToBuffer(stream)).to.become(buf);
    });
});

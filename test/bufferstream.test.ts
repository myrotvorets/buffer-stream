import { BufferStream, streamToBuffer } from '../lib';

import './types';

describe('BufferStream', function (): void {
    it('should convert a Buffer into a ReadableStream', function () {
        const buf = Buffer.from('123');
        const stream = new BufferStream(buf);

        return streamToBuffer(stream).then((result) => expect(result).to.deep.equal(buf));
    });
});

import { BufferStream, streamToBuffer } from '../lib';

describe('BufferStream', (): void => {
    it('should convert a Buffer into a ReadableStream', (): Promise<unknown> => {
        const buf = Buffer.from('123');
        const stream = new BufferStream(buf);

        return expect(streamToBuffer(stream)).resolves.toStrictEqual(buf);
    });
});

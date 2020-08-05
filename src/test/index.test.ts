import { Readable } from 'stream';
import { BufferStream } from '../';

function streamToString(stream: Readable): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let data = '';
        stream.on('data', (chunk) => (data += `${chunk}`));
        stream.on('end', () => resolve(data));
        stream.on('error', (e) => reject(e));
    });
}

describe('BufferStream', (): void => {
    it('should convert a Buffer into a ReadableStream', (): Promise<unknown> => {
        const data = '123';
        const buf = Buffer.from(data);
        const stream = new BufferStream(buf);

        return expect(streamToString(stream)).resolves.toBe(data);
    });
});

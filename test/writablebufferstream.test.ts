import { WritableBufferStream } from '../lib';

describe('WritableBufferStream', (): void => {
    it.each([true, false])(
        'should pass the basic test (decodeStrings is %s)',
        async (decodeStrings: boolean): Promise<unknown> => {
            const stream = new WritableBufferStream({ decodeStrings });
            const expected = 'test';

            await stream.writeP(expected);
            return expect(stream.toString()).toStrictEqual(expected);
        },
    );

    it.each([true, false])('should concat multiple buffers correctly (decodeStrings is %s)', async (decodeStrings) => {
        const data = ['This ', 'is ', 'a ', 'test'];
        const expected = data.join('');
        const stream = new WritableBufferStream({ decodeStrings });

        for (const chunk of data) {
            // eslint-disable-next-line no-await-in-loop
            await stream.writeP(chunk, 'ascii');
        }

        return expect(stream.toString()).toStrictEqual(expected);
    });

    it('should delete the buffer on clear()', async () => {
        const stream = new WritableBufferStream();
        const expected = 'test';

        await stream.writeP(expected);
        expect(stream.toString()).toStrictEqual(expected);

        stream.clear();
        expect(stream.toString()).toStrictEqual('');
    });

    // Attempt to write a `null` will result in `TypeError [ERR_STREAM_NULL_VALUES]: May not write null values to stream`
    it('should ignore write(undefined)', async () => {
        const stream = new WritableBufferStream({ decodeStrings: false, objectMode: true });
        const expected = '';

        await stream.writeP(undefined);
        return expect(stream.toString()).toStrictEqual(expected);
    });
});

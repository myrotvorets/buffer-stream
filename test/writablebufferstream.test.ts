import { describe, it } from 'node:test';
import { equal } from 'node:assert/strict';
import { WritableBufferStream } from '../lib/index';

void describe('WritableBufferStream', async () => {
    await it('should have the initial buffer as null', () => {
        const stream = new WritableBufferStream();
        equal(stream.buffer, null);
    });

    const basicTest = async (decodeStrings: boolean): Promise<void> => {
        const stream = new WritableBufferStream({ decodeStrings });
        const expected = 'test';

        await stream.writeP(expected);
        equal(stream.toString(), expected);
    };

    const concatTest = async (decodeStrings: boolean): Promise<void> => {
        const data = ['This ', 'is ', 'a ', 'test'];
        const expected = data.join('');
        const stream = new WritableBufferStream({ decodeStrings });

        for (const chunk of data) {
            // eslint-disable-next-line no-await-in-loop
            await stream.writeP(chunk, 'ascii');
        }

        equal(stream.toString(), expected);
    };

    await it(`should pass the basic test (decodeStrings is true)`, () => basicTest(true));
    await it(`should pass the basic test (decodeStrings is false)`, () => basicTest(false));
    await it(`should concat multiple buffers correctly (decodeStrings is true)`, () => concatTest(true));
    await it(`should concat multiple buffers correctly (decodeStrings is false)`, () => concatTest(false));

    await it('should delete the buffer on clear()', async () => {
        const stream = new WritableBufferStream();
        const expected = 'test';

        await stream.writeP(expected);
        equal(stream.toString(), expected);

        stream.clear();
        equal(stream.toString(), '');
    });

    // Attempt to write a `null` will result in `TypeError [ERR_STREAM_NULL_VALUES]: May not write null values to stream`
    await it('should ignore write(undefined)', async () => {
        const stream = new WritableBufferStream({ decodeStrings: false, objectMode: true });
        const expected = '';

        await stream.writeP(undefined);
        equal(stream.toString(), expected);
    });
});

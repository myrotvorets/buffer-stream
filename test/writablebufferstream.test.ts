import { expect } from 'chai';
import { WritableBufferStream } from '../lib';

describe('WritableBufferStream', function (): void {
    it('should have the initial buffer as null', function () {
        const stream = new WritableBufferStream();
        expect(stream.buffer).to.be.null;
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    [true, false].forEach((decodeStrings) =>
        it(`should pass the basic test (decodeStrings is ${decodeStrings})`, async function () {
            const stream = new WritableBufferStream({ decodeStrings });
            const expected = 'test';

            await stream.writeP(expected);
            return expect(stream.toString()).to.equal(expected);
        }),
    );

    // eslint-disable-next-line mocha/no-setup-in-describe
    [true, false].forEach((decodeStrings) =>
        it(`should concat multiple buffers correctly (decodeStrings is ${decodeStrings})`, async function () {
            const data = ['This ', 'is ', 'a ', 'test'];
            const expected = data.join('');
            const stream = new WritableBufferStream({ decodeStrings });

            for (const chunk of data) {
                // eslint-disable-next-line no-await-in-loop
                await stream.writeP(chunk, 'ascii');
            }

            return expect(stream.toString()).to.equal(expected);
        }),
    );

    it('should delete the buffer on clear()', async function () {
        const stream = new WritableBufferStream();
        const expected = 'test';

        await stream.writeP(expected);
        expect(stream.toString()).to.equal(expected);

        stream.clear();
        expect(stream.toString()).to.equal('');
    });

    // Attempt to write a `null` will result in `TypeError [ERR_STREAM_NULL_VALUES]: May not write null values to stream`
    it('should ignore write(undefined)', async function () {
        const stream = new WritableBufferStream({ decodeStrings: false, objectMode: true });
        const expected = '';

        await stream.writeP(undefined);
        return expect(stream.toString()).to.equal(expected);
    });
});

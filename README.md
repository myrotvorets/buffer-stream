# buffer-stream

![Build and Test CI](https://github.com/myrotvorets/buffer-stream/workflows/Build%20and%20Test%20CI/badge.svg)

Converts a Buffer into a Readable Stream.

Since 1.1.0 provides a helper to read the entire stream into a Buffer.

## Usage

```js
import { BufferStream, streamToBuffer } from '@myrotvorets/buffer-stream';

// BufferStream
const buf = Buffer.from('123');
const stream = new BufferStream(buf);

// streamToBuffer
streamToBuffer(stream).then((buffer) => { /* ... */ })
```

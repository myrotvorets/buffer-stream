# buffer-stream

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=myrotvorets_buffer-stream&metric=alert_status)](https://sonarcloud.io/dashboard?id=myrotvorets_buffer-stream)
![Build and Test CI](https://github.com/myrotvorets/buffer-stream/workflows/Build%20and%20Test%20CI/badge.svg)
[![codebeat badge](https://codebeat.co/badges/f1ec5c28-97fe-470b-b035-8a1d475d9efc)](https://codebeat.co/projects/github-com-myrotvorets-buffer-stream-master)

Converts a Buffer into a Readable Stream.

Since 1.1.0 provides a helper to read the entire stream into a Buffer.

Since 1.3.0 provides a writable stream that stores the result in a buffer.

## Usage

```js
import { BufferStream, WritableBufferStream, streamToBuffer } from '@myrotvorets/buffer-stream';

// BufferStream
const buf = Buffer.from('123');
const stream = new BufferStream(buf);

// streamToBuffer
streamToBuffer(stream).then((buffer) => { /* ... */ })

// WritableBufferStream
const stream = new WritableBufferStream();
stream.write('something', (err) => {
    if (!err) {
        console.log(stream.toString());

        stream.clear(); // Clear the internal buffer
    }
});

await stream.writeP('something else');
```

See the `test` directory for usage examples.

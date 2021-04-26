export function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    const chunks: Buffer[] = [];
    return new Promise<Buffer>((resolve, reject) => {
        stream.once('error', reject);
        stream.on('data', (chunk: Buffer) => chunks.push(chunk));
        stream.once('end', () => resolve(Buffer.concat(chunks)));
    });
}

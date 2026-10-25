/**
 * The little of the zip format a `.nitro` archive uses, read with the platform's own inflater
 * (`DecompressionStream('deflate-raw')`).
 *
 * This replaces JSZip, which cost ~95 KiB of the always-loaded renderer chunk - it and its `pako`
 * inflater are a full read/write implementation of a format the client only ever reads, and only
 * ever in its plainest form: no encryption, no multi-disk, no ZIP64, a few dozen entries.
 *
 * The layout, for the reader below: entries are listed in a central directory at the end of the
 * file, which an "end of central directory" record points at. Each listing gives the compression
 * method and the offset of that entry's local header, and the local header (whose own name and
 * extra-field lengths may differ from the listing's) is followed by the bytes.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';

const SIGNATURE_END_OF_CENTRAL_DIRECTORY = 0x06054b50;
const SIGNATURE_CENTRAL_FILE = 0x02014b50;
const SIGNATURE_LOCAL_FILE = 0x04034b50;

const END_OF_CENTRAL_DIRECTORY_SIZE = 22;
const CENTRAL_FILE_SIZE = 46;
const LOCAL_FILE_SIZE = 30;

const METHOD_STORED = 0;
const METHOD_DEFLATED = 8;

const TEXT_DECODER = new TextDecoder('utf-8');

export interface ZipEntry {
    name: string;
    /** The entry's contents, inflated on demand. */
    bytes(): Promise<Uint8Array>;
    /** The same, straight into a `Blob` - one fewer copy for something that only feeds a decoder. */
    blob(type?: string): Promise<Blob>;
}

/**
 * The end of central directory record. It is last in the file, but a trailing comment may follow
 * it, so the tail is scanned backwards for its signature - the comment can be 64 KiB at most.
 */
const findEndOfCentralDirectory = (view: DataView): number | undefined => {
    const earliest = Math.max(0, view.byteLength - END_OF_CENTRAL_DIRECTORY_SIZE - 0xffff);

    for (let offset = view.byteLength - END_OF_CENTRAL_DIRECTORY_SIZE; offset >= earliest; offset--) {
        if (view.getUint32(offset, true) === SIGNATURE_END_OF_CENTRAL_DIRECTORY) return offset;
    }

    return undefined;
};

const inflateRaw = (bytes: Uint8Array): ReadableStream<Uint8Array> => new Blob([ bytes as BlobPart ])
    .stream()
    .pipeThrough(new DecompressionStream('deflate-raw'));

/**
 * Every file in the archive, in central-directory order. Throws when the buffer is not a zip;
 * a single unreadable entry is skipped with a log rather than failing the archive, which is how
 * `NitroBundle` has always treated one.
 */
export const readZipEntries = (data: ArrayBuffer): ZipEntry[] => {
    const view = new DataView(data);
    const bytes = new Uint8Array(data);
    const end = findEndOfCentralDirectory(view);

    if (end === undefined) throw new Error('Not a zip archive: no end of central directory record');

    const count = view.getUint16(end + 10, true);
    const entries: ZipEntry[] = [];

    let offset = view.getUint32(end + 16, true);

    for (let index = 0; index < count; index++) {
        if (((offset + CENTRAL_FILE_SIZE) > view.byteLength) || (view.getUint32(offset, true) !== SIGNATURE_CENTRAL_FILE)) {
            NitroLogger.error(`Zip central directory ended early, at entry ${index} of ${count}`);
            break;
        }

        const method = view.getUint16(offset + 10, true);
        const compressedSize = view.getUint32(offset + 20, true);
        const nameLength = view.getUint16(offset + 28, true);
        const extraLength = view.getUint16(offset + 30, true);
        const commentLength = view.getUint16(offset + 32, true);
        const localOffset = view.getUint32(offset + 42, true);
        const name = TEXT_DECODER.decode(bytes.subarray(offset + CENTRAL_FILE_SIZE, offset + CENTRAL_FILE_SIZE + nameLength));

        offset += CENTRAL_FILE_SIZE + nameLength + extraLength + commentLength;

        // A directory is a zero-length entry, and carries nothing anyone here wants.
        if (name.endsWith('/')) continue;

        if (view.getUint32(localOffset, true) !== SIGNATURE_LOCAL_FILE) {
            NitroLogger.error(`Zip entry has no local header: ${name}`);
            continue;
        }

        // The local header repeats the name and extra field, at its own lengths.
        const start = localOffset + LOCAL_FILE_SIZE + view.getUint16(localOffset + 26, true) + view.getUint16(localOffset + 28, true);
        const raw = bytes.subarray(start, start + compressedSize);

        if ((method !== METHOD_STORED) && (method !== METHOD_DEFLATED)) {
            NitroLogger.error(`Zip entry uses unsupported compression method ${method}: ${name}`);
            continue;
        }

        entries.push({
            name,
            bytes: async () => (method === METHOD_STORED ? raw : new Uint8Array(await new Response(inflateRaw(raw)).arrayBuffer())),
            blob: async (type?: string) => (method === METHOD_STORED
                ? new Blob([ raw ], { type })
                : await new Response(inflateRaw(raw), type ? { headers: { 'content-type': type } } : undefined).blob()),
        });
    }

    return entries;
};

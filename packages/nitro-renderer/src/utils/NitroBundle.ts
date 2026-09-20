import { NitroLogger } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { TextureUtils } from './TextureUtils';
import { readZipEntries } from './ZipArchive';

/**
 * One `.nitro` archive, read out: its JSON entries parsed, its PNG entries decoded to textures,
 * anything else kept as bytes.
 *
 * What it holds on to afterwards is deliberate. A bundle the `AssetManager` throws away after
 * building its collection (furniture, pets, figures) takes everything with it, but a UI bundle it
 * retains would otherwise keep a second, compressed copy of every bitmap for the session - ~2.6 MB
 * across the client's bundles, for nothing. So encoded image bytes are kept only when
 * `keepImageBytes` says the DOM render target is in use, since that one cannot draw a `Texture`
 * and needs a `blob:` URL per bitmap; and `releaseData` drops whatever a consumer has finished
 * with (the `.ttf` faces once `FontFace` has them, a table once it has been read).
 */
export class NitroBundle {
    private static TEXT_DECODER: TextDecoder = new TextDecoder('utf-8');

    private _files: { [key: string]: object } = {};
    private _textures: { [key: string]: Texture } = {};
    private _blobs: { [key: string]: Blob } = {};
    private _binaries: { [key: string]: ArrayBuffer } = {};
    private _objectUrls: { [key: string]: string } = {};

    /**
     * @param keepImageBytes keeps each PNG's encoded bytes so `getObjectUrl` can hand out a
     * `blob:` URL for it. Only the DOM render target needs that; Pixi draws the texture.
     */
    public static async fromBuffer(data: ArrayBuffer, keepImageBytes: boolean = false): Promise<NitroBundle> {
        const bundle = new NitroBundle();

        for (const entry of readZipEntries(data)) {
            try {
                const name = entry.name;

                switch (name.slice(name.lastIndexOf('.') + 1)) {
                    case 'json': {
                        bundle.files[name] = JSON.parse(NitroBundle.TEXT_DECODER.decode(await entry.bytes()));
                        break;
                    }
                    case 'png': {
                        // A blob goes to the image decoder directly - one fewer copy of the sheet at the load peak.
                        const blob = await entry.blob('image/png');

                        if (keepImageBytes) bundle.blobs[name] = blob;

                        bundle.textures[name] = await TextureUtils.textureFromEncodedBytes(blob, 'image/png', name);
                        break;
                    }
                    default: {
                        // Anything else is carried through as bytes for whoever asked for the
                        // bundle - the font faces `FontFace` is constructed from, and the like.
                        bundle.binaries[name] = (await entry.bytes()).buffer as ArrayBuffer;
                        break;
                    }
                }
            } catch (err) {
                NitroLogger.error(err);
            }
        }

        return bundle;
    }

    /**
     * A `blob:` URL for one of the bundle's PNG entries, created on first ask and kept for the
     * session - the DOM target's only way to reference a bundled bitmap from CSS. `undefined`
     * under Pixi, which never asks: the bytes behind it are not retained there.
     */
    public getObjectUrl(name: string): string | undefined {
        const existing = this._objectUrls[name];

        if (existing) return existing;

        const bytes = this._binaries[name];
        const blob = this._blobs[name] ?? (bytes ? new Blob([ bytes ]) : undefined);

        if (!blob) return undefined;

        const url = URL.createObjectURL(blob);

        this._objectUrls[name] = url;

        return url;
    }

    /**
     * Drops the parsed tables and carried bytes a consumer has finished reading. The textures
     * stay, and so do the encoded image bytes - under Pixi those were never kept, and under DOM
     * they are what `getObjectUrl` serves for the rest of the session. What is dropped is gone:
     * call it once, from the code that owns the bundle, after it has taken what it needs.
     */
    public releaseData(): void {
        this._files = {};
        this._binaries = {};
    }

    public get files(): { [key: string]: object } {
        return this._files;
    }

    public get textures(): { [key: string]: Texture } {
        return this._textures;
    }

    public get blobs(): { [key: string]: Blob } {
        return this._blobs;
    }

    public get binaries(): { [key: string]: ArrayBuffer } {
        return this._binaries;
    }
}

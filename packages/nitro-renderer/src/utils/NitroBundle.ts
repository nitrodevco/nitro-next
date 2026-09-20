import { NitroLogger } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { TextureUtils } from './TextureUtils';
import { readZipEntries } from './ZipArchive';

/**
 * One `.nitro` archive, read out: its JSON entries parsed, its PNG entries decoded to textures,
 * anything else kept as bytes.
 *
 * What it holds on to afterwards is deliberate. A bundle the `AssetManager` throws away after
 * building its collection (furniture, pets, figures) takes everything with it; a UI bundle it
 * retains keeps only what someone still reads - the decoded textures, and whatever `releaseData`
 * has not yet dropped (the `.ttf` faces until `FontFace` has them, a table until it is read).
 * An encoded bitmap is never kept: the renderer draws the `Texture`.
 */
export class NitroBundle {
    private static TEXT_DECODER: TextDecoder = new TextDecoder('utf-8');

    private _files: { [key: string]: object } = {};
    private _textures: { [key: string]: Texture } = {};
    private _binaries: { [key: string]: ArrayBuffer } = {};

    public static async fromBuffer(data: ArrayBuffer): Promise<NitroBundle> {
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
                        bundle.textures[name] = await TextureUtils.textureFromEncodedBytes(await entry.blob('image/png'), 'image/png', name);
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
     * Drops the parsed tables and carried bytes a consumer has finished reading; the textures
     * stay. What is dropped is gone: call it once, from the code that owns the bundle, after it
     * has taken what it needs.
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

    public get binaries(): { [key: string]: ArrayBuffer } {
        return this._binaries;
    }
}

import { NitroLogger } from '@nitrodevco/nitro-api';
import type JSZip from 'jszip';
import { Texture } from 'pixi.js';

import { TextureUtils } from './TextureUtils';

export class NitroBundle {
    private static TEXT_DECODER: TextDecoder = new TextDecoder('utf-8');

    private _files: { [key: string]: object } = {};
    private _textures: { [key: string]: Texture } = {};

    public static async fromZip(zip: JSZip): Promise<NitroBundle> {
        const bundle = new NitroBundle();

        for (const file of Object.values(zip.files)) {
            try {
                const name = file.name;

                switch (name.slice(name.lastIndexOf('.') + 1)) {
                    case 'json': {
                        bundle.files[name] = JSON.parse(NitroBundle.TEXT_DECODER.decode(await file.async('arraybuffer')));
                        break;
                    }
                    case 'png': {
                        bundle.textures[name] = await TextureUtils.textureFromEncodedBytes(await file.async('uint8array'), 'image/png', name);
                        break;
                    }
                }
            } catch (err) {
                NitroLogger.error(err);
            }
        }

        return bundle;
    }

    public get files(): { [key: string]: object } {
        return this._files;
    }

    public get textures(): { [key: string]: Texture } {
        return this._textures;
    }
}

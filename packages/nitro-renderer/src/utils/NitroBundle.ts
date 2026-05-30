import { NitroLogger } from '@nitrodevco/nitro-api';
import type JSZip from 'jszip';
import type { Texture } from 'pixi.js';
import { Assets } from 'pixi.js';

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
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        bundle.files[name] = JSON.parse(NitroBundle.TEXT_DECODER.decode(await file.async('arraybuffer')));
                        break;
                    }
                    case 'png': {
                        const data = await file.async('base64');

                        bundle.textures[name] = await Assets.load<Texture>(`data:image/png;base64,${data}`);
                        break;
                    }
                }
            }
            catch (err) {
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

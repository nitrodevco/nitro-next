import { BinaryReader } from '@nitrodevco/nitro-shared';
import { inflate } from 'pako';
import type { Texture } from 'pixi.js';
import { Assets } from 'pixi.js';

export class NitroBundle
{
    private static TEXT_DECODER: TextDecoder = new TextDecoder('utf-8');

    private _jsonFile: object | undefined = undefined;
    private _texture: Texture | undefined = undefined;

    public static async from(buffer: ArrayBuffer): Promise<NitroBundle>
    {
        const bundle = new NitroBundle();

        await bundle.parse(buffer);

        return bundle;
    }

    public async parse(arrayBuffer: ArrayBuffer): Promise<void>
    {
        const binaryReader = new BinaryReader(arrayBuffer);

        let fileCount = binaryReader.readShort();

        while(fileCount > 0)
        {
            const fileNameLength = binaryReader.readShort();
            const fileName = binaryReader.readBytes(fileNameLength).toString();
            const fileLength = binaryReader.readInt();
            const buffer = binaryReader.readBytes(fileLength);
            const inflatedBuffer = inflate(buffer.toArrayBuffer());

            if(fileName.endsWith('.json'))
            {
                this._jsonFile = JSON.parse(NitroBundle.TEXT_DECODER.decode(inflatedBuffer));
            }
            else
            {
                const len = inflatedBuffer.byteLength;

                let binary = '';

                for(let i = 0; i < len; i++) (binary += String.fromCharCode(inflatedBuffer[i]));

                this._texture = await Assets.load<Texture>(`data:image/png;base64,${ window.btoa(binary) }`);
            }

            fileCount--;
        }
    }

    public get jsonFile(): object | undefined
    {
        return this._jsonFile;
    }

    public get texture(): Texture | undefined
    {
        return this._texture;
    }
}

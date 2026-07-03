import type { IAssetAvatarActivePartSet } from "@nitrodevco/nitro-api";

export class ActivePartSet {
    private _parts: string[];

    constructor(data: IAssetAvatarActivePartSet) {
        this._parts = [];

        if (data.activeParts && (data.activeParts.length > 0)) {
            for (const part of data.activeParts) {
                if (!part) continue;

                this._parts.push(part.setType);
            }
        }
    }

    public get parts(): string[] {
        return this._parts;
    }
}

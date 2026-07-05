import type { AvatarFigurePartType, IAssetAvatarActivePartSet } from "@nitrodevco/nitro-api";

export class ActivePartSet {
    private _parts: AvatarFigurePartType[];

    constructor(data: IAssetAvatarActivePartSet) {
        this._parts = [];

        if (data.activeParts && (data.activeParts.length > 0)) {
            for (const part of data.activeParts) {
                if (!part) continue;

                this._parts.push(part.setType);
            }
        }
    }

    public get parts(): AvatarFigurePartType[] {
        return this._parts;
    }
}

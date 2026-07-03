import type { IAssetAlias } from "@nitrodevco/nitro-api";

export class AssetAlias {
    private _name: string;
    private _link: string;
    private _flipH: boolean;
    private _flipV: boolean;

    constructor(name: string, alias: IAssetAlias) {
        this._name = name ?? '';
        this._link = alias.link ?? '';
        this._flipH = alias.flipH ?? false;
        this._flipV = alias.flipV ?? false;
    }

    public get name(): string {
        return this._name;
    }

    public get link(): string {
        return this._link;
    }

    public get flipH(): boolean {
        return this._flipH;
    }

    public get flipV(): boolean {
        return this._flipV;
    }
}

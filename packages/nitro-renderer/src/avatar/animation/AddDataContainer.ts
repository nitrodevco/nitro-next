import type { IAddDataContainer, IAssetAnimationAdd } from "@nitrodevco/nitro-api";

export class AddDataContainer implements IAddDataContainer {
    private _id: string;
    private _align: string;
    private _base: string;
    private _ink: number;
    private _blend: number;

    constructor(data: IAssetAnimationAdd) {
        this._id = data.id ?? '';
        this._align = data.align ?? '';
        this._base = data.base ?? '';
        this._ink = data.ink ?? 0;
        this._blend = 0;

        if (data.blend) {
            if (data.blend.length > 0) {
                let blend = parseInt(data.blend);

                if (blend > 1) blend = (blend / 100);

                this._blend = blend;
            }
        }
    }

    public get id(): string {
        return this._id;
    }

    public get align(): string {
        return this._align;
    }

    public get base(): string {
        return this._base;
    }

    public get ink(): number {
        return this._ink;
    }

    public get blend(): number {
        return this._blend;
    }

    public get isBlended(): boolean {
        return this._blend !== 1;
    }
}

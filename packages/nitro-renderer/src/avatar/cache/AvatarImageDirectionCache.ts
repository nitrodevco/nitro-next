import type { AvatarImageBodyPartContainer } from "../AvatarImageBodyPartContainer";
import type { AvatarImagePartContainer } from "../AvatarImagePartContainer";

export class AvatarImageDirectionCache {
    private _partList: AvatarImagePartContainer[];
    private _images: Map<string, AvatarImageBodyPartContainer> = new Map();

    constructor(parts: AvatarImagePartContainer[]) {
        this._partList = parts;
    }

    public dispose(): void {
        for (const image of this._images.values()) image?.dispose();

        this._images.clear();
    }

    public getImageContainer(k: number): AvatarImageBodyPartContainer | undefined {
        return this._images.get(this.getCacheKey(k));
    }

    public updateImageContainer(part: AvatarImageBodyPartContainer, frame: number): void {
        const name = this.getCacheKey(frame);

        const existing = this._images.get(name);

        if (existing) existing.dispose();

        this._images.set(name, part);
    }

    private getCacheKey(frame: number): string {
        let name = '';

        for (const part of this._partList) name = `${name}${part.getCacheableKey(frame)}/`;

        return name;
    }

    public getPartList(): AvatarImagePartContainer[] {
        return this._partList;
    }
}

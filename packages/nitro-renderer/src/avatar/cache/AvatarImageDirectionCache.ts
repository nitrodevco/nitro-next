import { AvatarImageBodyPartContainer } from '../AvatarImageBodyPartContainer';
import { AvatarImagePartContainer } from '../AvatarImagePartContainer';

export class AvatarImageDirectionCache {
    private static KEY_SEPARATOR: string = '/';
    private static NO_FRAMES_KEY: string = '-';

    private _partList: AvatarImagePartContainer[];
    private _images: Map<string, AvatarImageBodyPartContainer> = new Map();
    // the key for a frame never changes for a given part list, so it is built once
    private _keyCache: Map<number, string> = new Map();

    constructor(parts: AvatarImagePartContainer[]) {
        this._partList = parts;
    }

    public dispose(): void {
        for (const image of this._images.values()) image?.dispose();

        this._images.clear();
        this._keyCache.clear();
    }

    public getImageContainer(frame: number): AvatarImageBodyPartContainer | undefined {
        return this._images.get(this.getCacheKey(frame));
    }

    public updateImageContainer(part: AvatarImageBodyPartContainer, frame: number): void {
        const name = this.getCacheKey(frame);

        const existing = this._images.get(name);

        if (existing) existing.dispose();

        this._images.set(name, part);
    }

    private getCacheKey(frame: number): string {
        if (!this._partList || !this._partList.length) return AvatarImageDirectionCache.NO_FRAMES_KEY;

        const cached = this._keyCache.get(frame);

        if (cached) return cached;

        let name = this._partList[0].getCacheableKey(frame);

        for (let i = 1; i < this._partList.length; i++) name = `${name}${AvatarImageDirectionCache.KEY_SEPARATOR}${this._partList[i].getCacheableKey(frame)}`;

        this._keyCache.set(frame, name);

        return name;
    }

    public getPartList(): AvatarImagePartContainer[] {
        return this._partList;
    }
}

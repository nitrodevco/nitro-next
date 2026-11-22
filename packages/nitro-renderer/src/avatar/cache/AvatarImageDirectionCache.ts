import { AvatarImageBodyPartContainer } from '../AvatarImageBodyPartContainer';
import { AvatarImagePartContainer } from '../AvatarImagePartContainer';

/** Port of Flash `AvatarImageDirectionCache`. */
export class AvatarImageDirectionCache {
    private static KEY_SEPARATOR: string = '/';
    private static NO_FRAMES_KEY: string = '-';
    /** A longer cycle than this (parts of very different lengths) keys by the frame itself. */
    private static MAX_FRAME_PERIOD: number = 1024;
    /** Past this many keys the key cache starts over - only reached by a cycle over `MAX_FRAME_PERIOD`. */
    private static MAX_KEY_CACHE_SIZE: number = 1024;

    private _partList: AvatarImagePartContainer[];
    private _images: Map<string, AvatarImageBodyPartContainer> = new Map();
    // the key for a frame never changes for a given part list, so it is built once
    private _keyCache: Map<number, string> = new Map();
    /**
     * Not Flash's: every part's key repeats with its frame count (`getCacheableKey` reads only
     * `frame % frames.length`), so the whole key repeats every least common multiple of them. Flash
     * keys `_keyCache` by the frame itself, and the frame is the avatar's ever-growing frame counter
     * for an action that is not an animation (standing, talking, carrying, a turned head): a new key
     * on every redraw, kept as long as the cache. Keyed by the frame within the cycle, the same keys
     * come out from a bounded cache. 0 when the cycle is longer than `MAX_FRAME_PERIOD`.
     */
    private _framePeriod: number;

    constructor(parts: AvatarImagePartContainer[]) {
        this._partList = parts;
        this._framePeriod = AvatarImageDirectionCache.getFramePeriod(parts);
    }

    /**
     * The least common multiple of the parts' frame counts. A part of no or one frame keys the same
     * on every frame, so it leaves the cycle as it is.
     */
    private static getFramePeriod(parts: AvatarImagePartContainer[]): number {
        let period = 1;

        for (const part of parts ?? []) {
            const length = part.frameCount;

            if (length <= 1) continue;

            let a = period;
            let b = length;

            while (b) [ a, b ] = [ b, a % b ];

            period = (period / a) * length;

            if (period > AvatarImageDirectionCache.MAX_FRAME_PERIOD) return 0;
        }

        return period;
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

        // `%` keeps the frame's sign, as `getCacheableKey`'s own does, so a negative frame (an action
        // started from frame zero) still gives every part the same frame within its cycle.
        const cycleFrame = this._framePeriod ? (frame % this._framePeriod) : frame;
        const cached = this._keyCache.get(cycleFrame);

        if (cached) return cached;

        let name = this._partList[0].getCacheableKey(cycleFrame);

        for (let i = 1; i < this._partList.length; i++) name = `${name}${AvatarImageDirectionCache.KEY_SEPARATOR}${this._partList[i].getCacheableKey(cycleFrame)}`;

        if (this._keyCache.size >= AvatarImageDirectionCache.MAX_KEY_CACHE_SIZE) this._keyCache.clear();

        this._keyCache.set(cycleFrame, name);

        return name;
    }

    public getPartList(): AvatarImagePartContainer[] {
        return this._partList;
    }
}

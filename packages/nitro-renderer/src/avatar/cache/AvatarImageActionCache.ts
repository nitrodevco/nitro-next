
import { GetTickerTime } from '../../utils';
import type { AvatarImageDirectionCache } from './AvatarImageDirectionCache';

export class AvatarImageActionCache {
    private _cache: Map<number, AvatarImageDirectionCache> = new Map();
    private _lastAccessTime: number;

    constructor() {
        this._lastAccessTime = GetTickerTime();
    }

    public dispose(): void {
        for (const direction of this._cache.values()) {
            if (direction) direction.dispose();
        }

        this._cache.clear();
    }

    public getDirectionCache(direction: number): AvatarImageDirectionCache | undefined {
        return this._cache.get(direction);
    }

    public updateDirectionCache(direction: number, cache: AvatarImageDirectionCache): void {
        this._cache.set(direction, cache);
    }

    public get lastAccessTime(): number {
        return this._lastAccessTime;
    }

    public set lastAccessTime(time: number) {
        this._lastAccessTime = time;
    }
}

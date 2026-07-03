import type { IActiveActionData } from '@nitrodevco/nitro-api';

import type { AvatarImageActionCache } from './AvatarImageActionCache';

export class AvatarImageBodyPartCache {
    private _cache: Map<string, AvatarImageActionCache> = new Map();
    private _currentAction: IActiveActionData | undefined = undefined;
    private _currentDirection: number;
    private _disposed: boolean;

    public dispose(): void {
        if (!this._disposed) {
            if (!this._cache) return;

            this.disposeActions(0, 2147483647);

            this._cache.clear();

            this._disposed = true;
        }
    }

    public disposeActions(time: number, max: number): void {
        if (!this._cache || this._disposed) return;

        for (const [key, cache] of this._cache.entries()) {
            if (!cache) continue;

            if ((max - cache.lastAccessTime) >= time) {
                cache.dispose();

                this._cache.delete(key);
            }
        }
    }

    public getActionCache(action: IActiveActionData | undefined = undefined): AvatarImageActionCache | undefined {
        if (!this._currentAction) return undefined;

        action ??= this._currentAction;

        if (action.overridingAction) return this._cache.get(action.overridingAction);

        return this._cache.get(action.id);
    }

    public updateActionCache(action: IActiveActionData, cache: AvatarImageActionCache): void {
        if (action.overridingAction) this._cache.set(action.overridingAction, cache);
        else this._cache.set(action.id, cache);
    }

    public setAction(action: IActiveActionData, time: number): void {
        if (!this._currentAction) this._currentAction = action;

        const cache = this.getActionCache(this._currentAction);

        if (cache) cache.lastAccessTime = time;

        this._currentAction = action;
    }

    public get action(): IActiveActionData | undefined {
        return this._currentAction;
    }

    public get direction(): number {
        return this._currentDirection;
    }

    public set direction(direction: number) {
        this._currentDirection = direction;
    }
}

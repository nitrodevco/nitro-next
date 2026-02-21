import type { SortableSprite } from '../utils';

export class RoomObjectSortableSpriteCacheItem {
    private _sprites: SortableSprite[] = [];
    private _geometryUpdateId: number = -1;
    private _objectUpdateId: number = -1;
    private _isEmpty: boolean = false;

    public dispose(): void {
        this.setSpriteCount(0);
    }

    public addSprite(sprite: SortableSprite): void {
        this._sprites.push(sprite);
    }

    public getSprite(index: number): SortableSprite {
        return this._sprites[index];
    }

    public needsUpdate(geometryUpdateId: number, objectUpdateId: number): boolean {
        if (geometryUpdateId === this._geometryUpdateId && objectUpdateId === this._objectUpdateId) return false;

        this._geometryUpdateId = geometryUpdateId;
        this._objectUpdateId = objectUpdateId;

        return true;
    }

    public setSpriteCount(count: number): void {
        if (count < this._sprites.length) {
            let i = count;

            while (i < this._sprites.length) {
                this._sprites[i]?.dispose();

                i++;
            }

            this._sprites.splice(count, this._sprites.length - count);
        }

        this._isEmpty = this._sprites.length ? false : true;
    }

    public get sprites(): SortableSprite[] {
        return this._sprites;
    }

    public get spriteCount(): number {
        return this._sprites.length;
    }

    public get isEmpty(): boolean {
        return this._isEmpty;
    }
}

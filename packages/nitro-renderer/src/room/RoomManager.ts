import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { type IRoomInstance, type IRoomManager } from '@nitrodevco/nitro-api';

import { RoomInstance } from './RoomInstance';

export class RoomManager implements IRoomManager {
    private _rooms: Map<number, IRoomInstance> = new Map();
    private _updateCategories: number[] = [
        RoomObjectCategoryEnum.Floor,
        RoomObjectCategoryEnum.Wall,
        RoomObjectCategoryEnum.Unit,
        RoomObjectCategoryEnum.Cursor,
        RoomObjectCategoryEnum.Room,
    ];

    public getRoomInstance(roomId: number): IRoomInstance | undefined {
        return this._rooms.get(roomId);
    }

    public createRoomInstance(roomId: number): IRoomInstance | undefined {
        let instance = this.getRoomInstance(roomId);

        if (!instance) {
            instance = new RoomInstance(roomId);

            this._rooms.set(instance.id, instance);

            if (this._updateCategories.length) {
                for (const category of this._updateCategories) {
                    instance.addUpdateCategory(category);
                }
            }
        }

        return instance;
    }

    public removeRoomInstance(roomId: number): boolean {
        const existing = this._rooms.get(roomId);

        if (!existing) return false;

        this._rooms.delete(existing.id);

        existing.dispose();

        return true;
    }

    public addUpdateCategory(category: RoomObjectCategoryEnum): void {
        const index = this._updateCategories.indexOf(category);

        if (index >= 0) return;

        this._updateCategories.push(category);

        for (const room of this._rooms.values()) room?.addUpdateCategory(category);
    }

    public removeUpdateCategory(category: RoomObjectCategoryEnum): void {
        const index = this._updateCategories.indexOf(category);

        if (index === -1) return;

        this._updateCategories.splice(index, 1);

        for (const room of this._rooms.values()) room?.removeUpdateCategory(category);
    }

    public get rooms(): Map<number, IRoomInstance> {
        return this._rooms;
    }
}

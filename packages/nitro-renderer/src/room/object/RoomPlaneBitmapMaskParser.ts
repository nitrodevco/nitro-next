import { type IRoomMapMask, type IVector3D, Vector3d } from '@nitrodevco/nitro-api';

import { RoomMapMaskData } from './RoomMapMaskData';
import { RoomPlaneBitmapMaskData } from './RoomPlaneBitmapMaskData';

export class RoomPlaneBitmapMaskParser {
    private _masks: Map<string, RoomPlaneBitmapMaskData> = new Map();

    public get maskCount(): number {
        return this._masks.size;
    }

    public dispose(): void {
        if (this._masks) {
            this.reset();

            this._masks = null!;
        }
    }

    public initialize(data: RoomMapMaskData): boolean {
        if (!data) return false;

        this._masks.clear();

        if (data.masks.length) {
            for (const mask of data.masks) {
                if (!mask) continue;

                const location = mask.locations.length ? mask.locations[0] : null;

                if (!location) continue;

                this._masks.set(mask.id, new RoomPlaneBitmapMaskData(mask.type, location, mask.category));
            }
        }

        return true;
    }

    public reset(): void {
        for (const mask of this._masks.values()) {
            if (!mask) continue;

            mask.dispose();
        }

        this._masks.clear();
    }

    public addMask(key: string, type: string, loc: IVector3D, category: string): void {
        const mask = new RoomPlaneBitmapMaskData(type, loc, category);

        this._masks.delete(key);
        this._masks.set(key, mask);
    }

    public removeMask(key: string): boolean {
        const existing = this._masks.get(key);

        if (existing) {
            this._masks.delete(key);

            existing.dispose();

            return true;
        }

        return false;
    }

    public getXML(): RoomMapMaskData {
        const data = new RoomMapMaskData();

        for (const [key, mask] of this._masks.entries()) {
            if (!mask) continue;

            const type = this.getMaskType(mask);
            const category = this.getMaskCategory(mask);
            const location = this.getMaskLocation(mask);

            if (type && category && location) {
                const newMask: IRoomMapMask = {
                    id: key,
                    type: type,
                    category: category,
                    locations: [new Vector3d(location.x, location.y, location.z)],
                };

                data.masks.push(newMask);
            }
        }

        return data;
    }

    public getMaskLocation(mask: RoomPlaneBitmapMaskData) {
        return mask.loc;
    }

    public getMaskType(mask: RoomPlaneBitmapMaskData) {
        return mask.type;
    }

    public getMaskCategory(mask: RoomPlaneBitmapMaskData) {
        return mask.category;
    }

    public get masks() {
        return this._masks;
    }
}

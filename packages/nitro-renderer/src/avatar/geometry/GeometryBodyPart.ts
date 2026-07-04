import type { IAssetAvatarBodyPart, IAssetAvatarBodyPartItem, IAvatarImage } from '@nitrodevco/nitro-api';

import { GeometryItem } from './GeometryItem';
import type { Matrix4x4 } from './Matrix4x4';
import { Node3D } from './Node3D';
import type { Vector3D } from './Vector3D';

export class GeometryBodyPart extends Node3D {
    private _id: string;
    private _radius: number;
    private _parts: Map<string, GeometryItem> = new Map();
    private _dynamicParts: Map<IAvatarImage, Record<string, GeometryItem>> = new Map();

    constructor(part: IAssetAvatarBodyPart) {
        super(part.x ?? 0, part.y ?? 0, part.z ?? 0);

        this._id = part.id;
        this._radius = part.radius ?? 0;

        if (part.items && (part.items.length > 0)) {
            for (const item of part.items) {
                if (!item) continue;

                const geometryItem = new GeometryItem(item);

                this._parts.set(geometryItem.id, geometryItem);
            }
        }
    }

    public getDynamicParts(avatar: IAvatarImage): GeometryItem[] {
        const existing = this._dynamicParts.get(avatar);
        const parts: GeometryItem[] = [];

        if (existing) {
            for (const index in existing) {
                const item = existing[index];

                if (!item) continue;

                parts.push(item);
            }
        }

        return parts;
    }

    public getPartIds(avatar: IAvatarImage | undefined): string[] {
        const ids: string[] = [];

        for (const part of this._parts.values()) {
            if (!part) continue;

            ids.push(part.id);
        }

        if (avatar) {
            const existing = this._dynamicParts.get(avatar);

            if (existing) {
                for (const index in existing) {
                    const part = existing[index];

                    if (!part) continue;

                    ids.push(part.id);
                }
            }
        }

        return ids;
    }

    public removeDynamicParts(avatar: IAvatarImage): boolean {
        this._dynamicParts.delete(avatar);

        return true;
    }

    public addPart(item: IAssetAvatarBodyPartItem, avatar: IAvatarImage): boolean {
        if (this.hasPart(item.id, avatar)) return false;

        let existing = this._dynamicParts.get(avatar);

        if (!existing) {
            existing = {};

            this._dynamicParts.set(avatar, existing);
        }

        existing[item.id] = new GeometryItem(item, true);

        return true;
    }

    public hasPart(itemId: string, avatar: IAvatarImage): boolean {
        let existingPart = this._parts.get(itemId);

        if (!existingPart) existingPart = this._dynamicParts.get(avatar)?.[itemId] ?? undefined;

        return !!existingPart;
    }

    public getParts(matrix: Matrix4x4, loc: Vector3D, _arg_3: unknown[], avatar: IAvatarImage): string[] {
        const parts: [number, GeometryItem][] = [];

        for (const part of this._parts.values()) {
            if (!part) continue;

            part.applyTransform(matrix);

            parts.push([part.getDistance(loc), part]);
        }

        const existingDynamic = this._dynamicParts.get(avatar);

        if (existingDynamic) {
            for (const index in existingDynamic) {
                const part = existingDynamic[index];

                if (!part) continue;

                part.applyTransform(matrix);

                parts.push([part.getDistance(loc), part]);
            }
        }

        parts.sort((a, b) => {
            const partA = a[0];
            const partB = b[0];

            if (partA < partB) return -1;

            if (partA > partB) return 1;

            return 0;
        });

        const partIds: string[] = [];

        for (const part of parts) {
            if (!part) continue;

            partIds.push(part[1].id);
        }

        return partIds;
    }

    public getDistance(loc: Vector3D): number {
        return Math.min(Math.abs(((loc.z - this.transformedLocation.z) - this._radius)), Math.abs(((loc.z - this.transformedLocation.z) + this._radius)));
    }

    public get id(): string {
        return this._id;
    }

    public get radius(): number {
        return this._radius;
    }
}

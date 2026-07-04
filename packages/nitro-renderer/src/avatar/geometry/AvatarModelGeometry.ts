import type { AvatarGeometryType, AvatarScaleType, AvatarSetType, IAssetAvatarGeometryConfig, IAvatarImage } from '@nitrodevco/nitro-api';

import { AvatarCanvas } from '../structure';
import { AvatarSet } from './AvatarSet';
import { GeometryBodyPart } from './GeometryBodyPart';
import { Matrix4x4 } from './Matrix4x4';
import { Vector3D } from './Vector3D';

export class AvatarModelGeometry {
    private _camera: Vector3D;
    private _avatarSet: AvatarSet;
    private _geometryTypes: Map<AvatarGeometryType, Map<string, GeometryBodyPart>> = new Map();
    private _itemIdToBodyPartMap: Map<AvatarGeometryType, Map<string, GeometryBodyPart>> = new Map();
    private _transformation: Matrix4x4 = new Matrix4x4();
    private _canvases: Map<AvatarScaleType, Map<AvatarGeometryType, AvatarCanvas>> = new Map();

    constructor(config: IAssetAvatarGeometryConfig) {
        this._camera = new Vector3D(0, 0, 10);
        this._avatarSet = new AvatarSet(config.avatarSets[0]);

        const camera = config.camera;

        if (camera) {
            this._camera.x = camera.x;
            this._camera.y = camera.y;
            this._camera.z = camera.z;
        }

        if (config.canvases && (config.canvases.length > 0)) {
            for (const canvas of config.canvases) {
                if (!canvas) continue;

                const scale = canvas.scale;
                const geometries = new Map<AvatarGeometryType, AvatarCanvas>();

                if (canvas.geometries && (canvas.geometries.length > 0)) for (const geometry of canvas.geometries) geometries.set(geometry.id, new AvatarCanvas(geometry, scale));

                this._canvases.set(scale, geometries);
            }
        }

        if (config.types && (config.types.length > 0)) {
            for (const type of config.types) {
                if (!type) continue;

                const bodyParts: Map<string, GeometryBodyPart> = new Map();
                const itemIds: Map<string, GeometryBodyPart> = new Map();

                if (type.bodyParts && (type.bodyParts.length > 0)) {
                    for (const bodyPart of type.bodyParts) {
                        if (!bodyPart) continue;

                        const geometryBodyPart = new GeometryBodyPart(bodyPart);

                        bodyParts.set(geometryBodyPart.id, geometryBodyPart);

                        for (const part of geometryBodyPart.getPartIds(undefined)) itemIds.set(part, geometryBodyPart);
                    }
                }

                this._geometryTypes.set(type.id, bodyParts);
                this._itemIdToBodyPartMap.set(type.id, itemIds);
            }
        }
    }

    public removeDynamicItems(avatar: IAvatarImage): void {
        for (const geometry of this._geometryTypes.values()) {
            if (!geometry) continue;

            for (const part of geometry.values()) {
                if (!part) continue;

                part.removeDynamicParts(avatar);
            }
        }
    }

    public getBodyPartIdsInAvatarSet(setType: AvatarSetType): string[] {
        return this._avatarSet.findAvatarSet(setType)?.getBodyParts() ?? [];
    }

    public isMainAvatarSet(setType: AvatarSetType): boolean {
        return this._avatarSet.findAvatarSet(setType)?.isMain ?? false;
    }

    public getCanvas(scale: AvatarScaleType, geometryType: AvatarGeometryType): AvatarCanvas | undefined {
        return this._canvases.get(scale)?.get(geometryType) ?? undefined;
    }

    public getBodyPart(geometryType: AvatarGeometryType, partId: string): GeometryBodyPart | undefined {
        return this.getBodyPartsOfType(geometryType).get(partId);
    }

    public getBodyPartOfItem(geometryType: AvatarGeometryType, _arg_2: string, avatar: IAvatarImage): GeometryBodyPart | undefined {
        const itemIds = this._itemIdToBodyPartMap.get(geometryType);

        if (itemIds) {
            const part = itemIds.get(_arg_2);

            if (part) return part;

            const parts = this.getBodyPartsOfType(geometryType);

            if (parts) {
                for (const part of parts.values()) {
                    if (!part) continue;

                    if (part.hasPart(_arg_2, avatar)) return part;
                }
            }
        }

        return undefined;
    }

    public getBodyPartsAtAngle(setType: AvatarSetType, _arg_2: number, geometryType: AvatarGeometryType): string[] {
        if (!geometryType) return [];

        const geometryParts = this.getBodyPartsOfType(geometryType);
        const parts = this.getBodyPartsInAvatarSet(geometryParts, setType);
        const sets: [number, GeometryBodyPart][] = [];
        const ids: string[] = [];

        this._transformation = Matrix4x4.getYRotationMatrix(_arg_2);

        for (const part of parts.values()) {
            if (!part) continue;

            part.applyTransform(this._transformation);

            sets.push([part.getDistance(this._camera), part]);
        }

        sets.sort((a, b) => {
            const partA = a[0];
            const partB = b[0];

            if (partA < partB) return -1;

            if (partA > partB) return 1;

            return 0;
        });

        for (const set of sets) {
            if (!set) continue;

            ids.push(set[1].id);
        }

        return ids;
    }

    public getParts(geometryType: AvatarGeometryType, partId: string, _arg_3: number, _arg_4: unknown[], avatar: IAvatarImage): string[] {
        if (this.hasBodyPart(geometryType, partId)) {
            const part = this.getBodyPartsOfType(geometryType).get(partId);

            if (part) {
                this._transformation = Matrix4x4.getYRotationMatrix(_arg_3);

                return part.getParts(this._transformation, this._camera, _arg_4, avatar);
            }
        }

        return [];
    }

    private typeExists(geometryType: AvatarGeometryType): boolean {
        return !!this._geometryTypes.get(geometryType);
    }

    private hasBodyPart(geometryType: AvatarGeometryType, partId: string): boolean {
        if (this.typeExists(geometryType)) {
            const existing = this._geometryTypes.get(geometryType);

            if (existing && existing.get(partId)) return true;
        }

        return false;
    }

    private getBodyPartsOfType(geometryType: AvatarGeometryType): Map<string, GeometryBodyPart> {
        if (this.typeExists(geometryType)) return this._geometryTypes.get(geometryType) ?? new Map<string, GeometryBodyPart>();

        return new Map<string, GeometryBodyPart>();
    }

    private getBodyPartsInAvatarSet(k: Map<string, GeometryBodyPart>, setType: AvatarSetType): GeometryBodyPart[] {
        const partIds = this.getBodyPartIdsInAvatarSet(setType);
        const bodyParts: GeometryBodyPart[] = [];

        for (const part of partIds) {
            if (!part) continue;

            const bodyPart = k.get(part);

            if (bodyPart) bodyParts.push(bodyPart);
        }

        return bodyParts;
    }
}

import type { IAssetAvatarGeometryConfig, IAvatarImage } from '@nitrodevco/nitro-api';

import { AvatarCanvas } from '../structure';
import { AvatarSet } from './AvatarSet';
import { GeometryBodyPart } from './GeometryBodyPart';
import { Matrix4x4 } from './Matrix4x4';
import { Vector3D } from './Vector3D';

export class AvatarModelGeometry {
    private _camera: Vector3D;
    private _avatarSet: AvatarSet;
    private _geometryTypes: Map<string, Map<string, GeometryBodyPart>>;
    private _itemIdToBodyPartMap: Map<string, Map<string, GeometryBodyPart>>;
    private _transformation: Matrix4x4;
    private _canvases: Map<string, Map<string, AvatarCanvas>>;

    constructor(config: IAssetAvatarGeometryConfig) {
        this._camera = new Vector3D(0, 0, 10);
        this._avatarSet = new AvatarSet(config.avatarSets[0]);
        this._geometryTypes = new Map();
        this._itemIdToBodyPartMap = new Map();
        this._transformation = new Matrix4x4();
        this._canvases = new Map();

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
                const geometries = new Map<string, AvatarCanvas>();

                if (canvas.geometries && (canvas.geometries.length > 0)) {
                    for (const geometry of canvas.geometries) {
                        if (!geometry) continue;

                        const avatarCanvas = new AvatarCanvas(geometry, scale);

                        geometries.set(avatarCanvas.id, avatarCanvas);
                    }
                }

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

                        for (const part of geometryBodyPart.getPartIds(undefined)) {
                            itemIds.set(part, geometryBodyPart);
                        }
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

    public getBodyPartIdsInAvatarSet(id: string): string[] {
        const avatarSet = this._avatarSet.findAvatarSet(id);

        if (!avatarSet) return [];

        return avatarSet.getBodyParts();
    }

    public isMainAvatarSet(id: string): boolean {
        const avatarSet = this._avatarSet.findAvatarSet(id);

        if (!avatarSet) return false;

        return avatarSet.isMain;
    }

    public getCanvas(scale: string, canvasId: string): AvatarCanvas | undefined {
        return this._canvases.get(scale)?.get(canvasId) ?? undefined;
    }

    private typeExists(type: string): boolean {
        const existing = this._geometryTypes.get(type);

        if (existing) return true;

        return false;
    }

    private hasBodyPart(type: string, partId: string): boolean {
        if (this.typeExists(type)) {
            const existing = this._geometryTypes.get(type);

            if (existing && existing.get(partId)) return true;
        }

        return false;
    }

    private getBodyPartsOfType(k: string): Map<string, GeometryBodyPart> {
        if (this.typeExists(k)) return this._geometryTypes.get(k) ?? new Map<string, GeometryBodyPart>();

        return new Map<string, GeometryBodyPart>();
    }

    public getBodyPart(k: string, _arg_2: string): GeometryBodyPart | undefined {
        return this.getBodyPartsOfType(k).get(_arg_2);
    }

    public getBodyPartOfItem(k: string, _arg_2: string, _arg_3: IAvatarImage): GeometryBodyPart | undefined {
        const itemIds = this._itemIdToBodyPartMap.get(k);

        if (itemIds) {
            const part = itemIds.get(_arg_2);

            if (part) return part;

            const parts = this.getBodyPartsOfType(k);

            if (parts) {
                for (const part of parts.values()) {
                    if (!part) continue;

                    if (part.hasPart(_arg_2, _arg_3)) return part;
                }
            }
        }

        return undefined;
    }

    private getBodyPartsInAvatarSet(k: Map<string, GeometryBodyPart>, _arg_2: string): GeometryBodyPart[] {
        const partIds = this.getBodyPartIdsInAvatarSet(_arg_2);
        const bodyParts: GeometryBodyPart[] = [];

        for (const part of partIds) {
            if (!part) continue;

            const bodyPart = k.get(part);

            if (bodyPart) bodyParts.push(bodyPart);
        }

        return bodyParts;
    }

    public getBodyPartsAtAngle(k: string, _arg_2: number, _arg_3: string): string[] {
        if (!_arg_3) return [];

        const geometryParts = this.getBodyPartsOfType(_arg_3);
        const parts = this.getBodyPartsInAvatarSet(geometryParts, k);
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

    public getParts(type: string, partId: string, _arg_3: number, _arg_4: unknown[], avatar: IAvatarImage): string[] {
        if (this.hasBodyPart(type, partId)) {
            const part = this.getBodyPartsOfType(type).get(partId);

            if (part) {
                this._transformation = Matrix4x4.getYRotationMatrix(_arg_3);

                return part.getParts(this._transformation, this._camera, _arg_4, avatar);
            }
        }

        return [];
    }
}

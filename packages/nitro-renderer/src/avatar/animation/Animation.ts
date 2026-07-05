import type { AvatarBodyPartType, AvatarFigurePartType, IAddDataContainer, IAnimation, IAnimationLayerData, IAssetAnimation, IAssetAnimationFrame, IAssetAnimationFramePart, IAvatarDataContainer, IDirectionDataContainer, ISpriteDataContainer } from '@nitrodevco/nitro-api';

import type { AvatarStructure } from '../AvatarStructure';
import { AddDataContainer } from './AddDataContainer';
import { AvatarAnimationLayerData } from './AvatarAnimationLayerData';
import { AvatarDataContainer } from './AvatarDataContainer';
import { DirectionDataContainer } from './DirectionDataContainer';
import { SpriteDataContainer } from './SpriteDataContainer';

export class Animation implements IAnimation {
    private static readonly EMPTY_ARRAY: unknown[] = [] as const;

    private _id: string;
    private _description: string;
    private _frames: AvatarAnimationLayerData[][] = [];
    private _spriteData: ISpriteDataContainer[] | undefined = undefined;
    private _avatarData: IAvatarDataContainer | undefined = undefined;
    private _directionData: IDirectionDataContainer | undefined = undefined;
    private _removeData: AvatarFigurePartType[] = [];
    private _addData: IAddDataContainer[] = [];
    private _overrideFrames: Map<string, AvatarAnimationLayerData[][]> = new Map();
    private _overriddenActions: Map<string, string> | undefined = undefined;
    private _resetOnToggle: boolean;

    constructor(structure: AvatarStructure, data: IAssetAnimation) {
        this._id = data.name;
        this._description = data.desc ?? this._id;
        this._resetOnToggle = data.resetOnToggle ?? false;

        if (data.sprites && data.sprites.length) {
            this._spriteData = [];

            for (const sprite of data.sprites) this._spriteData.push(new SpriteDataContainer(this, sprite));
        }

        if (data.avatars && data.avatars.length) this._avatarData = new AvatarDataContainer(data.avatars[0]);

        if (data.directions && data.directions.length) this._directionData = new DirectionDataContainer(data.directions[0]);

        if (data.removes && data.removes.length) for (const remove of data.removes) this._removeData.push(remove.id);

        if (data.adds && data.adds.length) for (const add of data.adds) this._addData.push(new AddDataContainer(add));

        if (data.overrides && data.overrides.length) {
            this._overriddenActions = new Map();

            for (const override of data.overrides) {
                if (override.override) this._overriddenActions.set(override.override, override.name);

                if (override.frames) {
                    const frames: AvatarAnimationLayerData[][] = [];

                    this.parseFrames(frames, override.frames, structure);

                    this._overrideFrames.set(override.name, frames);
                }
            }
        }

        if (data.frames) this.parseFrames(this._frames, data.frames, structure);
    }

    public frameCount(name: string = ''): number {
        if (!name || !name.length) return this._frames.length;

        return this._overrideFrames.get(name)?.length ?? 0;
    }

    public hasOverriddenActions(): boolean {
        if (!this._overriddenActions) return false;

        return (this._overriddenActions.size > 0);
    }

    public overriddenActionNames(): string[] {
        if (!this._overriddenActions) return Animation.EMPTY_ARRAY as string[];

        return this._overriddenActions.keys().toArray();
    }

    public overridingAction(name: string): string | undefined {
        return this._overriddenActions?.get(name);
    }

    public getAnimatedBodyPartIds(frameCount: number, name: string = ''): AvatarBodyPartType[] {
        const ids: AvatarBodyPartType[] = [];

        for (const layer of this.getFrame(frameCount, name)) {
            if (layer.type === AvatarAnimationLayerData.BODYPART) ids.push(layer.id as AvatarBodyPartType);

            else if (layer.type === AvatarAnimationLayerData.FX) {
                if (this._addData && this._addData.length) for (const _local_5 of this._addData) if (_local_5.id === layer.id && _local_5.align) ids.push(_local_5.align);
            }
        }

        return ids;
    }

    public getLayerData(frameCount: number, spriteId: AvatarBodyPartType, name: string = ''): IAnimationLayerData | undefined {
        for (const layer of this.getFrame(frameCount, name)) {
            if (layer.id === spriteId as string) return layer;

            if (layer.type === AvatarAnimationLayerData.FX) {
                if (this._addData && this._addData.length) for (const addData of this._addData) if (((addData.align === spriteId) && (addData.id === layer.id))) return layer;
            }
        }

        return undefined;
    }

    public getAddData(id: AvatarFigurePartType | string): IAddDataContainer | undefined {
        if (this._addData) for (const add of this._addData) if (add.id === id) return add;

        return undefined;
    }

    public hasAvatarData(): boolean {
        return !!this._avatarData;
    }

    public hasDirectionData(): boolean {
        return !!this._directionData;
    }

    public hasAddData(): boolean {
        return !!this._addData;
    }

    public get id(): string {
        return this._id;
    }

    public get spriteData(): ISpriteDataContainer[] {
        return this._spriteData ?? Animation.EMPTY_ARRAY as ISpriteDataContainer[];
    }

    public get avatarData(): IAvatarDataContainer | undefined {
        return this._avatarData;
    }

    public get directionData(): IDirectionDataContainer | undefined {
        return this._directionData;
    }

    public get removeData(): AvatarFigurePartType[] {
        return this._removeData ?? Animation.EMPTY_ARRAY as AvatarFigurePartType[];
    }

    public get addData(): IAddDataContainer[] {
        return this._addData ?? Animation.EMPTY_ARRAY as IAddDataContainer[];
    }

    public get resetOnToggle(): boolean {
        return this._resetOnToggle;
    }

    public toString(): string {
        return this._description;
    }

    private getFrame(frameCount: number, name: string = ''): AvatarAnimationLayerData[] {
        if (frameCount < 0) frameCount = 0;

        let layers: AvatarAnimationLayerData[] = [];

        if (!name) {
            if (this._frames.length > 0) layers = this._frames[(frameCount % this._frames.length)];
        }
        else {
            const overrideLayers = this._overrideFrames.get(name);

            if (overrideLayers && (overrideLayers.length > 0)) layers = overrideLayers[(frameCount % overrideLayers.length)];
        }

        return layers;
    }

    private parseFrames(frames: AvatarAnimationLayerData[][], overrides: IAssetAnimationFrame[], structure: AvatarStructure): void {
        if (!overrides || !overrides.length) return;

        for (const frame of overrides) {
            let repeats = 1;

            if (frame.repeats && (frame.repeats > 1)) repeats = frame.repeats;

            let index = 0;

            while (index < repeats) {
                const layers: AvatarAnimationLayerData[] = [];

                if (frame.bodyparts && frame.bodyparts.length) layers.push(...this.parseFramePartsToLayers(frame.bodyparts, structure));

                if (frame.fxs && frame.fxs.length) layers.push(...this.parseFramePartsToLayers(frame.fxs, structure));

                frames.push(layers);

                index++;
            }
        }
    }

    private parseFramePartsToLayers(parts: IAssetAnimationFramePart[], structure: AvatarStructure): AvatarAnimationLayerData[] {
        const layers: AvatarAnimationLayerData[] = [];

        if (parts && parts.length) {
            for (const part of parts) {
                if (!part.action) continue;

                const definition = structure.getActionDefinition(part.action);
                const layer = new AvatarAnimationLayerData(part, AvatarAnimationLayerData.BODYPART, definition);

                layers.push(layer);
            }
        }

        return layers;
    }
}

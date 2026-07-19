import { AvatarBodyPartType, AvatarDirectionAngle, AvatarGenderType, AvatarGeometryType, AvatarScaleType, AvatarSetType, type IActionDefinition, type IActiveActionData, IAnimation, IAnimationLayerData, type IAssetAnimation, IAssetAvatarAnimation, IAssetAvatarBodyPartItem, type IAssetAvatarGeometryConfig, IAssetAvatarPartSetItem, IAssetAvatarPartSets, type IAvatarFigureContainer, type IAvatarImage, type IFigureData, type IFigurePartSet, type IPartColor, type IStructureData } from '@nitrodevco/nitro-api';
import { AvatarFigurePartType } from '@nitrodevco/nitro-api';
import type { Point } from 'pixi.js';

import type { ActionDefinition } from './actions';
import { AvatarActionManager } from './actions';
import { AnimationManager } from './animation';
import { AvatarImagePartContainer } from './AvatarImagePartContainer';
import { AvatarModelGeometry } from './geometry';
import type { AvatarCanvas } from './structure';
import { AnimationAction, AvatarAnimationData, FigureSetData, PartSetsData } from './structure';

export class AvatarStructure {
    private _geometry: AvatarModelGeometry | undefined = undefined;
    private _figureData: FigureSetData = new FigureSetData();
    private _partSetsData: PartSetsData = new PartSetsData();
    private _animationData: AvatarAnimationData = new AvatarAnimationData();
    private _animationManager: AnimationManager = new AnimationManager();
    private _actionManager: AvatarActionManager = new AvatarActionManager();
    private _mandatorySetTypeIds: Map<AvatarGenderType, Record<number, AvatarFigurePartType[]>> = new Map();
    private _defaultAction: IActionDefinition | undefined = undefined;

    public initGeometry(data: IAssetAvatarGeometryConfig): void {
        this._geometry = new AvatarModelGeometry(data);
    }

    public initPartSets(data: IAssetAvatarPartSets): boolean {
        if (this._partSetsData && this._partSetsData.parse(data)) {
            const right = this._partSetsData.getPartDefinition('ri');
            const left = this._partSetsData.getPartDefinition('li');

            if (right) right.appendToFigure = true;
            if (left) left.appendToFigure = true;

            return true;
        }

        return false;
    }

    public initAnimation(data: IAssetAvatarAnimation[]): boolean {
        return this._animationData.parse(data);
    }

    public initFigureData(data: IFigureData): boolean {
        return this._figureData.parse(data);
    }

    public injectFigureData(data: IFigureData): void {
        this._figureData.injectJSON(data);
    }

    public registerAnimations(data: IAssetAnimation[]): void {
        this._animationManager.registerAnimations(this, data);
    }

    public getPartColor(container: IAvatarFigureContainer, partType: AvatarFigurePartType, layerId: number = 0): IPartColor | undefined {
        const colorIds = container.getPartColorIds(partType);

        if (!colorIds || colorIds.length < layerId) return undefined;

        const figureDataSetType = this._figureData.getSetType(partType);

        if (!figureDataSetType) return undefined;

        return this._figureData.getPalette(figureDataSetType.paletteId)?.getColor(colorIds[layerId]);
    }

    public getBodyPartData(animation: string, frameCount: number, spriteId: string): IAnimationLayerData | undefined {
        return this._animationManager.getLayerData(animation, frameCount, spriteId);
    }

    public getAnimation(name: string): IAnimation | undefined {
        return this._animationManager.getAnimation(name);
    }

    public getActionDefinition(id: string): ActionDefinition | undefined {
        return this._actionManager.getActionDefinition(id);
    }

    public getActionDefinitionWithState(state: string): ActionDefinition | undefined {
        return this._actionManager.getActionDefinitionWithState(state);
    }

    public isMainAvatarSet(id: AvatarSetType): boolean {
        return this._geometry?.isMainAvatarSet(id) ?? false;
    }

    public sortActions(actions: IActiveActionData[]): IActiveActionData[] {
        return this._actionManager.sortActions(actions);
    }

    public maxFrames(actions: IActiveActionData[]): number {
        let count = 0;

        for (const action of actions) {
            if (!action.definition) continue;

            count = Math.max(count, this._animationData.getFrameCount(action.definition));
        }

        return count;
    }

    public getMandatorySetTypeIds(gender: AvatarGenderType, _arg_2: number): AvatarFigurePartType[] {
        let get = this._mandatorySetTypeIds.get(gender);

        if (!get) {
            get = {};

            this._mandatorySetTypeIds.set(gender, get);
        }

        let value = get[_arg_2];

        if (value === undefined) {
            value = this._figureData.getMandatorySetTypeIds(gender, _arg_2);

            get[_arg_2] = value;
        }

        return value;
    }

    public getDefaultPartSet(partType: AvatarFigurePartType, gender: AvatarGenderType): IFigurePartSet | undefined {
        return this._figureData.getDefaultPartSet(partType, gender);
    }

    public getCanvasOffsets(actions: IActiveActionData[], size: AvatarScaleType, direction: number): number[] {
        return this._actionManager.getCanvasOffsets(actions, size, direction);
    }

    public getCanvas(scaleType: AvatarScaleType, geometryType: AvatarGeometryType): AvatarCanvas | undefined {
        return this._geometry?.getCanvas(scaleType, geometryType);
    }

    public removeDynamicItems(avatar: IAvatarImage): void {
        this._geometry?.removeDynamicItems(avatar);
    }

    public getActiveBodyPartIds(k: IActiveActionData, avatar: IAvatarImage): AvatarBodyPartType[] {
        if (!k?.definition || !this._geometry) return [];

        const partIds: AvatarBodyPartType[] = [];
        const geometryType = k.definition.geometryType;

        if (k.definition.isAnimation) {
            const animation = this._animationManager.getAnimation(((k.definition.state + '.') + k.actionParameter));

            if (animation) {
                const animatedPartIds = animation.getAnimatedBodyPartIds(0, k.overridingAction);

                if (animation.hasAddData()) {
                    const partItem = {
                        id: AvatarFigurePartType.None,
                        x: 0,
                        y: 0,
                        z: 0,
                        radius: 0.01,
                        nx: 0,
                        ny: 0,
                        nz: -1,
                        double: true
                    } as IAssetAvatarBodyPartItem;

                    const partSetItem = {
                        setType: ''
                    } as IAssetAvatarPartSetItem;

                    for (const add of animation.addData) {
                        if (!add.align) continue;

                        const bodyPart = this._geometry.getBodyPart(geometryType, add.align);

                        if (!bodyPart) continue;

                        //@ts-expect-error typing issue
                        partItem.id = add.id;

                        bodyPart.addPart(partItem, avatar);

                        //@ts-expect-error typing issue
                        partSetItem.setType = add.id;

                        const partDefinition = this._partSetsData.addPartDefinition(partSetItem);

                        partDefinition.appendToFigure = true;

                        if (add.base === '') partDefinition.staticId = 1;

                        if (partIds.indexOf(bodyPart.id) === -1) partIds.push(bodyPart.id);
                    }
                }

                for (const partId of animatedPartIds) {
                    const bodyPart = this._geometry.getBodyPart(geometryType, partId);

                    if (bodyPart && (partIds.indexOf(bodyPart.id) === -1)) partIds.push(bodyPart.id);
                }
            }
        } else {
            const animatedPartIds = this._partSetsData.getActiveParts(k.definition);

            for (const partId of animatedPartIds) {
                const bodyPart = this._geometry.getBodyPartOfItem(geometryType, partId, avatar);

                if (bodyPart && (partIds.indexOf(bodyPart.id) === -1)) partIds.push(bodyPart.id);
            }
        }

        return partIds;
    }

    public getBodyPartsUnordered(setType: AvatarSetType): AvatarBodyPartType[] {
        return this._geometry?.getBodyPartIdsInAvatarSet(setType) ?? [];
    }

    public getBodyParts(setType: AvatarSetType, geometryType: AvatarGeometryType, direction: number): AvatarBodyPartType[] {
        return this._geometry?.getBodyPartsAtAngle(setType, AvatarDirectionAngle.DIRECTION_TO_ANGLE[direction], geometryType) ?? [];
    }

    public getFrameBodyPartOffset(k: IActiveActionData, direction: number, frame: number, bodyPartId: AvatarBodyPartType): Point {
        if (k.definition) return this._animationData.getAction(k.definition)?.getFrameBodyPartOffset(direction, frame, bodyPartId) ?? AnimationAction.DEFAULT_OFFSET;

        return AnimationAction.DEFAULT_OFFSET;
    }

    public getParts(setType: AvatarBodyPartType, container: IAvatarFigureContainer, activeAction: IActiveActionData, geometryType: AvatarGeometryType, direction: number, removes: string[], avatar: IAvatarImage, layerItems: Map<AvatarFigurePartType, number> = new Map()): AvatarImagePartContainer[] {
        if (!activeAction?.definition || !this._geometry) return [];

        const activeParts = this._partSetsData.getActiveParts(activeAction.definition);
        const animationAction = this._animationData.getAction(activeAction.definition);

        let animation: IAnimation | undefined = undefined;
        let emptyFrames: number[] = [0];

        if (activeAction.definition.isAnimation) {
            animation = this._animationManager.getAnimation(`${activeAction.definition.state}.${activeAction.actionParameter}`);

            if (animation) {
                emptyFrames = this.getPopulatedArray(animation.frameCount(activeAction.overridingAction));

                for (const bodyPartId of animation.getAnimatedBodyPartIds(0, activeAction.overridingAction)) {
                    if (bodyPartId !== setType) continue;

                    const bodyPart = this._geometry.getBodyPart(geometryType, bodyPartId);

                    if (bodyPart) for (const item of bodyPart.getDynamicParts(avatar)) activeParts.push(item.id);
                }
            }
        }

        const requiredPartTypes = this._geometry.getParts(geometryType, setType, direction, activeParts, avatar);
        const baseContainers: AvatarImagePartContainer[] = [];

        for (const figurePartType of container.getPartTypeIds()) {
            if (layerItems && layerItems.get(figurePartType)) continue;

            const partSetType = this._figureData.getSetType(figurePartType);
            const partSetId = container.getPartSetId(figurePartType);
            const partColorIds = container.getPartColorIds(figurePartType);

            if (!partSetType) continue;

            const palette = this._figureData.getPalette(partSetType.paletteId);
            const partSet = partSetType.getPartSet(partSetId);

            if (!palette || !partSet) continue;

            removes = removes.concat(partSet.hiddenLayers);

            for (const part of partSet.parts) {
                if (requiredPartTypes.indexOf(part.type) === -1) continue;

                const animationFrames = animationAction?.getPart(part.type)?.frames ?? emptyFrames;

                let actionDefinition = activeAction.definition;

                if (activeParts.indexOf(part.type) === -1 && this._defaultAction) actionDefinition = this._defaultAction;

                const partDefinition = this._partSetsData.getPartDefinition(part.type);

                let flippedPartType = !partDefinition ? part.type : partDefinition.flippedSetType;

                if (!flippedPartType) flippedPartType = part.type;

                let partColor: IPartColor | undefined = undefined;

                if (partColorIds && (partColorIds.length > (part.colorLayerIndex - 1))) partColor = palette.getColor(partColorIds[(part.colorLayerIndex - 1)]);

                baseContainers.push(new AvatarImagePartContainer(setType, part.type, part.id, partColor, animationFrames, actionDefinition, (part.colorLayerIndex > 0), part.paletteMap, flippedPartType));
            }
        }

        const partContainers: AvatarImagePartContainer[] = [];

        for (const partType of requiredPartTypes) {
            let partColor: IPartColor | undefined = undefined;
            let _local_38 = false;

            const hasLayerItems = layerItems.get(partType);

            for (const partContainer of baseContainers) {
                if (partContainer.partType !== partType) continue;

                if (hasLayerItems) {
                    partColor = partContainer.color;
                } else {
                    _local_38 = true;

                    if (removes.indexOf(partType) === -1) partContainers.push(partContainer);
                }
            }

            if (!_local_38) {
                if (hasLayerItems) {
                    partContainers.push(new AvatarImagePartContainer(setType, partType, layerItems.get(partType) ?? 0, partColor, (animationAction && animationAction.getPart(partType)?.frames) ?? emptyFrames, activeAction.definition, !!partColor, -1, partType, false, 1));
                } else if (activeParts.indexOf(partType) > -1) {
                    const bodyPart = this._geometry.getBodyPartOfItem(geometryType, partType, avatar);

                    if (bodyPart && (setType !== bodyPart.id)) continue;

                    const partDefinition = this._partSetsData.getPartDefinition(partType);

                    if (!partDefinition || !partDefinition.appendToFigure) continue;

                    let isBlended = false;
                    let blend = 1;
                    let partId = 1;

                    if (activeAction.actionParameter !== undefined) partId = activeAction.actionParameter;

                    if (partDefinition.hasStaticId()) partId = partDefinition.staticId;

                    if (animation) {
                        const addData = animation.getAddData(partType);

                        if (addData) {
                            isBlended = addData.isBlended;
                            blend = addData.blend;
                        }
                    }

                    partContainers.push(new AvatarImagePartContainer(setType, partType, partId, undefined, animationAction?.getPart(partType)?.frames ?? emptyFrames, activeAction.definition, false, -1, partType, isBlended, blend));
                }
            }
        }

        return partContainers;
    }

    private getPopulatedArray(size: number): number[] {
        const arr: number[] = [];

        let index = 0;

        while (index < size) {
            arr.push(index);

            index++;
        }

        return arr;
    }

    public getItemIds(): string[] {
        const definition = this._actionManager.getActionDefinition('CarryItem');

        if (!definition) return [];

        const params = definition.params;

        return params.values().toArray();
    }

    public get actionManager(): AvatarActionManager {
        return this._actionManager;
    }

    public get figureData(): IStructureData {
        return this._figureData;
    }

    public get partData(): PartSetsData {
        return this._partSetsData;
    }

    public get animationManager(): AnimationManager {
        return this._animationManager;
    }
}

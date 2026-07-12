import type { IAvatarImage, IAvatarImageListener, IGraphicAsset } from '@nitrodevco/nitro-api';
import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { AvatarSetType, type IObjectVisualizationData, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import type { Texture } from 'pixi.js';

import { FurnitureMannequinVisualizationData } from './FurnitureMannequinVisualizationData';
import { FurnitureVisualization } from './FurnitureVisualization';
export class FurnitureMannequinVisualization extends FurnitureVisualization implements IAvatarImageListener {
    private static AVATAR_IMAGE_SPRITE_TAG: string = 'avatar_image';

    private _mannequinScale: RoomGeometryScaleType = RoomGeometryScaleType.None;
    private _figure: string = '';
    private _gender: string = '';
    private _avatarImage: IAvatarImage | undefined = undefined;
    private _avatarWidth: number = 90;
    private _avatarHeight: number = 130;
    private _needsUpdate: boolean = false;
    private _placeHolderFigure: string = 'hd-99999-99998';
    private _disposed: boolean = false;

    public override initialize(data: IObjectVisualizationData): boolean {
        if (!(data instanceof FurnitureMannequinVisualizationData)) return false;

        return super.initialize(data);
    }

    public override dispose(): void {
        if (this._disposed) return;

        this._disposed = true;

        if (this._avatarImage) {
            this._avatarImage.dispose();

            this._avatarImage = undefined;
        }

        super.dispose();
    }

    protected override updateObject(scale: RoomGeometryScaleType, direction: number): boolean {
        if (!super.updateObject(scale, direction)) return false;

        if (this._mannequinScale !== scale) {
            this._mannequinScale = scale;

            this.updateAvatar();
        }

        return true;
    }

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        let updateModel = super.updateModel(scale);

        if (updateModel) {
            const figure = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureMannequinFigure) || null;

            if (figure) {
                this._figure = `${figure}.${this._placeHolderFigure}`;
                this._gender =
                    this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureMannequinGender) ?? '';

                this.updateAvatar();
            }
        }

        updateModel = updateModel || this._needsUpdate;

        this._needsUpdate = false;

        return updateModel;
    }

    private updateAvatar(): void {
        if (this._avatarImage) {
            this._avatarImage.dispose();

            this._avatarImage = undefined;
        }

        this._avatarImage = this.data.createAvatarImage(this._figure, this._mannequinScale, this._gender, this);
    }

    public resetFigure(figure: string): void {
        this.updateAvatar();

        this._needsUpdate = true;
    }

    protected override getLayerXOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (
            this.getLayerTag(scale, direction, layerId) === FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG &&
            this._avatarImage
        )
            return -this._avatarWidth / 3;

        return super.getLayerXOffset(scale, direction, layerId);
    }

    protected override getLayerYOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (
            this.getLayerTag(scale, direction, layerId) === FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG &&
            this._avatarImage
        )
            return -this._avatarHeight / 3;

        return super.getLayerYOffset(scale, direction, layerId);
    }

    public override getTexture(scale: RoomGeometryScaleType, layerId: number, asset: IGraphicAsset): Texture {
        if (
            this.getLayerTag(scale, this.direction, layerId) ===
            FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG &&
            this._avatarImage
        ) {
            this._avatarImage.setDirection(AvatarSetType.Full, this.direction);

            return this._avatarImage.processAsTexture(AvatarSetType.Full, false);
        }

        return super.getTexture(scale, layerId, asset);
    }

    protected override get data(): FurnitureMannequinVisualizationData {
        return this._data as FurnitureMannequinVisualizationData;
    }
}

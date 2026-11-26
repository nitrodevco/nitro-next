import { RoomGeometryScaleType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { AnimatedFurnitureVisualization } from './AnimatedFurnitureVisualization';

/**
 * Port of Flash's obfuscated `§_-QC§`, the visualization `RoomObjectVisualizationFactory` builds
 * for `furniture_badge_display`.
 */
export class FurnitureBadgeDisplayVisualization extends AnimatedFurnitureVisualization {
    private static BADGE: string = 'BADGE';

    private _badgeAssetNameNormalScale: string = '';
    private _badgeAssetNameSmallScale: string = '';
    private _badgeVisibleInState: number = -1;

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        let updateModel = super.updateModel(scale);

        const badgeStatus = this.object.model.getValue<number>(RoomObjectVariableEnum.FurnitureBadgeImageStatus);

        // The first badge to load is the one shown from then on, as in Flash.
        if (typeof badgeStatus === 'number' && !isNaN(badgeStatus) && badgeStatus !== 0 && this._badgeAssetNameNormalScale === '') {
            this._badgeAssetNameNormalScale = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureBadgeAssetName) ?? '';

            if (this._badgeAssetNameSmallScale === '')
                this._badgeAssetNameSmallScale = this._badgeAssetNameNormalScale + '_32';

            const visibleInState = this.object.model.getValue<number>(
                RoomObjectVariableEnum.FurnitureBadgeVisibleInState,
            );

            if (typeof visibleInState === 'number' && !isNaN(visibleInState)) this._badgeVisibleInState = visibleInState;

            updateModel = true;
        }

        return updateModel;
    }

    protected override getSpriteAssetName(scale: RoomGeometryScaleType, layerId: number): string {
        const tag = this.getLayerTag(scale, this.direction, layerId);

        if (
            tag !== FurnitureBadgeDisplayVisualization.BADGE
            || (this._badgeVisibleInState !== -1 && this.object.getState(0) !== this._badgeVisibleInState)
        )
            return super.getSpriteAssetName(scale, layerId);

        if (scale === RoomGeometryScaleType.ZoomedOut) return this._badgeAssetNameSmallScale;

        return this._badgeAssetNameNormalScale;
    }

    protected override getLayerXOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        let offset = super.getLayerXOffset(scale, direction, layerId);

        if (this.getLayerTag(scale, direction, layerId) === FurnitureBadgeDisplayVisualization.BADGE) {
            const asset = this.getAsset(
                scale === RoomGeometryScaleType.ZoomedOut ? this._badgeAssetNameSmallScale : this._badgeAssetNameNormalScale,
                layerId,
            );

            if (asset) {
                if (scale === RoomGeometryScaleType.ZoomedIn) {
                    offset += (40 - asset.width) / 2;

                    if (direction === 2 && (this._type === 'china_c24_resolution1' || this._type === 'china_c24_resolution2'))
                        offset -= 40;
                } else {
                    offset += (20 - asset.width) / 2;
                }
            }
        }

        return offset;
    }

    protected override getLayerYOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        let offset = super.getLayerYOffset(scale, direction, layerId);

        if (this.getLayerTag(scale, direction, layerId) === FurnitureBadgeDisplayVisualization.BADGE) {
            const asset = this.getAsset(
                scale === RoomGeometryScaleType.ZoomedOut ? this._badgeAssetNameSmallScale : this._badgeAssetNameNormalScale,
                layerId,
            );

            if (asset) {
                if (scale === RoomGeometryScaleType.ZoomedIn) offset += (40 - asset.height) / 2;
                else offset += (20 - asset.height) / 2;
            }
        }

        return offset;
    }
}

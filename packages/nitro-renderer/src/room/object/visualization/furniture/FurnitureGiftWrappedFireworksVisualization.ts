import type { IRoomGeometry, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureFireworksVisualization } from './FurnitureFireworksVisualization';

export class FurnitureGiftWrappedFireworksVisualization extends FurnitureFireworksVisualization {
    private static PRESENT_DEFAULT_STATE: number = 0;
    private static MAX_PACKET_TYPE_VALUE: number = 9;
    private static MAX_RIBBON_TYPE_VALUE: number = 11;

    private _packetType: number = 0;
    private _ribbonType: number = 0;
    private _lastAnimationId: number = 0;

    public override update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean) {
        this.updatePresentWrap();

        super.update(geometry, time, update, skipUpdate);
    }

    private updatePresentWrap(): void {
        if (!this.object) return;

        const local3 = 1000;
        const extras = this.object.model.getValue<number>(RoomObjectVariableEnum.FurnitureExtras);
        const packetType = Math.floor(extras / local3);
        const ribbonType = extras % local3;

        this._packetType =
            packetType > FurnitureGiftWrappedFireworksVisualization.MAX_PACKET_TYPE_VALUE ? 0 : packetType;
        this._ribbonType =
            ribbonType > FurnitureGiftWrappedFireworksVisualization.MAX_RIBBON_TYPE_VALUE ? 0 : ribbonType;
    }

    public override getFrameNumber(scale: RoomGeometryScaleType, layerId: number): number {
        if (this._lastAnimationId === FurnitureGiftWrappedFireworksVisualization.PRESENT_DEFAULT_STATE) {
            if (layerId <= 1) return this._packetType;

            if (layerId === 2) return this._ribbonType;
        }

        return super.getFrameNumber(scale, layerId);
    }

    public override getSpriteAssetName(scale: RoomGeometryScaleType, layerId: number): string {
        const size = this.getValidSize(scale);

        let assetName = this._type;
        let layerCode = '';

        if (layerId < this.spriteCount - 1) {
            layerCode = String.fromCharCode('a'.charCodeAt(0) + layerId);
        } else {
            layerCode = 'sd';
        }

        const frameNumber = this.getFrameNumber(scale, layerId);

        assetName = assetName + ('_' + size + '_' + layerCode + '_' + this.direction);
        assetName = assetName + ('_' + frameNumber);

        return assetName;
    }

    protected override setAnimation(animationId: number): void {
        this._lastAnimationId = animationId;

        super.setAnimation(animationId);
    }
}

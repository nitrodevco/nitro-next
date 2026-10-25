import { IRoomObjectUpdateMessage, MapDataType, RoomObjectFurniIconAssetEvent, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { GetTickerTime } from '#renderer/utils';

import { ObjectDataUpdateMessage, ObjectFurniIconUpdateMessage } from '../../../messages';
import { FurnitureChestLogic } from './FurnitureChestLogic';

/** What a `visuals` entry names: `isWallItem,typeId[,extra]`. */
interface IChestItemType {
    isWallItem: boolean;
    typeId: number;
    extra: string;
}

/**
 * Port of Flash `FurnitureFurniChestLogic` (obfuscated `§_-Z2u§`, `furniture_furnichest`): a
 * wired furni chest that, while open (an odd state), shows what it holds. The chest's map data
 * carries the items as `visuals` - `isWallItem,typeId[,extra]` entries joined by `;` - and for
 * each one the logic asks the room for the item's icon (`RoomObjectFurniIconAssetEvent`). The
 * asset names the room answers with (`ObjectFurniIconUpdateMessage`), `loading_icon` until the
 * download lands, go on the model as `furniture_furni_chest_shown_asset_names` for
 * `FurnitureFurniChestVisualization` to float above the chest.
 */
export class FurnitureFurniChestLogic extends FurnitureChestLogic {
    private static LOADING_ICON_PLACEHOLDER: string = 'loading_icon';
    private static VISUALS_KEY: string = 'visuals';

    private _visuals: string = '';
    private _assetNamesForVisuals: Map<string, string> = new Map();

    private static itemTypeToString(isWallItem: boolean, typeId: number, extra: string): string {
        let value = String(isWallItem) + ',' + typeId;

        if (extra !== '') value += ',' + extra;

        return value;
    }

    private static stringToItemType(value: string): IChestItemType {
        const parts = value.split(',');

        return {
            isWallItem: parts[0] === 'true',
            typeId: parseInt(parts[1]) || 0,
            extra: (parts.length > 2) ? parts[2] : '',
        };
    }

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectFurniIconAssetEvent.LOAD_FURNI_ICON ]);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage && message.data instanceof MapDataType) {
            let visuals: string | undefined = message.data.getValue(FurnitureFurniChestLogic.VISUALS_KEY);

            if ((message.state % 2) !== 1) visuals = '';

            if ((visuals !== undefined) && (visuals !== null) && (visuals !== this._visuals)) {
                this._visuals = visuals;

                this.onVisualsChange();

                this.object.model.setValue(RoomObjectVariableEnum.FurnitureFurniChestShownAssetNames, this.shownAssetsString);

                this.update(GetTickerTime());
            }
        }

        if (message instanceof ObjectFurniIconUpdateMessage) {
            if (message.assetName === FurnitureFurniChestLogic.LOADING_ICON_PLACEHOLDER) return;

            const key = FurnitureFurniChestLogic.itemTypeToString(message.wallItem, message.typeId, message.extra);

            if (this._assetNamesForVisuals.get(key) !== FurnitureFurniChestLogic.LOADING_ICON_PLACEHOLDER) return;

            this._assetNamesForVisuals.set(key, message.assetName);

            this.object.model.setValue(RoomObjectVariableEnum.FurnitureFurniChestShownAssetNames, this.shownAssetsString);

            this.update(GetTickerTime());
        }
    }

    private onVisualsChange(): void {
        this._assetNamesForVisuals = new Map();

        for (const visual of this._visuals.split(';')) {
            if (visual === '') continue;

            this._assetNamesForVisuals.set(visual, FurnitureFurniChestLogic.LOADING_ICON_PLACEHOLDER);

            const itemType = FurnitureFurniChestLogic.stringToItemType(visual);

            this.handleRoomObjectEvent(new RoomObjectFurniIconAssetEvent(RoomObjectFurniIconAssetEvent.LOAD_FURNI_ICON, this.object, itemType.isWallItem, itemType.typeId, itemType.extra));
        }
    }

    private get shownAssetsString(): string {
        const names: string[] = [];

        for (const visual of this._visuals.split(';')) {
            if (visual !== '') names.push(this._assetNamesForVisuals.get(visual) ?? '');
        }

        return names.join(',');
    }
}

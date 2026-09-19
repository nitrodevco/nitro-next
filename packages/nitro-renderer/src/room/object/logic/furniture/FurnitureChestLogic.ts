import { IRoomObjectUpdateMessage, MapDataType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

/**
 * The wired trading chests (`furniture_coinschest`, and the base of `furniture_furnichest`) -
 * the Flash chest logic both of them extend. It lifts the `is_wired_enabled` flag out of the
 * chest's map data so the visualization can show or hide the wired emblem.
 */
export class FurnitureChestLogic extends FurnitureLogic {
    private static IS_WIRED_ENABLED_KEY: string = 'is_wired_enabled';

    private _isWiredEnabled: boolean = false;

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (!(message instanceof ObjectDataUpdateMessage) || !(message.data instanceof MapDataType)) return;

        const isWiredEnabled = (message.data.getValue(FurnitureChestLogic.IS_WIRED_ENABLED_KEY) === '1');

        if (isWiredEnabled === this._isWiredEnabled) return;

        this._isWiredEnabled = isWiredEnabled;

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureChestIsWiredEnabled, isWiredEnabled ? 1 : 0);
    }
}

import { IAssetData, IRoomObjectUpdateMessage, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { ObjectTileCursorUpdateMessage } from '../../messages';
import { ObjectLogicBase } from './ObjectLogicBase';

/** Port of Flash `RoomTileCursorLogic`, the logic `RoomObjectFactory` builds for `tile_cursor`. */
export class RoomTileCursorLogic extends ObjectLogicBase {
    private static CURSOR_VISIBLE_STATE: number = 0;
    private static CURSOR_HIDDEN_STATE: number = 1;
    private static CURSOR_HEIGHT_STATE: number = 6;

    private _lastEventId: number = -1;
    private _isHidden: boolean = false;

    public override initialize(data: IAssetData): void {
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureAlphaMultiplier, 1);

        this.object.setState(RoomTileCursorLogic.CURSOR_HIDDEN_STATE, 0);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (
            !message
            || !(message instanceof ObjectTileCursorUpdateMessage)
            || (this._lastEventId && this._lastEventId === message.sourceEventId)
        )
            return;

        if (message.toggleVisibility) this._isHidden = !this._isHidden;

        super.processUpdateMessage(message);

        if (this._isHidden) {
            this.object.setState(RoomTileCursorLogic.CURSOR_HIDDEN_STATE, 0);
        } else if (!message.visible) {
            this.object.setState(RoomTileCursorLogic.CURSOR_HIDDEN_STATE, 0);
        } else {
            this.object.model.setValue(RoomObjectVariableEnum.TileCursorHeight, message.height);

            this.object.setState(
                message.height > 0.8 ? RoomTileCursorLogic.CURSOR_HEIGHT_STATE : RoomTileCursorLogic.CURSOR_VISIBLE_STATE,
            );
        }

        this._lastEventId = message.sourceEventId;
    }
}

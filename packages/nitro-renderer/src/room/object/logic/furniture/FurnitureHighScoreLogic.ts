import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureHighScoreLogic extends FurnitureLogic {
    private static SHOW_WIDGET_IN_STATE = 1;

    private _state = -1;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectWidgetRequestEvent.HIGH_SCORE_DISPLAY,
            RoomObjectWidgetRequestEvent.HIDE_HIGH_SCORE_DISPLAY,
        ]);
    }

    public override tearDown(): void {
        if (this.isRealRoomObject())
            this.dispatchEvent(
                new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.HIDE_HIGH_SCORE_DISPLAY, this.object),
            );

        super.tearDown();
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (!this.isRealRoomObject()) return;

        if (message instanceof ObjectDataUpdateMessage) {
            if (message.state === FurnitureHighScoreLogic.SHOW_WIDGET_IN_STATE) {
                this.dispatchEvent(
                    new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.HIGH_SCORE_DISPLAY, this.object),
                );
            } else {
                this.dispatchEvent(
                    new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.HIDE_HIGH_SCORE_DISPLAY, this.object),
                );
            }

            this._state = message.state;
        }
    }
}

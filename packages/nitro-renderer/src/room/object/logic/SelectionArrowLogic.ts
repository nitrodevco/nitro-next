import type { IAssetData, IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectVariable } from '@nitrodevco/nitro-api';

import { ObjectVisibilityUpdateMessage } from '../../messages';
import { RoomObjectLogicBase } from './RoomObjectLogicBase';

export class SelectionArrowLogic extends RoomObjectLogicBase {
    public override initialize(data: IAssetData): void {
        this.object.model.setValue(RoomObjectVariable.FURNITURE_ALPHA_MULTIPLIER, 1);

        this.object.setState(1, 0);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (!message) return;

        super.processUpdateMessage(message);

        if (message instanceof ObjectVisibilityUpdateMessage) {
            switch (message.type) {
                case ObjectVisibilityUpdateMessage.ENABLED:
                    this.object.setState(0, 0);
                    break;
                case ObjectVisibilityUpdateMessage.DISABLED:
                    this.object.setState(1, 0);
                    break;
            }

            return;
        }
    }
}

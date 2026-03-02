import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectDataRequestEvent, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureYoutubeLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectWidgetRequestEvent.YOUTUBE,
            RoomObjectDataRequestEvent.RODRE_URL_PREFIX,
        ]);
    }

    public override update(time: number): void {
        super.update(time);

        if (!this.object.model.getValue<string>(RoomObjectVariableEnum.SessionUrlPrefix))
            this.handleRoomObjectEvent(
                new RoomObjectDataRequestEvent(RoomObjectDataRequestEvent.RODRE_URL_PREFIX, this.object),
            );
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.YOUTUBE, this.object));
    }
}

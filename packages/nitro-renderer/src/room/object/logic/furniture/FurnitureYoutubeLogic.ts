import { RoomObjectDataRequestEvent, RoomObjectVariableEnum, RoomWidgetEnum } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash's obfuscated `§_-E2d§`, the logic `RoomObjectFactory` builds for
 * `furniture_youtube`.
 */
export class FurnitureYoutubeLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectDataRequestEvent.RODRE_URL_PREFIX ]);
    }

    public override update(time: number): void {
        super.update(time);

        const prefix = this.object.model.getValue<string>(RoomObjectVariableEnum.SessionUrlPrefix);

        // `hasString`: an empty prefix is still a prefix.
        if (prefix === undefined || prefix === null)
            this.handleRoomObjectEvent(
                new RoomObjectDataRequestEvent(RoomObjectDataRequestEvent.RODRE_URL_PREFIX, this.object),
            );
    }

    public override get widget(): string {
        return RoomWidgetEnum.YOUTUBE;
    }
}

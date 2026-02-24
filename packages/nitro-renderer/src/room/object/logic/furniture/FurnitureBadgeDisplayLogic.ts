import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum, StringDataType } from '@nitrodevco/nitro-api';
import { RoomObjectBadgeAssetEvent, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { GetTickerTime } from '../../../../utils';
import { ObjectDataUpdateMessage, ObjectGroupBadgeUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureBadgeDisplayLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectWidgetRequestEvent.BADGE_DISPLAY_ENGRAVING,
            RoomObjectBadgeAssetEvent.LOAD_BADGE,
        ]);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            const data = message.data;

            if (data instanceof StringDataType) this.updateBadge(data.getValue(1));

            return;
        }

        if (message instanceof ObjectGroupBadgeUpdateMessage) {
            if (message.assetName !== 'loading_icon') {
                this.object.model.setValue(RoomObjectVariableEnum.FurnitureBadgeAssetName, message.assetName);
                this.object.model.setValue(RoomObjectVariableEnum.FurnitureBadgeImageStatus, 1);

                this.update(GetTickerTime());
            }

            return;
        }
    }

    public override useObject(): void {
        this.dispatchEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.BADGE_DISPLAY_ENGRAVING, this.object),
        );
    }

    protected updateBadge(badgeId: string): void {
        if (badgeId === '') return;

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureBadgeImageStatus, -1);

        this.dispatchEvent(
            new RoomObjectBadgeAssetEvent(RoomObjectBadgeAssetEvent.LOAD_BADGE, this.object, badgeId, false),
        );
    }
}

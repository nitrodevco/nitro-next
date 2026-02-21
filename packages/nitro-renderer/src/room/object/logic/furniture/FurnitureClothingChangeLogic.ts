import type { IAssetData, IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectVariable } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureClothingChangeLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.CLOTHING_CHANGE]);
    }

    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        this.updateClothingData(this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA));
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) this.updateClothingData(message.data.getLegacyString());
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.CLOTHING_CHANGE, this.object));
    }

    private updateClothingData(data: string): void {
        if (!data || !data.length) return;

        const [male, female] = data.split(',');

        if (male && male.length) this.object.model.setValue<string>(RoomObjectVariable.FURNITURE_CLOTHING_BOY, male);
        if (female && female.length)
            this.object.model.setValue<string>(RoomObjectVariable.FURNITURE_CLOTHING_GIRL, female);
    }
}

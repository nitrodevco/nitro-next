import type { IAssetData, IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectFurnitureActionEvent, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { ObjectItemDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureStickieLogic extends FurnitureLogic {
    private static STICKIE_COLORS: string[] = ['9CCEFF', 'FF9CFF', '9CFF9C', 'FFFF33'];

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectWidgetRequestEvent.STICKIE,
            RoomObjectFurnitureActionEvent.STICKIE,
        ]);
    }

    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        this.updateColor();

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureIsStickie, '');
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectItemDataUpdateMessage)
            this.handleRoomObjectEvent(
                new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.STICKIE, this.object),
            );

        this.updateColor();
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.STICKIE, this.object),
        );
    }

    protected updateColor(): void {
        const furnitureData = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureData);

        let colorIndex = FurnitureStickieLogic.STICKIE_COLORS.indexOf(furnitureData);

        if (colorIndex < 0) colorIndex = 3;

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureColor, colorIndex + 1);
    }
}

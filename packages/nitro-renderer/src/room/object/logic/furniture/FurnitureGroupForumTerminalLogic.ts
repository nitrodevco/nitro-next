import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { FurnitureGuildCustomizedLogic } from './FurnitureGuildCustomizedLogic';

export class FurnitureGroupForumTerminalLogic extends FurnitureGuildCustomizedLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.INERNAL_LINK]);
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.INERNAL_LINK, this.object));

        super.useObject();
    }

    protected override updateGroupId(id: string): void {
        super.updateGroupId(id);

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureInternalLink, `groupforum/${id}`);
    }
}

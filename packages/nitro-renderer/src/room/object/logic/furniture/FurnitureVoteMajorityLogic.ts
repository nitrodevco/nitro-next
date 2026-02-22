import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum, VoteDataType } from '@nitrodevco/nitro-api';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureVoteMajorityLogic extends FurnitureMultiStateLogic {
    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            const data = message.data;

            if (data instanceof VoteDataType)
                this.object.model.setValue(RoomObjectVariableEnum.FurnitureVoteMajorityResult, data.result);
        }
    }
}

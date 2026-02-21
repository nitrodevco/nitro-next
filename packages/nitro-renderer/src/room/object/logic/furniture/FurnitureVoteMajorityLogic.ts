import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectVariable, VoteDataType } from '@nitrodevco/nitro-api';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureVoteMajorityLogic extends FurnitureMultiStateLogic {
    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            const data = message.data;

            if (data instanceof VoteDataType)
                this.object.model.setValue(RoomObjectVariable.FURNITURE_VOTE_MAJORITY_RESULT, data.result);
        }
    }
}

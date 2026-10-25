import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRoomVisitsDatad } from './IRoomVisitsDatad';

export const RoomVisitsDatadParser = (wrapper: IMessageDataWrapper): IRoomVisitsDatad => {
    return {
        roomId: wrapper.readInt(),
        roomName: wrapper.readString(),
        enterHour: wrapper.readInt(),
        enterMinute: wrapper.readInt(),
    };
};

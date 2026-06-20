import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetRoomSessionTagsComposerType = {
    tag1: string;
    tag2: string;
};

export class SetRoomSessionTagsComposer implements IOutgoingPacket<SetRoomSessionTagsComposerType> {
    public constructor(private params: SetRoomSessionTagsComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.tag1,
            this.params.tag2,
        ];
    }
}

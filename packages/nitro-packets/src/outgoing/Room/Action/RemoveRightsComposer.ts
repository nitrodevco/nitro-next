import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveRightsComposerType = {
    userIds: number[];
};

export class RemoveRightsComposer implements IOutgoingPacket<RemoveRightsComposerType> {
    public constructor(private params: RemoveRightsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userIds.length, ...this.params.userIds
        ];
    }
}

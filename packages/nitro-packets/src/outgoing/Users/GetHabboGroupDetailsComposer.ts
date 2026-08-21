import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// GetHabboGroupDetailsMessageComposer(groupId:int, open:Boolean)
export type GetHabboGroupDetailsComposerType = {
    groupId: number;
    open: boolean;
};

export class GetHabboGroupDetailsComposer implements IOutgoingPacket<GetHabboGroupDetailsComposerType> {
    public constructor(private params: GetHabboGroupDetailsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.open,
        ];
    }
}

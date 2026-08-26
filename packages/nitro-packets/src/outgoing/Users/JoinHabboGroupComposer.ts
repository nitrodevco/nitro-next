import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/* JoinHabboGroupMessageComposer (1469) — groupId */
export type JoinHabboGroupComposerType = {
    groupId: number;
};

export class JoinHabboGroupComposer implements IOutgoingPacket<JoinHabboGroupComposerType> {
    public constructor(private params: JoinHabboGroupComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
        ];
    }
}

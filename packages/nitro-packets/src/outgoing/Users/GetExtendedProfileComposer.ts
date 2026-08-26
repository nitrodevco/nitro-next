import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// GetExtendedProfileMessageComposer(userId:int)
export type GetExtendedProfileComposerType = {
    userId: number;
};

export class GetExtendedProfileComposer implements IOutgoingPacket<GetExtendedProfileComposerType> {
    public constructor(private params: GetExtendedProfileComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId,
        ];
    }
}

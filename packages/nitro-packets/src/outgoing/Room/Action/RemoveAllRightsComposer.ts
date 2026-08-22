import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/* RemoveAllRightsMessageComposer (159) — roomId */
export type RemoveAllRightsComposerType = {
    roomId: number;
};

export class RemoveAllRightsComposer implements IOutgoingPacket<RemoveAllRightsComposerType> {
    public constructor(private params: RemoveAllRightsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
        ];
    }
}

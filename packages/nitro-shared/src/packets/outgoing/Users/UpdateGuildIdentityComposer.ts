import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateGuildIdentityComposerType = object;

export class UpdateGuildIdentityComposer implements IOutgoingPacket<UpdateGuildIdentityComposerType> {
    public constructor(private params: UpdateGuildIdentityComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

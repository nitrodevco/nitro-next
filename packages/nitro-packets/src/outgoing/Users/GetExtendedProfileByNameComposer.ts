import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetExtendedProfileByNameComposerType = object;

export class GetExtendedProfileByNameComposer implements IOutgoingPacket<GetExtendedProfileByNameComposerType> {
    public constructor(private params: GetExtendedProfileByNameComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

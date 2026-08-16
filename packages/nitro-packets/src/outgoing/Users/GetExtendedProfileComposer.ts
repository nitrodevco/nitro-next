import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetExtendedProfileComposerType = object;

export class GetExtendedProfileComposer implements IOutgoingPacket<GetExtendedProfileComposerType> {
    public constructor(private params: GetExtendedProfileComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

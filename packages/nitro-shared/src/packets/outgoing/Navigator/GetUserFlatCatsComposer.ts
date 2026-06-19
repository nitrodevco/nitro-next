import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetUserFlatCatsComposerType = object;

export class GetUserFlatCatsComposer implements IOutgoingPacket<GetUserFlatCatsComposerType> {
    public constructor(private params: GetUserFlatCatsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

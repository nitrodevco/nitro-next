import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetUserEventCatsComposerType = object;

export class GetUserEventCatsComposer implements IOutgoingPacket<GetUserEventCatsComposerType> {
    public constructor(private params: GetUserEventCatsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

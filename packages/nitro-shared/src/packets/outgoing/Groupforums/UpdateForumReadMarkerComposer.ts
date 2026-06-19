import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateForumReadMarkerComposerType = object;

export class UpdateForumReadMarkerComposer implements IOutgoingPacket<UpdateForumReadMarkerComposerType> {
    public constructor(private params: UpdateForumReadMarkerComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

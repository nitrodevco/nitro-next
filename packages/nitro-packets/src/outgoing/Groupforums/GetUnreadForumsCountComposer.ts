import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetUnreadForumsCountComposerType = object;

export class GetUnreadForumsCountComposer implements IOutgoingPacket<GetUnreadForumsCountComposerType> {
    public constructor(private params: GetUnreadForumsCountComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

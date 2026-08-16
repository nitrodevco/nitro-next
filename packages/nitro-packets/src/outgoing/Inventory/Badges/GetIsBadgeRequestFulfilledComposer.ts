import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetIsBadgeRequestFulfilledComposerType = object;

export class GetIsBadgeRequestFulfilledComposer implements IOutgoingPacket<GetIsBadgeRequestFulfilledComposerType> {
    public constructor(private params: GetIsBadgeRequestFulfilledComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

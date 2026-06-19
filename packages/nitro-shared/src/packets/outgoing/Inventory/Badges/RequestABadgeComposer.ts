import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RequestABadgeComposerType = object;

export class RequestABadgeComposer implements IOutgoingPacket<RequestABadgeComposerType> {
    public constructor(private params: RequestABadgeComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

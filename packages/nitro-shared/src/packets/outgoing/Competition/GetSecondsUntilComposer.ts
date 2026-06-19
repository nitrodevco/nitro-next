import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSecondsUntilComposerType = object;

export class GetSecondsUntilComposer implements IOutgoingPacket<GetSecondsUntilComposerType> {
    public constructor(private params: GetSecondsUntilComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

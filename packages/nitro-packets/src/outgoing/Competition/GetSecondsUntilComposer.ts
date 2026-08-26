import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSecondsUntilComposerType = {
    timeStr: string;
};

export class GetSecondsUntilComposer implements IOutgoingPacket<GetSecondsUntilComposerType> {
    public constructor(private params: GetSecondsUntilComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.timeStr,
        ];
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `GetSecondsUntilMessageComposer`: how long until a hotel-time string (`2026-09-17 15:00`). */
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

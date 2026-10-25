// Body filled by hand from the 2026 client's own composer - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveBotFromFlatComposerType = {
    /** The bot's own id, not its room object's. */
    botId: number;
};

export class RemoveBotFromFlatComposer implements IOutgoingPacket<RemoveBotFromFlatComposerType> {
    public constructor(private params: RemoveBotFromFlatComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.botId,
        ];
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PlaceBotComposerType = {
    botId: number;
    /** The tile to drop the bot on; the inventory sends 0,0 and lets the server pick. */
    x: number;
    y: number;
};

export class PlaceBotComposer implements IOutgoingPacket<PlaceBotComposerType> {
    public constructor(private params: PlaceBotComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.botId,
            this.params.x,
            this.params.y,
        ];
    }
}

import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChatComposerType = {
    text: string;
    styleId: number;
    /** The Flash `RoomSession` incremented this per message for its lag tracking map. */
    trackingId?: number;
};

/** Flash `_Str_7738`: `[text, styleId, trackingId]`. */
export class ChatComposer implements IOutgoingPacket<ChatComposerType> {
    public constructor(private params: ChatComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.text,
            this.params.styleId,
            this.params.trackingId ?? -1,
        ];
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WhisperComposerType = {
    recipientName: string;
    text: string;
    styleId: number;
};

/** Flash `_Str_10169`: the recipient's name and the text joined by a space, then the style id. */
export class WhisperComposer implements IOutgoingPacket<WhisperComposerType> {
    public constructor(private params: WhisperComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            `${this.params.recipientName} ${this.params.text}`,
            this.params.styleId,
        ];
    }
}

// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SendHabbiconComposerType = {
    chatId: number;
    habbiconId: number;
    confirmationId: number;
};

/** `SendHabbiconMessageComposer` (`_-Vl`): a habbicon sent in a conversation from the messenger's picker (`MainView.onHabbiconSelected`). */
export class SendHabbiconComposer implements IOutgoingPacket<SendHabbiconComposerType> {
    public constructor(private params: SendHabbiconComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chatId,
            this.params.habbiconId,
            this.params.confirmationId,
        ];
    }
}

import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SendMsgComposerType = {
    chatId: number;
    message: string;
    confirmationId: number;
};

export class SendMsgComposer implements IOutgoingPacket<SendMsgComposerType> {
    public constructor(private params: SendMsgComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chatId,
            this.params.message,
            this.params.confirmationId,
        ];
    }
}

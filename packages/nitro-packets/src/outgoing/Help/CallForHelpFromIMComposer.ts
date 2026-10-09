import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `CallForHelpFromIMMessageComposer(message, topicId, reportedUserId, chatEntries, name, email)`. */
export type CallForHelpFromIMComposerType = {
    message: string;
    topicId: number;
    reportedUserId: number;
    /** `ChatReportController.collectSelectedEntries(3, user)`: user id and text, one pair per message. */
    chatEntries: (number | string)[];
    name: string;
    email: string;
};

export class CallForHelpFromIMComposer implements IOutgoingPacket<CallForHelpFromIMComposerType> {
    public constructor(private params: CallForHelpFromIMComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.message,
            this.params.topicId,
            this.params.reportedUserId,
            this.params.chatEntries.length / 2,
            ...this.params.chatEntries,
            this.params.name,
            this.params.email,
        ];
    }
}

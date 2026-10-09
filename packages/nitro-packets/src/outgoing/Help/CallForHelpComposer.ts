import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `CallForHelpMessageComposer(message, topicId, reportedUserId, roomId, chatEntries, name, email)`. */
export type CallForHelpComposerType = {
    message: string;
    topicId: number;
    reportedUserId: number;
    roomId: number;
    /** `ChatReportController.collectSelectedEntries`: user id and text, one pair per chat line. */
    chatEntries: (number | string)[];
    /** The unlawful activity report's name and email; empty otherwise. */
    name: string;
    email: string;
};

export class CallForHelpComposer implements IOutgoingPacket<CallForHelpComposerType> {
    public constructor(private params: CallForHelpComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.message,
            this.params.topicId,
            this.params.reportedUserId,
            this.params.roomId,
            this.params.chatEntries.length / 2,
            ...this.params.chatEntries,
            this.params.name,
            this.params.email,
        ];
    }
}

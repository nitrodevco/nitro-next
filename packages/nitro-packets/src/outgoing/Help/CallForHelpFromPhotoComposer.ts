import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `CallForHelpFromPhotoMessageComposer(extraDataId, roomId, reportedUserId, topicId, roomObjectId, name, email)`. */
export type CallForHelpFromPhotoComposerType = {
    extraDataId: string;
    roomId: number;
    reportedUserId: number;
    topicId: number;
    roomObjectId: number;
    name: string;
    email: string;
};

export class CallForHelpFromPhotoComposer implements IOutgoingPacket<CallForHelpFromPhotoComposerType> {
    public constructor(private params: CallForHelpFromPhotoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.extraDataId,
            this.params.roomId,
            this.params.reportedUserId,
            this.params.topicId,
            this.params.roomObjectId,
            this.params.name,
            this.params.email,
        ];
    }
}

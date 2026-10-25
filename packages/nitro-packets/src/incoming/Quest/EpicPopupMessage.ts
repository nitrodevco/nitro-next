import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// Body filled by hand from the 2026 client's own parser (EpicPopupMessageParser.as:15) - the generator has no preserve step, so re-apply after a regeneration.
export type EpicPopupMessageType = {
    /** The picture the popup shows (`HabboEpicPopupView.showPopup`: `content_static_bitmap.assetUri`). */
    imageUri: string;
};

export class EpicPopupMessage implements IIncomingPacket<EpicPopupMessageType> {
    public parse(wrapper: IMessageDataWrapper): EpicPopupMessageType {
        return { imageUri: wrapper.readString() };
    }
}

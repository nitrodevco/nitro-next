// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredClickUserResponseMessageType = {
    /** The room index of the user that was clicked - what `WiredClickUserComposer` sent. */
    index: number;
    /** Whether the avatar menu should still open; false when a wired handled the click. */
    openMenu: boolean;
};

/** The answer to `WiredClickUserComposer`. Flash parser `userdefinedroomevents._-Z2g`; `AvatarInfoWidget` waits for it before opening the menu. */
export class WiredClickUserResponseMessage implements IIncomingPacket<WiredClickUserResponseMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredClickUserResponseMessageType {
        const index = wrapper.readInt();
        const openMenu = wrapper.readBoolean();

        return { index, openMenu };
    }
}

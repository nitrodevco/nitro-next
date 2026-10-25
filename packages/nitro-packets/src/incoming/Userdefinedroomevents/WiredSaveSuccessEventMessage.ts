// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket } from '@nitrodevco/nitro-api';

export type WiredSaveSuccessEventMessageType = object;

/** The wired box was saved. Empty on purpose: Flash parser `userdefinedroomevents._-B14` reads nothing. */
export class WiredSaveSuccessEventMessage implements IIncomingPacket<WiredSaveSuccessEventMessageType> {
    public parse(): WiredSaveSuccessEventMessageType {
        return {};
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseStrings } from '@nitrodevco/nitro-api';

export type WiredEnvironmentMessageType = {
    /** The room has a "user clicks user" trigger, so a click on a user is sent as `WiredClickUserComposer` first. */
    hasClickUserWired: boolean;
    /** The achievements that can be earned in this room; empty when the server does not send the list. */
    enabledAchievements: string[];
};

/** Flash parser `userdefinedroomevents._-qv`, handled by `WiredEnvironment`. The achievement list was added later and is read only `if (bytesAvailable)`. */
export class WiredEnvironmentMessage implements IIncomingPacket<WiredEnvironmentMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredEnvironmentMessageType {
        const hasClickUserWired = wrapper.readBoolean();
        const enabledAchievements = wrapper.bytesAvailable ? ParseStrings(wrapper) : [];

        return { hasClickUserWired, enabledAchievements };
    }
}

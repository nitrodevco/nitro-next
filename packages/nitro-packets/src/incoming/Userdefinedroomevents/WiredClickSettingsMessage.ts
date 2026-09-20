// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { WiredClickFurniOption } from './Data/WiredClickFurniOption';
import { WiredClickUserOption } from './Data/WiredClickUserOption';

export type WiredClickSettingsMessageType = {
    userOption: WiredClickUserOption;
    furniOption: WiredClickFurniOption;
};

/**
 * The room's wired changed what clicks do. Flash parser `userdefinedroomevents._-e2c`, handled by
 * `WiredEnvironment.onWiredClickSettingsEvent`, which hands `userOption == PassThrough` and
 * `furniOption == PassThrough` to the room engine's click settings.
 */
export class WiredClickSettingsMessage implements IIncomingPacket<WiredClickSettingsMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredClickSettingsMessageType {
        const userOption: WiredClickUserOption = wrapper.readInt();
        const furniOption: WiredClickFurniOption = wrapper.readInt();

        return { userOption, furniOption };
    }
}

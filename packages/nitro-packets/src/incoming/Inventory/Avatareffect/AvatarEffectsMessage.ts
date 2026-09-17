// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One effect in the user's wardrobe, as `AvatarEffect`. */
export interface IAvatarEffect {
    type: number;
    subType: number;
    /** How long one use lasts, in seconds. */
    duration: number;
    /** How many unused copies are left in the inventory. */
    inactiveEffectsInInventory: number;
    /** Seconds left on the copy that is running, or zero when none is. */
    secondsLeftIfActive: number;
    /** A permanent effect is never used up. */
    isPermanent: boolean;
}

export type AvatarEffectsMessageType = {
    effects: IAvatarEffect[];
};

export class AvatarEffectsMessage implements IIncomingPacket<AvatarEffectsMessageType> {
    public parse(wrapper: IMessageDataWrapper): AvatarEffectsMessageType {
        const packet: AvatarEffectsMessageType = {
            effects: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.effects.push({
                type: wrapper.readInt(),
                subType: wrapper.readInt(),
                duration: wrapper.readInt(),
                inactiveEffectsInInventory: wrapper.readInt(),
                secondsLeftIfActive: wrapper.readInt(),
                isPermanent: wrapper.readBoolean(),
            });

            count--;
        }

        return packet;
    }
}

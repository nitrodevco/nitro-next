// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `SetActivatedBadgesComposer`'s slot count: five badges may be worn at once. */
export const SET_ACTIVATED_BADGES_SLOTS = 5;

export type SetActivatedBadgesComposerType = {
    /** The worn badge codes in slot order; at most five, and the slots past them are sent empty. */
    badgeCodes: readonly string[];
};

/**
 * Flash's composer writes all five slots every time: the slot number and then the badge code, or an
 * empty string for a slot nothing is worn in. Sending only the filled slots would leave the ones
 * above them as they were.
 */
export class SetActivatedBadgesComposer implements IOutgoingPacket<SetActivatedBadgesComposerType> {
    public constructor(private params: SetActivatedBadgesComposerType) { }

    public compose(): (number | string | boolean)[] {
        const data: (number | string | boolean)[] = [];

        for (let slot = 1; slot <= SET_ACTIVATED_BADGES_SLOTS; slot++) {
            const badgeCode = this.params.badgeCodes[slot - 1];

            if (badgeCode !== undefined) {
                data.push(slot);
                data.push(badgeCode);
            } else {
                data.push(slot);
                data.push('');
            }
        }

        return data;
    }
}

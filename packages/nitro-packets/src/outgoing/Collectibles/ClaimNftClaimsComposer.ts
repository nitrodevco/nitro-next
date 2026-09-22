// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `ClaimNftClaimsMessageComposer`: claim every reward claim. `RewardClaimsTab` sends it with
 * no arguments, so both of its strings go as their defaults, empty; the Flash composer does not say
 * what they are, and no caller fills them.
 */
export type ClaimNftClaimsComposerType = {
    param1?: string;
    param2?: string;
};

export class ClaimNftClaimsComposer implements IOutgoingPacket<ClaimNftClaimsComposerType> {
    public constructor(private params: ClaimNftClaimsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.param1 ?? '',
            this.params.param2 ?? '',
        ];
    }
}

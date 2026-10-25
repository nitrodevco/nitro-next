// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** The three constants on the Flash result parser (`_-CW._-e1p`), named by the texts `SelfDonationTool` shows for them. */
export enum SelfDonationResultCode {
    /** `_-t1s`: `selfdonation.result.success` */
    Success = 0,
    /** `_-E14`: `selfdonation.result.not_allowed` */
    NotAllowed = 1,
    /** `_-Q2y`, and anything else: `selfdonation.result.failed` */
    Failed = 2,
}

export type SelfDonationResultMessageType = {
    resultCode: SelfDonationResultCode;
};

/**
 * The answer to `SelfDonateItemComposer`. The packet tool files it under `Users/`; Flash uses it
 * from `roomevents/misc/SelfDonationTool`, the sandbox-only tool for handing yourself furni.
 */
export class SelfDonationResultMessage implements IIncomingPacket<SelfDonationResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): SelfDonationResultMessageType {
        const resultCode: SelfDonationResultCode = wrapper.readInt();

        return { resultCode };
    }
}

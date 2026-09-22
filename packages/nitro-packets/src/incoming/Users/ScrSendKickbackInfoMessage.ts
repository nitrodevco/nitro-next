// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** Flash's `ScrKickbackData`: the HC payday figures the club centre shows. */
export interface IScrKickbackData {
    currentHcStreak: number;
    firstSubscriptionDate: string;
    kickbackPercentage: number;
    totalCreditsMissed: number;
    totalCreditsRewarded: number;
    totalCreditsSpent: number;
    creditRewardForStreakBonus: number;
    creditRewardForMonthlySpent: number;
    /** Minutes until the next payday. */
    timeUntilPayday: number;
}

/** Flash's `ScrSendKickbackInfoMessageParser`: one `ScrKickbackData`. */
export type ScrSendKickbackInfoMessageType = {
    data: IScrKickbackData;
};

export class ScrSendKickbackInfoMessage implements IIncomingPacket<ScrSendKickbackInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): ScrSendKickbackInfoMessageType {
        return {
            data: {
                currentHcStreak: wrapper.readInt(),
                firstSubscriptionDate: wrapper.readString(),
                kickbackPercentage: wrapper.readDouble(),
                totalCreditsMissed: wrapper.readInt(),
                totalCreditsRewarded: wrapper.readInt(),
                totalCreditsSpent: wrapper.readInt(),
                creditRewardForStreakBonus: wrapper.readInt(),
                creditRewardForMonthlySpent: wrapper.readInt(),
                timeUntilPayday: wrapper.readInt(),
            },
        };
    }
}

import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface ITalentTrackRewardPerk {
    perkId: string;
}

export const TalentTrackRewardPerkParser = (wrapper: IMessageDataWrapper): ITalentTrackRewardPerk => {
    const data: ITalentTrackRewardPerk = {
        perkId: '',
    };

    data.perkId = wrapper.readString();

    return data;
}

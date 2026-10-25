// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * A quest as Flash's `QuestMessageData` reads it. Its getters name its fields out of read order - the
 * fourth integer is `activityPointType`, the fifth `id` - and `secondsLeft` follows only a seasonal one.
 */
export interface IQuestMessageData {
    campaignCode: string;
    completedQuestsInCampaign: number;
    questCountInCampaign: number;
    activityPointType: number;
    /** Below 1 once every quest of the campaign is done (`completedCampaign`). */
    id: number;
    accepted: boolean;
    type: string;
    imageVersion: string;
    rewardCurrencyAmount: number;
    localizationCode: string;
    completedSteps: number;
    totalSteps: number;
    sortOrder: number;
    catalogPageName: string;
    chainCode: string;
    easy: boolean;
    isSeasonal: boolean;
    secondsLeft: number;
    /** `receiveTime`: `Date.now()` when it was read, which `secondsLeft` counts down from. */
    receiveTime: number;
}

/** `new QuestMessageData(wrapper)`. */
export const QuestMessageDataParser = (wrapper: IMessageDataWrapper): IQuestMessageData => {
    const campaignCode = wrapper.readString();
    const completedQuestsInCampaign = wrapper.readInt();
    const questCountInCampaign = wrapper.readInt();
    const activityPointType = wrapper.readInt();
    const id = wrapper.readInt();
    const accepted = wrapper.readBoolean();
    const type = wrapper.readString();
    const imageVersion = wrapper.readString();
    const rewardCurrencyAmount = wrapper.readInt();
    const localizationCode = wrapper.readString();
    const completedSteps = wrapper.readInt();
    const totalSteps = wrapper.readInt();
    const sortOrder = wrapper.readInt();
    const catalogPageName = wrapper.readString();
    const chainCode = wrapper.readString();
    const easy = wrapper.readBoolean();
    const isSeasonal = wrapper.readBoolean();
    const secondsLeft = isSeasonal ? wrapper.readInt() : 0;

    return {
        campaignCode, completedQuestsInCampaign, questCountInCampaign, activityPointType, id, accepted, type, imageVersion, rewardCurrencyAmount,
        localizationCode, completedSteps, totalSteps, sortOrder, catalogPageName, chainCode, easy, isSeasonal, secondsLeft, receiveTime: Date.now(),
    };
};

export type QuestsMessageType = {
    quests: IQuestMessageData[];
    openWindow: boolean;
};

/** Flash `QuestsMessageParser`: the quests, then `openWindow`. */
export class QuestsMessage implements IIncomingPacket<QuestsMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestsMessageType {
        const quests: IQuestMessageData[] = [];
        let count = wrapper.readInt();

        while (count-- > 0) quests.push(QuestMessageDataParser(wrapper));

        return { quests, openWindow: wrapper.readBoolean() };
    }
}

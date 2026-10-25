// Body filled by hand from the AS3 (`CfhTopicsInitMessageParser`, `CallForHelpCategoryData`, `CallForHelpTopicData`) - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `CallForHelpTopicData`. */
export interface ICallForHelpTopic {
    name: string;
    id: number;
    consequence: string;
}

/** `CallForHelpCategoryData`. */
export interface ICallForHelpCategory {
    name: string;
    topics: ICallForHelpTopic[];
}

export type CfhTopicsInitMessageType = {
    callForHelpCategories: ICallForHelpCategory[];
};

export class CfhTopicsInitMessage implements IIncomingPacket<CfhTopicsInitMessageType> {
    public parse(wrapper: IMessageDataWrapper): CfhTopicsInitMessageType {
        const callForHelpCategories: ICallForHelpCategory[] = [];
        let categoryCount = wrapper.readInt();

        while (categoryCount-- > 0) {
            const name = wrapper.readString();
            const topics: ICallForHelpTopic[] = [];
            let topicCount = wrapper.readInt();

            while (topicCount-- > 0) topics.push({ name: wrapper.readString(), id: wrapper.readInt(), consequence: wrapper.readString() });

            callForHelpCategories.push({ name, topics });
        }

        return { callForHelpCategories };
    }
}

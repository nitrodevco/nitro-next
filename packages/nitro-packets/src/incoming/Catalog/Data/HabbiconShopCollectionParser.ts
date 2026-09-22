// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IHabbiconShopItem, parseHabbiconShopItem } from './HabbiconShopItemParser';

/** One habbicon set of the shop - Flash `§_-y1e§.§_-81y§`. */
export interface IHabbiconShopCollection {
    collectionId: number;
    name: string;
    completed: boolean;
    /** `§_-AH§`: the habbicon the set rewards once it is complete, 0 for none. */
    rewardHabbiconId: number;
    /** `§_-P1X§`: the reward's `HabbiconState`. */
    rewardState: number;
    priceCredits: number;
    priceActivityPoints: number;
    activityPointType: number;
    habbicons: IHabbiconShopItem[];
}

/** Flash `HabbiconShopCollectionDataParser.parse`. */
export const parseHabbiconShopCollection = (wrapper: IMessageDataWrapper): IHabbiconShopCollection => {
    const collectionId = wrapper.readInt();
    const name = wrapper.readString();
    const completed = wrapper.readBoolean();
    const rewardHabbiconId = wrapper.readInt();
    const rewardState = wrapper.readInt();
    const priceCredits = wrapper.readInt();
    const priceActivityPoints = wrapper.readInt();
    const activityPointType = wrapper.readInt();
    const habbicons: IHabbiconShopItem[] = [];
    const count = wrapper.readInt();

    for (let i = 0; i < count; i++) habbicons.push(parseHabbiconShopItem(wrapper));

    return { collectionId, name, completed, rewardHabbiconId, rewardState, priceCredits, priceActivityPoints, activityPointType, habbicons };
};

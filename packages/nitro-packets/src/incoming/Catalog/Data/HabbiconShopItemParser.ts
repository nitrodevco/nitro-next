// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One habbicon of the shop - Flash `§_-y1e§.§_-lg§`, which the habbicon controller keeps by id. */
export interface IHabbiconShopItem {
    habbiconId: number;
    name: string;
    collectionId: number;
    /** A `HabbiconState`: 0 not owned, 1 claimable, 2 owned, 3 favourite. */
    state: number;
    priceCredits: number;
    priceActivityPoints: number;
    activityPointType: number;
}

/** Flash `§_-9a§.§_-Y20§.parse`. */
export const parseHabbiconShopItem = (wrapper: IMessageDataWrapper): IHabbiconShopItem => {
    const habbiconId = wrapper.readInt();
    const name = wrapper.readString();
    const collectionId = wrapper.readInt();
    const state = wrapper.readInt();
    const priceCredits = wrapper.readInt();
    const priceActivityPoints = wrapper.readInt();
    const activityPointType = wrapper.readInt();

    return { habbiconId, name, collectionId, state, priceCredits, priceActivityPoints, activityPointType };
};

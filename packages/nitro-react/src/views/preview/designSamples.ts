/**
 * The sample content the preview host's design window draws the game's own views with (`DESIGN_STATES`):
 * what a user would have - badges, furni - fed to the stores as the packets would fill them, and put back
 * as it was when the view goes. Nothing is sent. Not a Flash feature.
 */
import { LegacyDataType } from '@nitrodevco/nitro-api';
import { IFurniListAddOrUpdateFurni } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { inventoryStore } from '#base/context/inventory';
import { systemStore } from '#base/context/system';

/** The badges the user has: a few of Habbo's own. */
export const SAMPLE_BADGES = [ 'ADM', 'ACH_Login1', 'ACH_RoomEntry1', 'ACH_Motto1', 'ACH_AvatarLooks1', 'ACH_GuideEnrollmentLifetime1', 'UK183', 'HC1' ];

/** How many furni the inventory's grid shows. */
const SAMPLE_FURNI_COUNT = 12;

/** The inventory store while a view draws with samples, put back as it was after (`onBadges`, `onFurniList` fill it in the game). */
const useInventorySample = (fill: () => void) => {
    useEffect(() => {
        const own = inventoryStore.getState();

        fill();

        return () => inventoryStore.setState(own, true);
    }, []);
};

/** The user owns `SAMPLE_BADGES` (`BadgesEvent`). */
export const useSampleBadges = () => useInventorySample(() => inventoryStore.getState().initBadges(SAMPLE_BADGES.map((badgeCode, index) => ({ badgeId: index + 1, badgeCode, ownerCount: 1, badgeRarityId: 0 }))));

/** The furni of the hotel's furni data the user owns: its first floor items, one each (`FurniList`). */
const sampleFurni = (): Map<number, IFurniListAddOrUpdateFurni> => {
    const types = Object.values(systemStore.getState().floorItems).slice(0, SAMPLE_FURNI_COUNT);

    return new Map(types.map((type, index) => [ index + 1, {
        itemId: index + 1, itemType: 'S', roomItemId: index + 1, itemTypeId: type.id, category: 1, stuffData: new LegacyDataType(),
        isGroupable: true, isRecyclable: false, isTradeable: true, isSellable: true, secondsToExpiration: -1, extra: 0, flatId: -1,
        isWallItem: false, hasRentPeriodStarted: false, expirationTimeStamp: 0,
    } ]));
};

/** The user owns badges and furni: what the inventory's tabs show. */
export const useSampleInventory = () => useInventorySample(() => {
    const { initBadges, insertFurniture } = inventoryStore.getState();

    initBadges(SAMPLE_BADGES.map((badgeCode, index) => ({ badgeId: index + 1, badgeCode, ownerCount: 1, badgeRarityId: 0 })));
    insertFurniture(sampleFurni());
});

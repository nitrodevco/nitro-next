/**
 * What the club gift and safety lock notifications' buttons do - the `eventHandler`s of Flash's
 * `notifications/singular/ClubGiftNotification` and `SafetyLockedNotification`.
 */
import { singularNotificationStore } from '#base/context/singular-notifications';
import { configString } from '#base/context/system';
import { openHabboMainPage } from '#base/utils';

import { openClubCatalogPage } from '../catalog/catalogClubCommands';

/**
 * `ClubGiftNotification`'s `open_catalog_button`: `openCatalogPage("club_gifts")`, then `dispose`
 * - without `isCancelled`, so the next `ClubGiftNotificationEvent` docks it again.
 */
export const openClubGiftList = () => {
    openClubCatalogPage('club_gifts');
    singularNotificationStore.getState().closeClubGiftNotification(false);
};

/**
 * `SafetyLockedNotification`'s `unlock_link` / `unlock_link_region`: the account's security page,
 * `getProperty("link.format.safetylock_unlock")`, in the hotel's main browser window
 * (`HabboWebTools.openWebPage(url, "habboMain")`). The notification stays up.
 */
export const openSafetyLockUnlockPage = () => {
    const url = configString('link.format.safetylock_unlock');

    openHabboMainPage(url);
};

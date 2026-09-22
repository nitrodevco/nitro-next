/**
 * `HabboCatalog.toggleCatalog(type)` - the toolbar's catalogue and Builders Club icons
 * (`onHabboToolbarEvent`). Each catalogue type has its own window (`getCatalogWindowName`); one is
 * shown at a time. Toggling the type that is showing hides it; toggling the other hides the one
 * showing and shows it. Without `builders.club.enabled`, only staff (`hasSecurity(5)`) get the
 * Builders Club catalogue - everyone else gets the normal one.
 *
 * The rest of `toggleCatalog` happens where its state is: the window asks for its index the first
 * time it opens (`CatalogComponent`), opens its front page (`useCatalogPageRequest`) and refreshes
 * the builder status (`CatalogHeaderView`).
 */
import { CatalogTypeEnum, SecurityLevelEnum } from '@nitrodevco/nitro-api';

import { getCatalogWindowName } from '#base/context/catalog';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

export const toggleCatalog = (catalogType: CatalogTypeEnum) => {
    const { config, visibleWindows, showWindow, hideWindow } = systemStore.getState();

    if ((Number(userStore.getState().securityLevel) < Number(SecurityLevelEnum.Moderator)) && (config['builders.club.enabled'] !== true)) catalogType = CatalogTypeEnum.Normal;

    const name = getCatalogWindowName(catalogType);
    const otherName = getCatalogWindowName((catalogType === CatalogTypeEnum.BuildersClub) ? CatalogTypeEnum.Normal : CatalogTypeEnum.BuildersClub);

    if (visibleWindows[otherName]) {
        hideWindow(otherName);
        showWindow(name);

        return;
    }

    if (visibleWindows[name]) hideWindow(name);
    else showWindow(name);
};

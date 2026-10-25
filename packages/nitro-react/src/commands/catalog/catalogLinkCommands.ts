/**
 * The clickable elements of a catalogue page - `LocalizationCatalogWidget.onClickLink`, for the
 * elements `PageLocalization.LAYOUT_LINKS` makes clickable (`initLinks`). A layout view calls
 * `onCatalogPageLink(page, '<element name>')` from the element's click.
 *
 * `onClickLink` also has cases for `frontpage3`, `info_pixels`, `info_credits`, `collectibles` and
 * `club1`, but no layout of the client has those codes and `LAYOUT_LINKS` makes nothing of them
 * clickable, so they can never run and are not carried; `pets3` is in `LAYOUT_LINKS` with no case,
 * and falls through to the log line as in Flash.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';

import { CatalogLocalizedPage } from '#base/context/catalog';
import { configString, systemStore } from '#base/context/system';
import { openHabboMainPage } from '#base/utils';

/** `getProperty` / `getBoolean` over the current config - see `configReader`. */

/**
 * `openExternalLink`: the "leaving the hotel" alert, and the page in the hotel's main browser
 * window (`HabboWebTools.navigateToURL(url, "habboMain")`). An empty link does nothing.
 */
export const openCatalogExternalLink = (url: string) => {
    if (!url.length) return;

    const { showAlert, getLocalizationValue } = systemStore.getState();

    showAlert(getLocalizationValue('catalog.alert.external.link.title'), getLocalizationValue('catalog.alert.external.link.desc'));

    openHabboMainPage(url);
};

/** `onClickLink`: what clicking `elementName` on the page does, by the page's layout code. */
export const onCatalogPageLink = (page: CatalogLocalizedPage, elementName: string) => {
    const { getLocalizationValue } = systemStore.getState();

    switch (page.layoutCode) {
        case 'club_buy':
            if (elementName === 'club_link') openCatalogExternalLink(configString('link.format.club'));
            return;
        case 'mad_money':
            if (elementName === 'ctlg_madmoney_button') openCatalogExternalLink(configString('link.format.madmoney'));
            return;
        case 'monkey':
            if ((elementName === 'ctlg_teaserimg_1_region') || (elementName === 'ctlg_special_img_region')) openCatalogExternalLink(getLocalizationValue('link.format.monkey', 'http://store.apple.com/'));
            return;
        case 'niko':
            if ((elementName === 'ctlg_teaserimg_1_region') || (elementName === 'ctlg_special_img_region')) openCatalogExternalLink(getLocalizationValue('link.format.niko', 'http://itunes.apple.com/us/app/niko/id481670205?mt=8'));
            return;
        default:
            NitroLogger.log('[Localization Catalog Widget] Unhandled link clicked', page.layoutCode, elementName);
    }
};

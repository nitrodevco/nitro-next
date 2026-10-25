import { StringDataType } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { requestInventoryBadgesIfEmpty } from '#base/commands';
import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useInventoryStore } from '#base/context/inventory';
import { useBadgeImageUrl, useBadgePointLimits, useConfigValue, useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { useTemplateLibrary } from '#base/theme';
import { getBadgeDesc, getBadgeName } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY, catalogTemplateId } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';

/** `BADGE_GRID_ITEM_NAME`: the layout each grid item is built from. */
const BADGE_GRID_ITEM_NAME = 'badgeGridItem';

/** `MAX_SEARCH_STRING_LENGTH`, which is also `search_input`'s `max_chars`. */
const MAX_SEARCH_STRING_LENGTH = 40;

type Translate = (key: string, defaultValue?: string, replacements?: Record<string, string>) => string;

/** `buildBadgeSearchText`: the code, `getBadgeName` and `getBadgeDesc`, lower-cased. */
const getBadgeSearchText = (t: Translate, code: string, pointLimits: Record<string, number>): string => `${code} ${getBadgeName(t, code)} ${getBadgeDesc(t, code, pointLimits)}`.toLowerCase();

/** `getPreviewerStuffData`: the string array stuff data a badge display furni is previewed and bought with. */
const getPreviewerStuffData = (badgeCode: string) => {
    const stuffData = new StringDataType();

    stuffData.setValue([ '0', badgeCode, '', '' ]);

    return stuffData;
};

/**
 * The badge display page's badge picker, Flash's `UserBadgeSelectorCatalogWidget` - bound to the
 * `userBadgeSelectorWidget` container's own children in `layout_badge_display` (it attaches no view):
 * the `search_input` field with its `search_placeholder` and `cancel_search_btn`, and the
 * `badgeGrid`, which takes a `badgeGridItem` per badge shown (`createGridItem`: the `badgeWidget`
 * badge of type normal, the `bg` border style 0 on the picked one, 2 on the rest).
 *
 * The grid lists the badges the user owns (`HabboInventory.getAllMyBadgeIds`) minus the hotel's
 * `badge.display.excluded.badgeCodes`; the first time the inventory has none it asks the server
 * for them (`requestInventoryBadgesIfEmpty`), and a new list (`BadgesEvent`,
 * `onUserBadgesUpdated`) refreshes the grid, keeping the picked badge while the user still owns it.
 * The search keeps the badges whose code, name or description (lowercased, `buildBadgeSearchText`)
 * contains the typed text, 40 characters at most; the placeholder shows while the field is empty
 * and the cross while it is not, and Escape or the cross clears it. A search that hides the picked
 * badge unpicks it, telling the page (an empty extra parameter and preview stuff data).
 *
 * Picking a badge (`setSelectedBadgeByIndex`) makes its code the purchase's extra parameter
 * (`SetExtraPurchaseParameterEvent`) and the preview's stuff data (`SetRoomPreviewerStuffDataEvent`,
 * `["0", code, "", ""]`). `WIDGETS_INITIALIZED` tells the purchase widget a badge is needed before
 * anything can be bought (`CWE_EXTRA_PARAM_REQUIRED_FOR_BUY`) and selects the page's first offer.
 */
export const CatalogUserBadgeSelectorWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ searchText, setSearchText ] = useState('');
    const [ selectedBadge, setSelectedBadge ] = useState<string | undefined>(undefined);
    const excludedBadges = useConfigValue<string>('badge.display.excluded.badgeCodes') ?? '';
    const badgeUrl = useBadgeImageUrl();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const badgeCodes = useInventoryStore(x => x.badgeCodes);
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const badgePointLimits = useBadgePointLimits();

    // `refreshBadgeData`: the owned badges but the excluded ones; a picked badge the user no longer owns is dropped quietly.
    const excluded = excludedBadges.split(',');
    const ownedBadges = badgeCodes.filter(code => !excluded.includes(code));

    if ((selectedBadge !== undefined) && !ownedBadges.includes(selectedBadge)) setSelectedBadge(undefined);

    const currentBadge = ((selectedBadge !== undefined) && ownedBadges.includes(selectedBadge)) ? selectedBadge : undefined;
    const search = searchText.toLowerCase();
    const filteredBadges = (search === '') ? ownedBadges : ownedBadges.filter(code => getBadgeSearchText(t, code, badgePointLimits).includes(search));

    const dispatchBadge = (code: string) => {
        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SET_EXTRA_PARAMETER, parameter: code });
        page.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.SET_PREVIEWER_STUFFDATA, stuffData: getPreviewerStuffData(code) });
    };

    /** `applyBadgeFilter`: a picked badge the search no longer shows is unpicked (`clearSelectedBadge`). */
    const applySearch = (text: string) => {
        const value = text.substring(0, MAX_SEARCH_STRING_LENGTH);
        const next = value.toLowerCase();

        setSearchText(value);

        if ((currentBadge === undefined) || (next === '') || getBadgeSearchText(t, currentBadge, badgePointLimits).includes(next)) return;

        setSelectedBadge(undefined);
        dispatchBadge('');
    };

    const selectBadge = (code: string) => {
        setSelectedBadge(code);
        dispatchBadge(code);
    };

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.WIDGETS_INITIALIZED, () => {
        if (!page.offers.length) return;

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.EXTRA_PARAM_REQUIRED_FOR_BUY });
        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer: page.offers[0] });
    });

    // `init()` -> `refreshBadgeData` -> `getAllMyBadgeIds`, which asks for the list the first time it finds none.
    useEffect(() => {
        requestInventoryBadgesIfEmpty(send);
    }, []);

    const hasSearch = (searchText.length > 0);
    const gridItem = templates?.[catalogTemplateId(BADGE_GRID_ITEM_NAME)];

    useCatalogWidgetView({
        bindings: {
            search_input: {
                caption: searchText,
                onChange: applySearch,
                onKeyDown: (key) => {
                    if (key === 'Escape') applySearch('');
                },
            },
            search_placeholder: { visible: !hasSearch },
            cancel_search_btn: { visible: hasSearch, onPointerTap: () => applySearch('') },
            // `resetBadgeSelectorGrid`: a `badgeGridItem` per badge shown (`createGridItem`).
            badgeGrid: {
                items: gridItem
                    ? filteredBadges.map(code => ({
                            key: code,
                            from: gridItem,
                            bindings: {
                                '': { onPointerTap: () => selectBadge(code) },
                                // `setBadgeGridItemSelectionBg`.
                                bg: { style: (code === currentBadge) ? '0' : '2' },
                                badgeWidget: { asset: badgeUrl(code) },
                            },
                        }))
                    : [],
            },
        },
    });

    return null;
};

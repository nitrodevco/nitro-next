/**
 * The inventory's badges page - Flash `inventory/badges/BadgesView` with `BadgeGridView` and the
 * `Badge` thumbs (clones of `inventory_thumb_xml`), on `inventory_xml`'s `badges` window: the
 * badges not worn in `inactive_items` (200 a page, `item_grid_pages`), the worn ones in
 * `active_items`, and the selected one in `descriptionArea`.
 *
 * - Opening the page asks for the list unless one has arrived or has already been asked for
 *   (`HabboInventory.getAllMyBadgeIds`).
 * - `updateAll` -> `forceSelection`: with nothing selected the first badge not worn is, else the
 *   first worn one.
 * - A thumb: the `badge` widget showing the badge, and the look `set isSelected` last put on it -
 *   `BG_COLOR` green while `Badge.isUnseen`, the `outline` while selected - or, before any, the
 *   layout's own, outlined (see `InventoryBadgesSlice`); a click selects it (`setBadgeSelected`).
 * - `updateActionView`: `wearBadge_button` wears or clears the selection (`toggleBadgeWearing` ->
 *   `saveBadgeSelection`), disabled with none selected or with five worn and the selection not one
 *   of them; `badge_image`, `badgeName`, `badgeDescription` (only when there is one), the rarity
 *   tag (`badge.rarity.badge` on the rarity's colour) and `badgeOwnerCount` (`badge.owner_count`,
 *   between 1 and 999 owners).
 * - The filters (`BadgeGridView.passFilter`): `filter.options` by kind - all, the badges that are
 *   not achievements, or only those; `filter.rarity` by the standalone tiers the badges use, with
 *   "all" and one "common" entry for the rest, enabled only with more than two entries; and the
 *   `filter` box, matching a badge's name and description, which applies with the next update -
 *   Enter, or a filter picked - and clears on Escape or `clear_filter_button`.
 *
 * Not ported: `achievements_score_container`, which needs the achievement score this client does
 * not hold.
 */
import { getBadgeRarityLabelKey, getBadgeRarityWhiteBackgroundTagColor } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { requestInventoryBadgesIfEmpty, toggleInventoryBadgeWearing } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import {
    getInventoryBadgeRarityIds, getInventoryBadges, INVENTORY_BADGE_FILTER_ACHIEVEMENTS, INVENTORY_BADGE_FILTER_ALL, INVENTORY_BADGE_FILTER_NORMAL, INVENTORY_BADGE_RARITY_ALL, INVENTORY_BADGE_RARITY_COMMON, INVENTORY_BADGES_ACTIVE,
    INVENTORY_BADGES_INACTIVE, INVENTORY_MAX_ACTIVE_BADGES, InventoryBadge, isInventoryBadgeRarityFilterEnabled, passInventoryBadgeFilter, useInventoryBadgesActions, useInventoryStore,
} from '#base/context/inventory';
import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { TemplateItem } from '#base/theme';
import { getBadgeDesc, getBadgeName, shouldShowBadgeOwnerCount } from '#base/utils';

import {
    findInventoryElement, INVENTORY_GRID_PAGE_SIZE, inventoryGridPageCount, inventoryGridPageItems, InventoryPage, InventoryPageContext, inventoryPagePath, inventoryTemplateId, inventoryThumbLook, NO_INVENTORY_PAGE,
} from './inventoryPage';

/** `BadgeGridView`'s kind filters, in `filter.options`' order. */
const KIND_FILTERS = [ INVENTORY_BADGE_FILTER_ALL, INVENTORY_BADGE_FILTER_NORMAL, INVENTORY_BADGE_FILTER_ACHIEVEMENTS ];

const page = (name?: string) => inventoryPagePath('badges', name);

export const useInventoryBadgesPage = ({ active, templates }: InventoryPageContext): InventoryPage => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const badgePointLimits = useSystemStore(x => x.badgePointLimits);
    const badges = useInventoryStore(x => x.badges);
    const wornBadgeCodes = useInventoryStore(x => x.wornBadgeCodes);
    const selectedBadgeCode = useInventoryStore(x => x.selectedBadgeCode);
    const thumbLooks = useInventoryStore(x => x.badgeThumbLooks);
    const { selectBadge, markBadgeThumbWindows } = useInventoryBadgesActions();
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    // `BadgesModel.isUncommonBadgeRarityEnabled`: without it the uncommon tier is shown as common.
    const uncommonRarityEnabled = useConfigValue<boolean>('badge_rarity.uncommon') === true;
    const [ kindFilter, setKindFilter ] = useState(INVENTORY_BADGE_FILTER_ALL);
    const [ rarityFilter, setRarityFilter ] = useState(INVENTORY_BADGE_RARITY_ALL);
    // The `filter` box's caption, and the search term the last update took from it.
    const [ filterCaption, setFilterCaption ] = useState('');
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ hoveredPage, setHoveredPage ] = useState(-1);

    const inactiveBadges = getInventoryBadges(badges, wornBadgeCodes, INVENTORY_BADGES_INACTIVE);
    const activeBadges = getInventoryBadges(badges, wornBadgeCodes, INVENTORY_BADGES_ACTIVE);
    const selectedBadge = badges.find(badge => badge.code === selectedBadgeCode);
    // `forceSelection`: the first badge not worn, else the first worn one.
    const firstBadgeCode = (inactiveBadges[0] ?? activeBadges[0])?.code;

    useEffect(() => {
        if (active) requestInventoryBadgesIfEmpty(send);
    }, [ active, send ]);

    useEffect(() => {
        if (active && !selectedBadge && firstBadgeCode) selectBadge(firstBadgeCode);
    }, [ active, selectedBadge, firstBadgeCode, selectBadge ]);

    const { rarityIds, hasCommonGroup } = getInventoryBadgeRarityIds(badges, uncommonRarityEnabled);
    const rarityEntries = [ INVENTORY_BADGE_RARITY_ALL, ...(hasCommonGroup ? [ INVENTORY_BADGE_RARITY_COMMON ] : []), ...rarityIds ];
    // `updateRarityFilterOptions`: a menu too short to be worth using is forced back to "all".
    const rarityEnabled = isInventoryBadgeRarityFilterEnabled(rarityEntries);
    const shownRarity = (rarityEnabled && rarityEntries.includes(rarityFilter)) ? rarityFilter : INVENTORY_BADGE_RARITY_ALL;

    /** `getBadgeFilterLabel`. */
    const kindLabel = (kind: number) => {
        switch (kind) {
            case INVENTORY_BADGE_FILTER_NORMAL:
                return t('inventory.badges.filter.normal_badges');
            case INVENTORY_BADGE_FILTER_ACHIEVEMENTS:
                return t('inventory.badges.filter.achievements');
            default:
                return t('inventory.badges.filter.all');
        }
    };

    /** `getBadgeRarityText`: a tier's own text. */
    const rarityText = (rarity: number) => {
        const key = getBadgeRarityLabelKey(rarity, uncommonRarityEnabled);

        return key ? t(key, key) : String(rarity);
    };

    /** `getBadgeRarityFilterLabel`: the two entries that are not a tier, then the tier's own text. */
    const rarityLabel = (rarity: number) => {
        if (rarity === INVENTORY_BADGE_RARITY_ALL) return t('inventory.badges.filter.rarity.all');
        if (rarity === INVENTORY_BADGE_RARITY_COMMON) return t('inventory.badges.filter.rarity.common');

        return rarityText(rarity);
    };

    const matches = (badge: InventoryBadge) => passInventoryBadgeFilter(badge, kindFilter, shownRarity, uncommonRarityEnabled, searchTerm, getBadgeName(t, badge.code), getBadgeDesc(t, badge.code, badgePointLimits));

    // `BadgeGridView.update` / `changeToPage`.
    const passedBadges = inactiveBadges.filter(matches);
    const pageCount = inventoryGridPageCount(passedBadges.length);
    const shownPage = Math.max(0, Math.min(currentPage, pageCount - 1));
    const pageBadges = passedBadges.slice(shownPage * INVENTORY_GRID_PAGE_SIZE, (shownPage + 1) * INVENTORY_GRID_PAGE_SIZE);

    // `Badge.window`: the thumbs the grids show have been made - after `forceSelection` above, as
    // `updateAll` selects before `updateListViews` builds them.
    const shownCodes = active ? [ ...pageBadges, ...activeBadges ].map(badge => badge.code).join(' ') : '';

    useEffect(() => {
        if (shownCodes) markBadgeThumbWindows(shownCodes.split(' '));
    }, [ shownCodes, markBadgeThumbWindows ]);

    if (!active) return NO_INVENTORY_PAGE;

    /** `updateAll(null)`: the box's caption is the search term. */
    const update = (caption: string = filterCaption) => setSearchTerm(caption);

    const clearFilter = () => {
        setFilterCaption('');
        update('');
    };

    const thumbTemplate = templates[inventoryTemplateId('inventory_thumb_xml')];

    /** `Badge.initWindow` / `isSelected`: the badge in the thumb's `badge` widget. */
    const badgeThumb = (badge: InventoryBadge): TemplateItem | undefined => thumbTemplate && {
        key: badge.code,
        from: thumbTemplate,
        bindings: {
            '': { onPointerTap: () => selectBadge(badge.code) },
            // `set isSelected`'s look once it has reached this thumb; the layout's own until then.
            ...(thumbLooks[badge.code] ? inventoryThumbLook(thumbLooks[badge.code].selected, thumbLooks[badge.code].unseen) : {}),
            badge: { visible: true, asset: badgeUrl.replace('%badgename%', badge.code) },
        },
    };

    const isWorn = !!selectedBadge && wornBadgeCodes.includes(selectedBadge.code);
    // `updateActionView`: taking one off always works; putting one on only while there is room.
    const canToggle = !!selectedBadge && (isWorn || (wornBadgeCodes.length < INVENTORY_MAX_ACTIVE_BADGES));
    const description = selectedBadge ? getBadgeDesc(t, selectedBadge.code, badgePointLimits) : '';
    const rarityTag = selectedBadge ? t('badge.rarity.badge', '', { rarity: rarityText(selectedBadge.rarityId) }) : '';
    const ownerCount = selectedBadge?.ownerCount ?? 0;

    return {
        bindings: {
            [page('filter')]: {
                caption: filterCaption,
                onChange: setFilterCaption,
                onEnter: () => update(),
                onKeyDown: (key) => {
                    if (key === 'Escape') clearFilter();
                },
            },
            [page('clear_filter_button')]: { visible: filterCaption.length > 0, onPointerTap: clearFilter },
            [page('filter.options')]: {
                options: KIND_FILTERS.map(kindLabel),
                selection: Math.max(0, KIND_FILTERS.indexOf(kindFilter)),
                onSelect: (index) => {
                    setKindFilter(KIND_FILTERS[index]);
                    update();
                },
            },
            [page('filter.rarity')]: {
                options: rarityEntries.map(rarityLabel),
                selection: Math.max(0, rarityEntries.indexOf(shownRarity)),
                disabled: !rarityEnabled,
                onSelect: (index) => {
                    setRarityFilter(rarityEntries[index]);
                    update();
                },
            },

            [page('inactive_items')]: { items: pageBadges.map(badgeThumb).filter(item => !!item) },
            [page('item_grid_pages')]: {
                visible: pageCount > 1,
                items: inventoryGridPageItems(findInventoryElement(templates, page('item_grid_pages'))?.children[0], {
                    count: pageCount,
                    current: shownPage,
                    hovered: hoveredPage,
                    onPage: setCurrentPage,
                    onHover: (index, over) => setHoveredPage(current => (over ? index : ((current === index) ? -1 : current))),
                }),
            },
            [page('active_items')]: { items: activeBadges.map(badgeThumb).filter(item => !!item) },

            [page('badge_image')]: { visible: !!selectedBadge, asset: selectedBadge ? badgeUrl.replace('%badgename%', selectedBadge.code) : '' },
            [page('badgeName')]: { caption: selectedBadge ? getBadgeName(t, selectedBadge.code) : '' },
            [page('badgeDescription')]: { visible: description !== '', caption: description },
            // `setBadgeRarityDetail`: the tag on the rarity's colour, its text twice for the two blends -
            // set on the built window, so `badgeRarityBorder` widens the tag to the text
            // (`reflect_horizontal_resize_to_parent`).
            [page('badgeRarityTag')]: { visible: !!selectedBadge, color: selectedBadge ? getBadgeRarityWhiteBackgroundTagColor(selectedBadge.rarityId, uncommonRarityEnabled) : undefined },
            [page('badgeRarityBorder')]: { visible: !!selectedBadge, caption: rarityTag, setCaptionAfterBuild: true },
            [page('badgeRarity')]: { visible: !!selectedBadge, caption: rarityTag, color: 0xffffff, setCaptionAfterBuild: true },
            [page('badgeOwnerCount')]: { visible: shouldShowBadgeOwnerCount(ownerCount), caption: t('badge.owner_count', '', { count: String(ownerCount) }) },
            [page('wearBadge_button')]: {
                caption: t(isWorn ? 'inventory.badges.clearbadge' : 'inventory.badges.wearbadge'),
                disabled: !canToggle,
                onPointerTap: () => selectedBadge && toggleInventoryBadgeWearing(send, selectedBadge.code),
            },
        },
    };
};

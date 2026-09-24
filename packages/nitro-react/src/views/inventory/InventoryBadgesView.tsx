/**
 * The inventory's badges page - the `badges` region of `inventory_xml` (Flash `badges/BadgesView`):
 * the `options_container` row with the search box and the `filter.options` menu, the
 * `filter.rarity` menu (274,2 119x21), the `inactive_items` grid (0,27 328x143) of the badges not
 * being worn, the `wearingTitle` over the `active_items` grid (335,58 135x120) of the five that
 * are, and the `descriptionArea` (0,184 468x78) with the selected badge's picture, name,
 * description and the `wearBadge_button` (282,40 179x28).
 *
 * - Opening the page asks for the list unless one has arrived or has already been asked for
 *   (`HabboInventory.getAllMyBadgeIds`).
 * - A badge is picked by pressing its thumb in either grid (`setBadgeSelected`), and the button
 *   then puts it on or takes it off (`toggleBadgeWearing` -> `saveBadgeSelection`, which tells the
 *   server). Five is the cap (`MAX_ACTIVE_BADGE_COUNT`), so the button is dead for a sixth.
 * - The rarity menu lists the rarity ids the owned badges actually use
 *   (`getAvailableRareBadgeRarityIds`) under an "all" entry, and the search box matches a badge's
 *   name and description.
 *
 * Not ported: the 200-item pages under `inactive_items` (`item_grid_pages`, the grid scrolls
 * instead), `badgeOwnerCount` beside the rarity tag, the unseen item marks, and
 * `achievements_score_container`, which needs the achievement score this client does not hold.
 */
import { getBadgeRarityLabelKey, getBadgeRarityWhiteBackgroundTagColor, isBadgeRarityStandaloneTier } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { requestInventoryBadgesIfEmpty, toggleInventoryBadgeWearing } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import {
    getInventoryBadgeRarityIds, getInventoryBadges,
    INVENTORY_BADGES_ACTIVE, INVENTORY_BADGES_INACTIVE, INVENTORY_MAX_ACTIVE_BADGES, InventoryBadge, useInventoryBadgesActions, useInventoryStore,
} from '#base/context/inventory';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, Box, Button, Dropmenu, DropmenuOption, InfiniteGrid, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { InventoryOptionsContainer } from './InventoryOptionsContainer';

/** `Badge`'s thumb is the same 42x42 frame the furni thumbs use, with the same two ground colours. */
const THUMB_SIZE = 42;
const THUMB_COLOR = '#cccccc';

/** `filter.rarity`'s "everything" entry. */
const RARITY_ALL = -1;

interface BadgeThumbProps {
    badge: InventoryBadge;
    badgeUrl: string;
    selected: boolean;
    onSelect: (code: string) => void;
}

const BadgeThumb = ({ badge, badgeUrl, selected, onSelect }: BadgeThumbProps) => (
    <Region
        cursor="pointer"
        onPointerDown={() => onSelect(badge.code)}
        layout={{ position: 'relative', width: THUMB_SIZE, height: THUMB_SIZE }}
    >
        <Border
            variant="5"
            tintColor={THUMB_COLOR}
            layout={{ position: 'absolute', left: 1, top: 1, width: 40, height: 40 }}
        >
            <ThemeImage
                src={badgeUrl.replace('%badgename%', badge.code)}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
            />
        </Border>
        {selected && (
            <ThemeImage
                src={LayoutImage('shared/inventory_thumb_selected_outline.png')}
                bitmap={{}}
                layout={{ position: 'absolute', left: 0, top: 0, width: THUMB_SIZE, height: THUMB_SIZE }}
            />
        )}
    </Region>
);

export const InventoryBadgesView = () => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const badges = useInventoryStore(x => x.badges);
    const wornBadgeCodes = useInventoryStore(x => x.wornBadgeCodes);
    const selectedBadgeCode = useInventoryStore(x => x.selectedBadgeCode);
    const { selectBadge } = useInventoryBadgesActions();
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    // `BadgesModel.isUncommonBadgeRarityEnabled`: without it the uncommon tier is shown as common.
    const uncommonRarityEnabled = useConfigValue<boolean>('badge_rarity.uncommon') === true;
    const [ rarityFilter, setRarityFilter ] = useState(RARITY_ALL);
    const [ searchText, setSearchText ] = useState('');

    useEffect(() => {
        requestInventoryBadgesIfEmpty(send);
    }, [ send ]);

    const matches = (badge: InventoryBadge) => {
        if ((rarityFilter !== RARITY_ALL) && (badge.rarityId !== rarityFilter)) return false;

        if (!searchText) return true;

        const needle = searchText.toLowerCase();

        return t(`badge_name_${badge.code}`, badge.code).toLowerCase().includes(needle) || t(`badge_desc_${badge.code}`, '').toLowerCase().includes(needle);
    };

    const inactiveBadges = getInventoryBadges(badges, wornBadgeCodes, INVENTORY_BADGES_INACTIVE).filter(matches);
    const activeBadges = getInventoryBadges(badges, wornBadgeCodes, INVENTORY_BADGES_ACTIVE);

    // `getBadgeRarityFilterLabel`: the tier's own text, or its number where the tier has none.
    const rarityLabel = (rarity: number) => {
        const key = getBadgeRarityLabelKey(rarity, uncommonRarityEnabled);

        return key ? t(key, String(rarity)) : String(rarity);
    };

    const rarityOptions: DropmenuOption[] = [
        { key: RARITY_ALL, label: t('inventory.badges.filter.rarity.all'), selected: rarityFilter === RARITY_ALL, onSelect: () => setRarityFilter(RARITY_ALL) },
        ...getInventoryBadgeRarityIds(badges).map(rarity => ({ key: rarity, label: rarityLabel(rarity), selected: rarityFilter === rarity, onSelect: () => setRarityFilter(rarity) })),
    ];

    const selectedBadge = badges.find(badge => badge.code === selectedBadgeCode);
    const isWorn = !!selectedBadge && wornBadgeCodes.includes(selectedBadge.code);
    // `updateActionView`: taking one off always works; putting one on only while there is room.
    const canToggle = !!selectedBadge && (isWorn || (wornBadgeCodes.length < INVENTORY_MAX_ACTIVE_BADGES));

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, width: 468, bottom: 0, overflow: 'hidden' }}>
            <InventoryOptionsContainer
                filterText={searchText}
                onFilterTextChange={setSearchText}
            />
            <Dropmenu
                variant="0"
                caption={(rarityFilter === RARITY_ALL) ? t('inventory.badges.filter.rarity.all') : rarityLabel(rarityFilter)}
                options={rarityOptions}
                layout={{ position: 'absolute', left: 274, top: 2, width: 119, height: 21 }}
            />
            <Region layout={{ position: 'absolute', left: 0, top: 27, width: 328, height: 143, overflow: 'hidden' }}>
                <Box layout={{ position: 'absolute', left: 0, top: 0, width: 328, bottom: 0, flexDirection: 'column' }}>
                    <InfiniteGrid
                        items={inactiveBadges}
                        itemGrid={{ width: THUMB_SIZE, height: THUMB_SIZE, spacing: 2 }}
                        getKey={badge => `badge-${badge.code}`}
                        itemRender={badge => (
                            <BadgeThumb
                                badge={badge}
                                badgeUrl={badgeUrl}
                                selected={badge.code === selectedBadgeCode}
                                onSelect={selectBadge}
                            />
                        )}
                    />
                </Box>
            </Region>
            <ThemeText
                text={t('inventory.badges.activebadges')}
                textStyle="u_headline_small"
                textOptions={{ align: 'center' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 330, top: 32, width: 134 }}
            />
            <Region layout={{ position: 'absolute', left: 335, top: 58, width: 135, height: 120, flexDirection: 'row', flexWrap: 'wrap', gap: 2, alignContent: 'flex-start' }}>
                {activeBadges.map(badge => (
                    <BadgeThumb
                        key={`worn-${badge.code}`}
                        badge={badge}
                        badgeUrl={badgeUrl}
                        selected={badge.code === selectedBadgeCode}
                        onSelect={selectBadge}
                    />
                ))}
            </Region>
            <Region layout={{ position: 'absolute', left: 0, top: 184, width: 468, height: 78 }}>
                <Border
                    variant="3"
                    layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
                />
                {selectedBadge && (
                    <>
                        <ThemeImage
                            src={badgeUrl.replace('%badgename%', selectedBadge.code)}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 9, top: 14, width: 50, height: 50 }}
                        />
                        <Region layout={{ position: 'absolute', left: 63, top: 3, width: 271, flexDirection: 'column' }}>
                            <ThemeText
                                text={t(`badge_name_${selectedBadge.code}`, selectedBadge.code)}
                                textStyle="u_regular"
                                verticalAlign="top"
                                layout={{ width: 211, height: 17, flexShrink: 0 }}
                            />
                            <Box layout={{ width: 271, maxHeight: 28, flexShrink: 0, overflow: 'hidden' }}>
                                <ThemeText
                                    text={t(`badge_desc_${selectedBadge.code}`, '')}
                                    textStyle="u_regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 267 }}
                                    verticalAlign="top"
                                    layout={{ width: 271 }}
                                />
                            </Box>
                            {isBadgeRarityStandaloneTier(selectedBadge.rarityId, uncommonRarityEnabled) && (
                                <Border
                                    variant="2"
                                    name="badgeRarityTag"
                                    tintColor="#cccccc"
                                    layout={{ marginTop: 2, width: 92, height: 17, flexShrink: 0 }}
                                >
                                    <ThemeText
                                        text={rarityLabel(selectedBadge.rarityId)}
                                        textStyle="u_regular"
                                        textOptions={{ fill: `#${getBadgeRarityWhiteBackgroundTagColor(selectedBadge.rarityId, uncommonRarityEnabled).toString(16).padStart(6, '0')}` }}
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 5, top: 2, width: 81, height: 13 }}
                                    />
                                </Border>
                            )}
                        </Region>
                    </>
                )}
                {!selectedBadge && (
                    <ThemeText
                        text={t('inventory.badges.defaultdescription')}
                        textStyle="u_regular"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 63, top: 3, width: 211, height: 17 }}
                    />
                )}
                <Button
                    variant="3"
                    name="wearBadge_button"
                    textStyle="button_shiny_regular"
                    disabled={!canToggle}
                    onPointerTap={() => selectedBadge && toggleInventoryBadgeWearing(send, selectedBadge.code)}
                    layout={{ position: 'absolute', left: 282, top: 40, width: 179, height: 28 }}
                >
                    {isWorn ? t('inventory.badges.clearbadge') : t('inventory.badges.wearbadge')}
                </Button>
            </Region>
        </Region>
    );
};

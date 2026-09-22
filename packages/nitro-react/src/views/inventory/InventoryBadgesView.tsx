/**
 * The inventory's badges page - the `badges` region of `inventory_xml` (Flash `badges/BadgesView`),
 * as it looks with nothing selected, which is all the port can show: it neither requests nor
 * stores the badge inventory. Flash has no loading or empty state for this page, so its chrome is
 * what it draws before any badge is picked (`BadgesView.updateActionView` with no selection):
 * the `options_container` row and `filter.rarity` (style 0, 274,2 119x21), the `wearingTitle`
 * heading over the empty `active_items` grid, and the `descriptionArea` (0,184 468x78) - its
 * style 3 border, an empty `badgeName` (`clearSelectedBadgeDetails`) and the `wearBadge_button`
 * disabled. The `inactive_items` grid and its pages, the badge image, description, rarity tag
 * and owner count, and `achievements_score_container` need the badge data and are not drawn.
 */
import { useTranslation } from '#base/context/system';
import { Border, Button, Dropmenu, Region, ThemeText } from '#base/theme';

import { InventoryOptionsContainer } from './InventoryOptionsContainer';

export const InventoryBadgesView = () => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, width: 468, bottom: 0, overflow: 'hidden' }}>
            <InventoryOptionsContainer />
            <Dropmenu
                variant="0"
                layout={{ position: 'absolute', left: 274, top: 2, width: 119, height: 21 }}
            />
            <ThemeText
                text={t('inventory.badges.activebadges')}
                textStyle="u_headline_small"
                textOptions={{ align: 'center' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 330, top: 32, width: 134 }}
            />
            <Region layout={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 78 }}>
                <Border
                    variant="3"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Button
                    variant="3"
                    textStyle="button_shiny_regular"
                    disabled
                    layout={{ position: 'absolute', right: 7, top: 40, width: 179, height: 28 }}
                >
                    {t('inventory.badges.wearbadge')}
                </Button>
            </Region>
        </Region>
    );
};

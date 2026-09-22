/**
 * `HabbiconPopupController` - the item popup over a clicked tile, `habbicon_view.xml`'s
 * `habbicon_item_popup` in its `habbicon_popup_layer` (560x428 at 0,102 of the content, not
 * clipped): a style 4 `habbicon_popup_background` (`#efefef`, 180 wide) holding the
 * `habbicon_popup_content_list` (6px down, 5px between items, the background sized to it), the
 * `pointer_crossover` at its bottom and the rhombus `habbicon_popup_pointer` hanging under it.
 *
 * `configurePopup` by `HabbiconPopupMode.resolve`: the habbicon's name, then
 * - purchase: `habbicon.popup.desc.not_owned` and the bottom bar - its price, the currency icon
 *   and `generic.buy`, right-aligned at 168;
 * - info (a reward, or a habbicon without a price): what it is - owned, claim or locked;
 * - claim / add to favourites (green) / remove from favourites (`#7a0030`): the action button.
 *
 * `positionPopup` centres it over the tile, 2px into the tile's top edge, kept 4px inside the
 * layer's sides and within its height. The hub hides it on a press outside it and the tile
 * (not within 75ms of showing it) and on any mouse wheel (`onStageMouseDown`, `onStageMouseWheel`).
 */
import { Container as PixiContainer } from 'pixi.js';

import { formatHabbiconPrice, getHabbiconPriceCurrency, HabbiconEntryModel, HabbiconPopupMode, HabbiconPopupModeName, resolveHabbiconPopupMode } from '#base/context/habbicons';
import { useTranslation } from '#base/context/system';
import { Border, Box, Button, Region, Shape, ThemeText } from '#base/theme';
import { CatalogCurrencyIcon } from '#base/views/catalog/CatalogCurrencyIcon';

import { HABBICON_POPUP_LIST_BOTTOM, HABBICON_POPUP_LIST_TOP, HABBICON_POPUP_POINTER_HEIGHT, HABBICON_POPUP_WIDTH, habbiconPopupParts } from './habbiconPopupPlacement';

/** `habbicon_popup_action_button`'s green, and `§_-71P§` for removing a favourite. */
const ACTION_COLOR = '#01a101';
const REMOVE_FAVORITE_COLOR = '#7a0030';

export interface HabbiconPopupViewProps {
    entry: HabbiconEntryModel;
    x: number;
    y: number;
    onAction: (entry: HabbiconEntryModel, mode: HabbiconPopupModeName) => void;
    onBuy: (entry: HabbiconEntryModel) => void;
    /** The popup's own window, for the hub's outside-press test. */
    popupRef: (node: PixiContainer | null) => void;
}

export const HabbiconPopupView = ({ entry, x, y, onAction, onBuy, popupRef }: HabbiconPopupViewProps) => {
    const t = useTranslation();
    const mode = resolveHabbiconPopupMode(entry);
    const parts = habbiconPopupParts(mode);
    const localize = (key: string, fallback: string) => {
        const value = t(key, fallback);

        return (value && value.length) ? value : fallback;
    };

    // `resolveDescription`.
    let description = localize('habbicon.popup.desc.not_owned', 'Not owned');

    if (mode === HabbiconPopupMode.INFO) {
        if (entry.owned || entry.favorite) description = localize('generic.owned', 'Owned');
        else if (entry.isReward) description = localize(entry.claimable ? 'habbicon_reward.claim' : 'habbicon.popup.desc.locked', entry.claimable ? 'Claim' : 'Locked');
    }

    let actionCaption = localize('habbicon_reward.claim', 'Claim');
    let actionColor = ACTION_COLOR;

    if (mode === HabbiconPopupMode.REMOVE_FAVORITE) {
        actionCaption = localize('habbicon.favourite.remove', 'Remove from favourites');
        actionColor = REMOVE_FAVORITE_COLOR;
    } else if (mode === HabbiconPopupMode.ADD_FAVORITE) {
        actionCaption = localize('habbicon.favourite.add', 'Add to favourites');
    }

    return (
        <Box
            ref={popupRef}
            layout={{ position: 'absolute', left: x, top: y, width: HABBICON_POPUP_WIDTH, flexDirection: 'column' }}
        >
            <Border
                variant="4"
                tintColor="#efefef"
                layout={{ width: HABBICON_POPUP_WIDTH, flexShrink: 0, paddingTop: HABBICON_POPUP_LIST_TOP, paddingBottom: HABBICON_POPUP_LIST_BOTTOM, flexDirection: 'column', gap: 5 }}
            >
                <ThemeText
                    text={entry.name.length ? entry.name : 'Habbicon'}
                    textStyle="u_bold"
                    textOptions={{ align: 'center' }}
                    verticalAlign="top"
                    layout={{ width: 164, height: 17, marginLeft: 8, flexShrink: 0 }}
                />
                {parts.description && (
                    <ThemeText
                        text={description}
                        textStyle="u_regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 152 }}
                        clip
                        verticalAlign="top"
                        layout={{ width: 156, height: 20, marginLeft: 12, flexShrink: 0 }}
                    />
                )}
                {parts.actionRow && (
                    <Region layout={{ width: HABBICON_POPUP_WIDTH, height: 28, flexShrink: 0 }}>
                        <Button
                            variant="5"
                            tintColor={actionColor}
                            textStyle="button_shiny_regular"
                            onPointerTap={() => onAction(entry, mode)}
                            layout={{ position: 'absolute', left: 12, top: 0, width: 156, height: 28 }}
                        >
                            {actionCaption}
                        </Button>
                    </Region>
                )}
                {parts.bottomBar && (
                    <Region layout={{ width: HABBICON_POPUP_WIDTH, height: 28, flexShrink: 0 }}>
                        <Box layout={{ position: 'absolute', right: 12, top: 0, height: 28, flexDirection: 'row', gap: 4 }}>
                            <ThemeText
                                text={formatHabbiconPrice(entry.priceCredits, entry.priceActivityPoints)}
                                textStyle="u_bold"
                                verticalAlign="top"
                                layout={{ marginTop: 6, flexShrink: 0 }}
                            />
                            <CatalogCurrencyIcon
                                type={getHabbiconPriceCurrency(entry.priceActivityPoints, entry.activityPointType)}
                                big={false}
                                layout={{ width: 16, height: 16, marginTop: 8, flexShrink: 0 }}
                            />
                            <Button
                                variant="5"
                                tintColor={ACTION_COLOR}
                                textStyle="button_shiny_regular"
                                onPointerTap={() => onBuy(entry)}
                                layout={{ width: 57, height: 28, flexShrink: 0 }}
                            >
                                {t('generic.buy')}
                            </Button>
                        </Box>
                    </Region>
                )}
                <Region
                    backgroundColor="#efefef"
                    layout={{ position: 'absolute', left: 84, bottom: 0, width: 13, height: 2 }}
                />
            </Border>
            <Region layout={{ width: 15, height: HABBICON_POPUP_POINTER_HEIGHT, marginLeft: 83, flexShrink: 0, overflow: 'hidden' }}>
                <Shape
                    shape="rhombus"
                    color="#efefef"
                    strokeThickness={1}
                    layout={{ position: 'absolute', left: 0, top: -8, width: 15, height: 15 }}
                />
            </Region>
        </Box>
    );
};

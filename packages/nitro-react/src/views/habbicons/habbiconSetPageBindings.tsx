/**
 * `HabbiconSetPageView` + `HabbiconRewardPanelView` - the all sets tab's page for the selected set,
 * `habbicon_view.xml`'s `set_page_container`. With no set the page is hidden.
 *
 * `refresh`: the set's title and description, its progress bar and `habbicon_book.set_progress.count`,
 * one `tile_template` clone per habbicon in `set_grid`, then `empty_tile_template`s up to
 * `VISIBLE_SLOT_COUNT` (20) (`addEmptySlots`), and the reward panel.
 *
 * The reward panel (`HabbiconRewardPanelView.refresh`), with no reward hiding `reward_panel` and
 * `reward_buy_container`:
 * - `reward_panel`: `habbicon_book.reward.title`, the reward's preview in `reward_habbicon` (a grey
 *   40x40 square while none is loaded), a line saying whether it is claimable, claimed or still
 *   locked, and `reward_action_button` - "Claimed" once owned, else "Claim", its section disabled
 *   unless claimable (`claimHabbicon`).
 * - `reward_buy_container`: the set's price, its currency icon and `reward_buy_button`
 *   (`openHabbiconSetPurchaseConfirmation`), only while the set can be bought and its reward is
 *   neither owned nor claimable (`isRewardBuyable`).
 *
 * `rewardTile` is `null` in Flash, so the reward's frame never opens the item popup.
 */
import { FederatedPointerEvent, Texture } from 'pixi.js';

import { claimHabbicon, openHabbiconSetPurchaseConfirmation } from '#base/commands';
import { formatHabbiconPrice, getHabbiconPriceCurrency, getHabbiconSetProgressRatio, HabbiconEntryModel, HabbiconSetModel } from '#base/context/habbicons';
import { useTranslation } from '#base/context/system';
import { Region, TemplateBindings, TemplateItem, ThemeImage } from '#base/theme';
import { getCurrencyIconStyle } from '#base/utils';

import { HabbiconProgressBarView } from './HabbiconProgressBarView';
import { hideHabbiconProgressBar } from './habbiconTemplate';
import { habbiconEmptyTileItem, habbiconTileItem } from './habbiconTileItems';

/** `HabbiconSetPageView.VISIBLE_SLOT_COUNT`. */
const VISIBLE_SLOT_COUNT = 20;

/** `updateRewardBitmap`'s stand-in: `new BitmapData(40, 40, false, 0x8f8f8f)`. */
const MISSING_PREVIEW_COLOR = '#8f8f8f';

/** `isRewardOwned`. */
const isRewardOwned = (reward: HabbiconEntryModel | undefined): boolean => !!reward && (reward.owned || reward.favorite);

/** `isRewardClaimable`. */
const isRewardClaimable = (reward: HabbiconEntryModel | undefined): boolean => !!reward && reward.claimable && !isRewardOwned(reward);

/** `isRewardBuyable`. */
const isRewardBuyable = (set: HabbiconSetModel | undefined, reward: HabbiconEntryModel | undefined): boolean => !!set && set.canBuy && !!reward && !reward.owned && !reward.favorite && !reward.claimable;

export interface HabbiconSetPageBindingsOptions {
    set: HabbiconSetModel | undefined;
    t: ReturnType<typeof useTranslation>;
    send: Parameters<typeof claimHabbicon>[0];
    config: Record<string, unknown>;
    previews: Readonly<Record<number, Texture>>;
    lockedPreviews: Readonly<Record<number, Texture>>;
    animate: boolean;
    /** Changes with every `refresh`: the grid is filled anew and scrolled back, the bar snaps. */
    resetKey: string;
    activeTileId: string | undefined;
    hoveredTileId: string | undefined;
    onTileClick: (entry: HabbiconEntryModel, event: FederatedPointerEvent) => void;
    onTileHover: (entry: HabbiconEntryModel, hovered: boolean) => void;
}

/** `HabbiconRewardPanelView.refresh`. */
const rewardPanelBindings = (set: HabbiconSetModel, { t, send, config, previews }: HabbiconSetPageBindingsOptions): TemplateBindings => {
    const reward = set.rewardHabbicon;

    if (!reward) return { reward_panel: { visible: false }, reward_buy_container: { visible: false } };

    const preview = previews[reward.habbiconId];
    const owned = isRewardOwned(reward);
    const claimable = isRewardClaimable(reward);
    const buyable = isRewardBuyable(set, reward);

    let description = t('habbicon_book.reward.locked', 'Complete this set to unlock the reward.');

    if (claimable) description = t('habbicon_book.reward.claimable', 'Reward ready to claim.');
    else if (owned) description = t('habbicon_book.reward.claimed', 'Reward claimed.');

    return {
        reward_panel: { visible: true },
        reward_title: { caption: '${habbicon_book.reward.title}' },
        reward_habbicon: {
            children: preview
                ? (
                        <ThemeImage
                            texture={preview}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
                        />
                    )
                : (
                        <Region
                            backgroundColor={MISSING_PREVIEW_COLOR}
                            layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
                        />
                    ),
        },
        reward_description: { caption: description },
        reward_action_button: {
            caption: owned ? '${habbicon_reward.claimed}' : '${habbicon_reward.claim}',
            disableSection: !claimable,
            onPointerTap: () => {
                if (isRewardClaimable(reward)) claimHabbicon(send, reward.habbiconId);
            },
        },
        reward_buy_container: { visible: buyable },
        reward_buy_price: { caption: formatHabbiconPrice(set.priceCredits, set.priceActivityPoints) },
        reward_buy_currency_icon: { style: String(getCurrencyIconStyle(getHabbiconPriceCurrency(set.priceActivityPoints, set.activityPointType), config, false)) },
        reward_buy_button: {
            onPointerTap: () => {
                if (isRewardBuyable(set, reward)) openHabbiconSetPurchaseConfirmation(set);
            },
        },
    };
};

export const habbiconSetPageBindings = (options: HabbiconSetPageBindingsOptions): TemplateBindings => {
    const { set, t, previews, lockedPreviews, animate, resetKey, activeTileId, hoveredTileId, onTileClick, onTileHover } = options;

    if (!set) return { set_page_container: { visible: false } };

    const tiles: TemplateItem[] = set.habbicons.map(entry => habbiconTileItem({
        from: 'tile_template',
        entry,
        texture: (entry.owned || entry.claimable) ? previews[entry.habbiconId] : lockedPreviews[entry.habbiconId],
        active: entry.id === activeTileId,
        hovered: entry.id === hoveredTileId,
        onClick: onTileClick,
        onHover: onTileHover,
    }));

    // `addEmptySlots`.
    for (let slot = 0; slot < Math.max(0, VISIBLE_SLOT_COUNT - set.habbicons.length); slot++) tiles.push(habbiconEmptyTileItem(slot));

    return {
        set_page_container: { visible: true },
        set_title: { caption: set.title },
        set_description: { caption: set.description },
        set_progress_bar: {
            children: (
                <HabbiconProgressBarView
                    part="set_progress_bar"
                    ratio={getHabbiconSetProgressRatio(set)}
                    animate={animate}
                    resetKey={resetKey}
                />
            ),
        },
        ...hideHabbiconProgressBar('set_progress_bar'),
        set_progress_text: { caption: t('habbicon_book.set_progress.count', '', { collected: String(set.completed), total: String(set.total) }) },
        set_grid: { items: tiles, scrollResetKey: resetKey },
        ...rewardPanelBindings(set, options),
    };
};

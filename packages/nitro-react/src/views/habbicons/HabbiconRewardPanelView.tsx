/**
 * `HabbiconRewardPanelView` - the set page's right column (`habbicon_view.xml`: the item list at
 * 252,106, 116 wide, 9px between its two borders, each sized by its own item list):
 *
 * - `reward_panel` (style 3, `#e7d5b2`): `habbicon_book.reward.title`, the reward's preview in
 *   the 46x46 `reward_habbicon_frame` (a grey 40x40 square while none is loaded), a line saying
 *   whether it is claimable, claimed or still locked, and `reward_action_button` - "Claimed" once
 *   owned, else "Claim", enabled only while claimable (`claimHabbicon`).
 * - `reward_buy_container`: `habbicon_book.buy_set` with the set's price, its currency icon and
 *   `reward_buy_button` (`openHabbiconSetPurchaseConfirmation`), only while the set can be bought
 *   and its reward is neither owned nor claimable (`isRewardBuyable`).
 *
 * With no set, or a set without a reward, neither shows. `rewardTile` is `null` in Flash, so the
 * reward's frame never opens the item popup.
 */
import { claimHabbicon, openHabbiconSetPurchaseConfirmation } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { formatHabbiconPrice, getHabbiconPriceCurrency, HabbiconEntryModel, HabbiconSetModel, useHabbiconsStore } from '#base/context/habbicons';
import { useTranslation } from '#base/context/system';
import { Border, Box, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogCurrencyIcon } from '#base/views/catalog/CatalogCurrencyIcon';

/** `createHabbiconBitmap`'s stand-in: `new BitmapData(40, 40, false, 0x8f8f8f)`. */
const MISSING_PREVIEW_COLOR = '#8f8f8f';

/** `isRewardOwned`. */
const isRewardOwned = (reward: HabbiconEntryModel | undefined): boolean => !!reward && (reward.owned || reward.favorite);

/** `isRewardClaimable`. */
const isRewardClaimable = (reward: HabbiconEntryModel | undefined): boolean => !!reward && reward.claimable && !isRewardOwned(reward);

/** `isRewardBuyable`. */
const isRewardBuyable = (set: HabbiconSetModel | undefined, reward: HabbiconEntryModel | undefined): boolean => !!set && set.canBuy && !!reward && !reward.owned && !reward.favorite && !reward.claimable;

export const HabbiconRewardPanelView = ({ set }: { set: HabbiconSetModel | undefined }) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const reward = set?.rewardHabbicon;
    const preview = useHabbiconsStore(x => (reward ? x.previews[reward.habbiconId] : undefined));

    if (!set || !reward) return null;

    const owned = isRewardOwned(reward);
    const claimable = isRewardClaimable(reward);
    const buyable = isRewardBuyable(set, reward);

    let description = t('habbicon_book.reward.locked', 'Complete this set to unlock the reward.');

    if (claimable) description = t('habbicon_book.reward.claimable', 'Reward ready to claim.');
    else if (owned) description = t('habbicon_book.reward.claimed', 'Reward claimed.');

    return (
        <Box layout={{ position: 'absolute', left: 252, top: 106, width: 116, flexDirection: 'column', gap: 9 }}>
            <Border
                variant="3"
                tintColor="#e7d5b2"
                layout={{ width: 116, flexShrink: 0, paddingTop: 9, paddingBottom: 8, flexDirection: 'column', gap: 6 }}
            >
                <ThemeText
                    text={t('habbicon_book.reward.title')}
                    textStyle="u_bold"
                    textOptions={{ fill: '#2b2b2b', align: 'center' }}
                    verticalAlign="top"
                    layout={{ width: 100, marginLeft: 8, flexShrink: 0 }}
                />
                <Border
                    variant="3"
                    tintColor="#f8ebd6"
                    layout={{ width: 46, height: 46, marginLeft: 35, flexShrink: 0 }}
                >
                    {preview
                        ? (
                                <ThemeImage
                                    texture={preview}
                                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                    layout={{ position: 'absolute', left: 3, top: 3, width: 40, height: 40 }}
                                />
                            )
                        : (
                                <Region
                                    backgroundColor={MISSING_PREVIEW_COLOR}
                                    layout={{ position: 'absolute', left: 3, top: 3, width: 40, height: 40 }}
                                />
                            )}
                </Border>
                <ThemeText
                    text={description}
                    textStyle="u_regular"
                    textOptions={{ fill: '#3b3b3b', fontSize: 10, wordWrap: true, wordWrapWidth: 96, align: 'center' }}
                    verticalAlign="top"
                    layout={{ width: 100, marginLeft: 8, flexShrink: 0 }}
                />
                <Button
                    variant="5"
                    tintColor="#01a101"
                    textStyle="button_shiny_regular"
                    disabled={!claimable}
                    onPointerTap={() => {
                        if (isRewardClaimable(reward)) claimHabbicon(send, reward.habbiconId);
                    }}
                    layout={{ width: 100, height: 28, marginLeft: 8, flexShrink: 0 }}
                >
                    {t(owned ? 'habbicon_reward.claimed' : 'habbicon_reward.claim')}
                </Button>
            </Border>
            {buyable && (
                <Border
                    variant="3"
                    tintColor="#e7d5b2"
                    layout={{ width: 116, flexShrink: 0, paddingTop: 9, paddingBottom: 9, flexDirection: 'column', gap: 8 }}
                >
                    <ThemeText
                        text={t('habbicon_book.buy_set')}
                        textStyle="u_regular"
                        textOptions={{ fill: '#2b2b2b', wordWrap: true, wordWrapWidth: 96, align: 'center' }}
                        flashFormat={{ bold: true }}
                        verticalAlign="top"
                        layout={{ width: 100, marginLeft: 8, flexShrink: 0 }}
                    />
                    {/* `resize_on_item_update` with the right edge kept at 108. */}
                    <Box layout={{ height: 28, flexShrink: 0, flexDirection: 'row', justifyContent: 'flex-end', gap: 4, marginRight: 8 }}>
                        <ThemeText
                            text={formatHabbiconPrice(set.priceCredits, set.priceActivityPoints)}
                            textStyle="u_bold"
                            verticalAlign="top"
                            layout={{ marginTop: 5, flexShrink: 0 }}
                        />
                        <CatalogCurrencyIcon
                            type={getHabbiconPriceCurrency(set.priceActivityPoints, set.activityPointType)}
                            big={false}
                            layout={{ width: 16, height: 16, marginTop: 7, flexShrink: 0 }}
                        />
                        <Button
                            variant="5"
                            tintColor="#01a101"
                            textStyle="button_shiny_regular"
                            onPointerTap={() => {
                                if (isRewardBuyable(set, reward)) openHabbiconSetPurchaseConfirmation(set);
                            }}
                            layout={{ width: 88, height: 28, flexShrink: 0 }}
                        >
                            {t('generic.buy')}
                        </Button>
                    </Box>
                </Border>
            )}
        </Box>
    );
};

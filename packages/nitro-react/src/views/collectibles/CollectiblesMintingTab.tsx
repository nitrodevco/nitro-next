/**
 * The minting tab - `tabs/MintInventoryListTab` in `mintingContainer` of `collectible_view.xml`:
 * the header texts, the mintable furni (`itemgrid_inventory`, one `MintInventoryItemRenderer`
 * each: its icon and `x<amount in the inventory>` or `-`), the preview of the one picked, and the
 * footer - the token balance and the token pack shop with a wallet, the "no wallet" box without.
 * Until the five things it waits for are in, `loading_contents` covers it.
 *
 * The preview (`preview_container`, shown once the grid has items) is `initMintItemPreview`'s: the
 * furni (the previewer has only the bitmap, avatar and placeholder windows), its name, its price
 * in tokens beside the collect button, the "no furni" warning when none is held, the region lock
 * text and icon, and the minting period's time bar - filled by the time left and redrawn once a
 * second (`updateProgressBar`), reading `shop.minting.time_ended` and disabling the collect button
 * once the period is over.
 *
 * The layout's `stamps_purchase_input` sits in a border it hides and nothing shows (the pack is
 * picked from `stamps_purchase_dropdown`), so it is not drawn.
 */
import { buyMintTokens, collectMintItem, openCreateWalletPage, openWalletSettingsPage, selectMintItem, selectMintTokenOffer } from '#base/commands';
import { useCollectiblesStore, wrapMintableItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { Border, Button, Dropmenu, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

import { CollectiblesPreviewBackground } from './CollectiblesCollectionView';
import { CollectiblesItemCell } from './CollectiblesItemCell';
import { CollectiblesLoadingView } from './CollectiblesLoadingView';
import { COLLECTIBLES_HUB_PREVIEW_SLOTS } from './collectiblesPreviewSlots';
import { CollectiblesProductPreview } from './CollectiblesProductPreview';
import { CollectiblesProgressBar } from './CollectiblesProgressBar';

/** The minting previewer's windows: `product_preview`, `avatar_image_widget` and `placeholder_image`. */
const MINT_PREVIEW_SLOTS = {
    productPreview: COLLECTIBLES_HUB_PREVIEW_SLOTS.productPreview,
    avatar: COLLECTIBLES_HUB_PREVIEW_SLOTS.avatar,
    placeholder: COLLECTIBLES_HUB_PREVIEW_SLOTS.placeholder,
};

/** `mint_info_container`'s `progress_padded_bar` width, and its layout fill before `updateProgressBar` runs. */
const MINT_BAR_WIDTH = 220;
const MINT_BAR_LAYOUT_FILL = 120;
/** The layout's colours of `progress_bar_top` / `progress_bar_bottom`. */
const MINT_BAR_TOP_COLOR = 0xFF00910A;
const MINT_BAR_BOTTOM_COLOR = 0xFF037C00;

export const CollectiblesMintingTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const clock = useSecondsClock();
    const ready = useCollectiblesStore(x => x.mintReady);
    const items = useCollectiblesStore(x => x.mintItems);
    const selectedIndex = useCollectiblesStore(x => x.mintSelectedIndex);
    const preview = useCollectiblesStore(x => x.mintPreview);
    const previewInfo = useCollectiblesStore(x => x.mintPreviewInfo);
    const collectEnabled = useCollectiblesStore(x => x.mintCollectEnabled);
    const tokenBalance = useCollectiblesStore(x => x.mintTokenBalance);
    const tokenOffers = useCollectiblesStore(x => x.mintTokenOffers);
    const selectedOfferIndex = useCollectiblesStore(x => x.mintSelectedOfferIndex);
    const silverCost = useCollectiblesStore(x => x.mintSilverCost);
    const buyEnabled = useCollectiblesStore(x => x.mintBuyEnabled);
    const walletKnown = useCollectiblesStore(x => x.mintWalletKnown);
    const activeWallet = useCollectiblesStore(x => x.activeWallet);
    const populated = useCollectiblesStore(x => x.mintPopulated);

    const selected = items[selectedIndex];
    const now = performance.timeOrigin + clock;
    // `updateProgressBar`: only an item with a start and an end time moves the bar.
    const start = selected ? selected.item.startTime * 1000 : 0;
    const end = selected ? selected.item.endTime * 1000 : 0;
    const timed = (start > 0) && (end > 0);
    const timeLeft = Math.max(0, end - now);
    const fraction = Math.min(1, timeLeft / (end - start));
    const ended = timed && (fraction <= 0);
    const barFill = timed ? Math.trunc(MINT_BAR_WIDTH * Math.max(0, fraction)) : MINT_BAR_LAYOUT_FILL;
    const barText = timed ? (ended ? t('shop.minting.time_ended', '') : `${t('shop.minting.time_left', '')}: ${GetFriendlyTime(t, timeLeft / 1000)}`) : t('collectibles.preview.time_left');
    const hasWallet = walletKnown ? (activeWallet !== null) : true;
    const regionLocked = previewInfo?.regionLocked ?? false;

    return (
        <Region
            name="mintingContainer"
            layout={{ position: 'absolute', left: 0, width: 490, top: 125, height: 430 }}
        >
            {ready && (
                <Region
                    name="loaded_content"
                    layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 430 }}
                >
                    <Region
                        name="category_minting_header_region"
                        layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 58 }}
                    >
                        <Region
                            name="category_name_region"
                            layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
                        >
                            <ThemeText
                                text={t('shop.minting.info.title')}
                                textStyle="u_regular"
                                flashFormat={{ bold: true }}
                                name="minting_header"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, top: 0, minWidth: 2, maxWidth: 270 }}
                            />
                        </Region>
                        <Region
                            name="category_minting_description_region"
                            layout={{ position: 'absolute', left: 0, width: 480, top: 22, height: 35, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('shop.minting.info.description')}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 476 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="furniture_container"
                        layout={{ position: 'absolute', left: 4, width: 480, top: 60, height: 262, overflow: 'hidden' }}
                    >
                        <ScrollArea
                            orientation="vertical"
                            variant="3"
                            layout={{ position: 'absolute', left: 0, width: 179, top: 0, height: 260 }}
                        >
                            <Region
                                name="itemgrid_inventory"
                                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
                            >
                                {items.map((mintItem, index) => (
                                    <CollectiblesItemCell
                                        key={`${mintItem.item.itemType}:${mintItem.item.itemTypeId}`}
                                        kind="mint"
                                        info={wrapMintableItem(mintItem.item, mintItem.amount)}
                                        active={index === selectedIndex}
                                        onSelect={() => selectMintItem(send, index)}
                                    />
                                ))}
                            </Region>
                        </ScrollArea>
                        {(!populated || (items.length > 0)) && (
                            <Region
                                name="preview_container"
                                layout={{ position: 'absolute', left: 191, width: 290, top: 0, height: 260 }}
                            >
                                <Border
                                    variant="3"
                                    name="collection_preview_bg"
                                    tintColor="#3d1f39"
                                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260, overflow: 'hidden' }}
                                >
                                    <CollectiblesPreviewBackground starActive={ready} />
                                    <CollectiblesProductPreview
                                        preview={preview}
                                        slots={MINT_PREVIEW_SLOTS}
                                    />
                                    <Region
                                        name="product_name_container"
                                        backgroundColor="#000000"
                                        backgroundAlpha={0.839}
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26 }}
                                    >
                                        <ThemeText
                                            text={previewInfo?.productName ?? 'Lorem ipsum hot air balloon'}
                                            textStyle="u_regular"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                            name="preview_furni_name"
                                            verticalAlign="top"
                                            layout={{ position: 'absolute', left: 0, width: 290, top: 5 }}
                                        />
                                    </Region>
                                    <Region
                                        name="collect_container"
                                        layout={{ position: 'absolute', left: 82, width: 200, top: 180, height: 30 }}
                                    >
                                        <Region layout={{ position: 'absolute', left: 100, top: 0, flexDirection: 'row' }}>
                                            <ThemeText
                                                text={String(previewInfo?.price ?? 1)}
                                                textStyle="u_regular"
                                                textOptions={{ fill: '#ffffff' }}
                                                name="stamp_pricing"
                                                verticalAlign="top"
                                                layout={{ marginTop: 6, flexShrink: 0 }}
                                            />
                                            <Region
                                                name="spacing"
                                                layout={{ width: 3, height: 30, flexShrink: 0 }}
                                            />
                                            <ThemeImage
                                                src={LayoutImage('shared/collectables_icon_curator_stamp_small.png')}
                                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                                layout={{ width: 18, height: 30, flexShrink: 0 }}
                                            />
                                            <Region
                                                name="spacing"
                                                layout={{ width: 7, height: 30, flexShrink: 0 }}
                                            />
                                            <Button
                                                variant="5"
                                                name="collect_button"
                                                tintColor="#01a101"
                                                disabled={!collectEnabled || ended}
                                                onPointerTap={() => collectMintItem(send)}
                                                layout={{ width: 62, height: 30, flexShrink: 0 }}
                                            >
                                                {t('collectibles.collect')}
                                            </Button>
                                        </Region>
                                    </Region>
                                    {(previewInfo?.noFurni ?? true) && (
                                        <Border
                                            variant="3"
                                            name="no_furni_notify"
                                            tintColor="#5a1003"
                                            blend={0.82}
                                            layout={{ position: 'absolute', left: 4, width: 282, top: 30, height: 50 }}
                                        >
                                            <ThemeText
                                                text={t('shop.minting.no_furni')}
                                                textStyle="u_regular"
                                                textOptions={{ fill: '#ffffff', fontSize: 11, wordWrap: true, wordWrapWidth: 270, align: 'center' }}
                                                markup
                                                verticalAlign="top"
                                                layout={{ position: 'absolute', left: 4, width: 274, alignSelf: 'center', marginTop: -1, marginBottom: 1, minWidth: 274, maxWidth: 274 }}
                                            />
                                        </Border>
                                    )}
                                    <Region
                                        name="mint_info_container"
                                        backgroundColor="#000000"
                                        backgroundAlpha={0.667}
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 214, height: 46 }}
                                    >
                                        <Region
                                            name="right_box"
                                            layout={{ position: 'absolute', left: 64, width: 226, top: 0, height: 46 }}
                                        >
                                            <ThemeText
                                                text={t(regionLocked ? 'shop.minting.region_locked' : 'shop.minting.region_unlocked')}
                                                textStyle="u_regular"
                                                textOptions={{ fill: '#ffffff', fontSize: 11, wordWrap: true, wordWrapWidth: 286 }}
                                                markup
                                                name="mint_lock_text"
                                                verticalAlign="top"
                                                layout={{ position: 'absolute', left: 0, width: 290, top: 4, minWidth: 290, maxWidth: 290, minHeight: 17, maxHeight: 17 }}
                                            />
                                            <CollectiblesProgressBar
                                                left={0}
                                                top={24}
                                                width={MINT_BAR_WIDTH}
                                                paddedWidth={MINT_BAR_WIDTH}
                                                fillWidth={barFill}
                                                topColor={MINT_BAR_TOP_COLOR}
                                                bottomColor={MINT_BAR_BOTTOM_COLOR}
                                                text={barText}
                                                textWidth={MINT_BAR_WIDTH}
                                            />
                                        </Region>
                                    </Region>
                                    {!regionLocked && (
                                        <ThemeImage
                                            name="mint_lock_open_icon"
                                            src={LayoutImage('catalog/collectables_lock_open.png')}
                                            bitmap={{}}
                                            layout={{ position: 'absolute', left: 7, width: 51, top: 208, height: 46 }}
                                        />
                                    )}
                                    {regionLocked && (
                                        <ThemeImage
                                            name="mint_lock_closed_icon"
                                            src={LayoutImage('catalog/collectables_lock_closed.png')}
                                            bitmap={{}}
                                            layout={{ position: 'absolute', left: 7, width: 52, top: 208, height: 46 }}
                                        />
                                    )}
                                </Border>
                            </Region>
                        )}
                    </Region>
                    <Region
                        name="category_footer"
                        layout={{ position: 'absolute', left: 0, width: 488, top: 330, height: 100 }}
                    >
                        <Border
                            variant="3"
                            name="large_border"
                            tintColor="#bac3cd"
                            layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100 }}
                        >
                            {hasWallet && (
                                <Region
                                    name="stamp_purchasing_container"
                                    layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100 }}
                                >
                                    <Border
                                        variant="3"
                                        name="stamps_container"
                                        tintColor="#d6dbe1"
                                        layout={{ position: 'absolute', left: 42, width: 200, top: 14, height: 72 }}
                                    >
                                        <ThemeImage
                                            src={LayoutImage('shared/collectables_icon_curator_stamp_large.png')}
                                            bitmap={{ stretchedX: false, stretchedY: false }}
                                            layout={{ position: 'absolute', left: 12, width: 48, top: 12, height: 48 }}
                                        />
                                        <ThemeText
                                            text={t('shop.minting.tokens')}
                                            textStyle="u_bold"
                                            textOptions={{ fontSize: 13 }}
                                            flashFormat={{ bold: false }}
                                            name="stamps_header"
                                            verticalAlign="top"
                                            layout={{ position: 'absolute', left: 68, top: 12 }}
                                        />
                                        <ThemeText
                                            text={String(tokenBalance)}
                                            textStyle="u_bold"
                                            textOptions={{ fontSize: 30 }}
                                            flashFormat={{ bold: false }}
                                            name="mint_token_balance"
                                            verticalAlign="top"
                                            layout={{ position: 'absolute', left: 67, top: 26 }}
                                        />
                                    </Border>
                                    <Border
                                        variant="3"
                                        name="stamp_buying_container"
                                        tintColor="#d6dbe1"
                                        layout={{ position: 'absolute', left: 246, width: 200, top: 14, height: 72 }}
                                    >
                                        <Region layout={{ position: 'absolute', left: 42, top: 4, flexDirection: 'row', gap: 6 }}>
                                            <ThemeText
                                                text={t('collectibles.buy.mint.tokens')}
                                                textStyle="u_bold"
                                                flashFormat={{ bold: false }}
                                                name="stamps_header"
                                                verticalAlign="top"
                                                layout={{ marginTop: 8, flexShrink: 0 }}
                                            />
                                            <Dropmenu
                                                variant="0"
                                                caption={tokenOffers[selectedOfferIndex] ? String(tokenOffers[selectedOfferIndex].amountTokens) : '100'}
                                                options={tokenOffers.map((offer, index) => ({ key: offer.offerId, label: String(offer.amountTokens), selected: index === selectedOfferIndex, onSelect: () => selectMintTokenOffer(index) }))}
                                                layout={{ width: 48, height: 21, marginTop: 5, flexShrink: 0 }}
                                            />
                                        </Region>
                                        <Region layout={{ position: 'absolute', left: 49, top: 36, flexDirection: 'row' }}>
                                            <ThemeText
                                                text={silverCost}
                                                textStyle="u_bold"
                                                textOptions={{ fontSize: 16 }}
                                                flashFormat={{ bold: false }}
                                                name="silver_cost_text"
                                                verticalAlign="top"
                                                layout={{ marginTop: 4, flexShrink: 0 }}
                                            />
                                            <Region
                                                name="spacing"
                                                layout={{ width: 4, height: 30, flexShrink: 0 }}
                                            />
                                            <ThemeImage
                                                src={LayoutImage('shared/pursearea_mid_silver_icon.png')}
                                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                                layout={{ width: 24, height: 30, flexShrink: 0 }}
                                            />
                                            <Region
                                                name="spacing"
                                                layout={{ width: 6, height: 30, flexShrink: 0 }}
                                            />
                                            <Button
                                                variant="5"
                                                name="silver_buy_button"
                                                tintColor="#2095d4"
                                                disabled={!buyEnabled}
                                                onPointerTap={buyMintTokens}
                                                layout={{ width: 100, height: 30, flexShrink: 0, minWidth: 100 }}
                                            >
                                                {t('generic.buy')}
                                            </Button>
                                        </Region>
                                    </Border>
                                </Region>
                            )}
                            {!hasWallet && (
                                <Region
                                    name="no_wallet_container"
                                    layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100 }}
                                >
                                    <ThemeText
                                        text={t('shop.minting.no_wallet.description')}
                                        textStyle="u_regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 356 }}
                                        name="no_wallet_text"
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 10, width: 360, alignSelf: 'center', marginTop: -41.5, marginBottom: 41.5, minHeight: 0, maxHeight: 60 }}
                                    />
                                    <ThemeImage
                                        src={LayoutImage('catalog/image_connection_problem.png')}
                                        bitmap={{ stretchedX: false, stretchedY: false }}
                                        layout={{ position: 'absolute', left: 380, width: 92, top: 5, height: 90 }}
                                    />
                                    <Button
                                        variant="5"
                                        name="create_wallet_button"
                                        tintColor="#2095d4"
                                        onPointerTap={openCreateWalletPage}
                                        layout={{ position: 'absolute', left: 10, width: 170, top: 62, height: 30, minWidth: 170, maxWidth: 170 }}
                                    >
                                        {t('shop.minting.create.wallet')}
                                    </Button>
                                    <Button
                                        variant="5"
                                        name="more_info_button"
                                        tintColor="#2095d4"
                                        onPointerTap={openWalletSettingsPage}
                                        layout={{ position: 'absolute', left: 192, width: 170, top: 62, height: 30, minWidth: 170, maxWidth: 170 }}
                                    >
                                        {t('shop.minting.link.wallet')}
                                    </Button>
                                </Region>
                            )}
                        </Border>
                    </Region>
                </Region>
            )}
            {!ready && <CollectiblesLoadingView />}
        </Region>
    );
};

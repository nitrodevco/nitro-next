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
 * once the period is over. An item with no start or end time leaves the bar as the layout has it.
 */
import { buyMintTokens, collectMintItem, openCreateWalletPage, openWalletSettingsPage, selectMintItem, selectMintTokenOffer } from '#base/commands';
import { useCollectiblesStore, wrapMintableItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { GetFriendlyTime } from '#base/utils';

import { CollectiblesTabWindow } from './CollectiblesTabWindow';
import { arrangeCollectiblesTimeBar, collectibleGridItem, collectiblesHubPreviewer, collectiblesLoadingBindings, collectiblesPreviewerBindings, collectiblesStarBinding, CollectiblesTimeBar, collectiblesTimeBarBindings, useCollectiblesHover } from './collectiblesTemplate';

const PREVIEWER = collectiblesHubPreviewer(true);

/** `mint_info_container`'s `progress_padded_bar` width. */
const MINT_BAR_WIDTH = 220;

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
    const hover = useCollectiblesHover();

    const selected = items[selectedIndex];
    const now = performance.timeOrigin + clock;
    // `updateProgressBar`: only an item with a start and an end time moves the bar.
    const start = selected ? selected.item.startTime * 1000 : 0;
    const end = selected ? selected.item.endTime * 1000 : 0;
    const timed = (start > 0) && (end > 0);
    const timeLeft = Math.max(0, end - now);
    const fraction = Math.min(1, timeLeft / (end - start));
    const ended = timed && (fraction <= 0);
    const bar: CollectiblesTimeBar | undefined = timed
        ? { fill: Math.trunc(MINT_BAR_WIDTH * Math.max(0, fraction)), text: ended ? t('shop.minting.time_ended', '') : `${t('shop.minting.time_left', '')}: ${GetFriendlyTime(t, timeLeft / 1000)}` }
        : undefined;
    const hasWallet = walletKnown ? (activeWallet !== null) : true;
    const regionLocked = previewInfo?.regionLocked ?? false;

    return (
        <CollectiblesTabWindow
            container="mintingContainer"
            bindings={{
                ...collectiblesLoadingBindings(ready),
                itemgrid_inventory: {
                    items: items.map((mintItem, index) => collectibleGridItem({
                        key: `${mintItem.item.itemType}:${mintItem.item.itemTypeId}`,
                        from: 'itemgrid_inventory/item_template',
                        kind: 'mint',
                        info: wrapMintableItem(mintItem.item, mintItem.amount),
                        active: index === selectedIndex,
                        hover,
                        onSelect: () => selectMintItem(send, index),
                    })),
                },
                preview_container: { visible: !populated || (items.length > 0) },
                bg_star: collectiblesStarBinding(ready),
                ...collectiblesPreviewerBindings(PREVIEWER, preview),
                ...(previewInfo && {
                    preview_furni_name: { caption: previewInfo.productName },
                    stamp_pricing: { caption: String(previewInfo.price) },
                    no_furni_notify: { visible: previewInfo.noFurni },
                }),
                collect_button: { disabled: !collectEnabled || ended, onPointerTap: () => collectMintItem(send) },
                mint_lock_text: { caption: t(regionLocked ? 'shop.minting.region_locked' : 'shop.minting.region_unlocked') },
                mint_lock_open_icon: { visible: !regionLocked },
                mint_lock_closed_icon: { visible: regionLocked },
                ...(bar && collectiblesTimeBarBindings(bar)),
                stamp_purchasing_container: { visible: hasWallet },
                no_wallet_container: { visible: !hasWallet },
                mint_token_balance: { caption: String(tokenBalance) },
                stamps_purchase_dropdown: tokenOffers.length
                    ? { options: tokenOffers.map(offer => String(offer.amountTokens)), selection: selectedOfferIndex, onSelect: selectMintTokenOffer }
                    : {},
                silver_cost_text: { caption: silverCost },
                silver_buy_button: { disabled: !buyEnabled, onPointerTap: buyMintTokens },
                create_wallet_button: { onPointerTap: openCreateWalletPage },
                more_info_button: { onPointerTap: openWalletSettingsPage },
            }}
            arrange={bar && (windows => arrangeCollectiblesTimeBar(windows, bar))}
        />
    );
};

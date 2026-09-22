/**
 * The collectibles hub's packets - the listeners `CollectiblesController.initComponent` adds
 * (`RedeemNftLootBoxStateMessageEvent`, `RedeemNftLootBoxResultMessageEvent`), those
 * `CollectiblesView` and each of its tabs add when the hub is built (`addMessageEvents` of
 * `CollectiblesView`, `CollectionsTab`, `MintInventoryListTab`, `ShopTab`, `TransferNftsTab`,
 * `RewardClaimsTab`), and `HabboCatalog`'s answers to a token pack or shop offer purchase
 * (`onNftStorePurchase`, and `onPurchaseOK` / `onPurchaseError` disposing the confirmation).
 *
 * Before the hub is built its tabs are not listening, so what they would take is dropped - as in
 * Flash, where the listeners only exist once `showCollectibleHub` has made the view.
 */
import {
    CollectableMintableItemTypesMessage, CollectibleMintableItemResultMessage, CollectibleMintingEnabledMessage, CollectibleMintTokenCountMessage, CollectibleMintTokenOffersMessage, CollectibleWalletAddressesMessage, NftBonusItemClaimResultMessage, NftClaimResultMessage,
    NftClaimsMessage, NftCollectionsMessage, NftCollectionsScoreMessage, NftRewardItemClaimResultMessage, NftStoreOffersMessage, NftStorePurchaseMessage, NftTransferAssetsResultMessage, NftTransferFeeMessage, PurchaseErrorMessage, PurchaseOKMessage,
    RedeemNftLootBoxResultMessage, RedeemNftLootBoxStateMessage,
} from '@nitrodevco/nitro-packets';

import {
    onCollectableMintableItemTypes, onCollectibleMintableItemResult, onCollectibleMintingEnabled, onCollectibleMintTokenCount, onCollectibleMintTokenOffers, onCollectiblesPurchaseAnswered, onCollectibleWalletAddresses, onCollectionClaimResult, onCollectorScore,
    onNftClaimResult, onNftClaims, onNftCollections, onNftStoreOffers, onNftStorePurchase, onNftTransferFee, onNftTransferResult, onRedeemNftLootBoxResult, onRedeemNftLootBoxState,
} from '#base/commands';
import { collectiblesStore } from '#base/context/collectibles';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCollectiblesHandlers = ({ send, subscribe }: WebSocketConnection) => {
    /** The hub has been built: its tabs are listening. */
    const hubListening = () => collectiblesStore.getState().hubCreated;

    return subscribeAll(subscribe, [
        // `CollectiblesController`.
        on(RedeemNftLootBoxStateMessage, data => onRedeemNftLootBoxState(data.state, data.openerAvatarId, data.reward)),
        on(RedeemNftLootBoxResultMessage, data => onRedeemNftLootBoxResult(data.resultCode)),

        // `CollectiblesView`.
        on(CollectibleWalletAddressesMessage, (data) => {
            if (hubListening()) onCollectibleWalletAddresses(send, data.stardustWalletAddress, data.walletAddresses);
        }),
        on(NftCollectionsScoreMessage, (data) => {
            if (hubListening()) onCollectorScore(data.score, data.highestScore, data.level);
        }),

        // `CollectionsTab`.
        on(NftCollectionsMessage, (data) => {
            if (hubListening()) onNftCollections(send, data.nftCollections);
        }),
        on(NftBonusItemClaimResultMessage, (data) => {
            if (hubListening()) onCollectionClaimResult(send, true, data.collectionId, data.walletAddress, data.success);
        }),
        on(NftRewardItemClaimResultMessage, (data) => {
            if (hubListening()) onCollectionClaimResult(send, false, data.collectionId, data.walletAddress, data.success);
        }),

        // `MintInventoryListTab`.
        on(CollectibleMintTokenCountMessage, (data) => {
            if (hubListening()) onCollectibleMintTokenCount(send, data.totalTokens);
        }),
        on(CollectibleMintingEnabledMessage, (data) => {
            if (hubListening()) onCollectibleMintingEnabled(send, data.enabled);
        }),
        on(CollectableMintableItemTypesMessage, (data) => {
            if (hubListening()) onCollectableMintableItemTypes(send, data.collectibleProductItems);
        }),
        on(CollectibleMintTokenOffersMessage, (data) => {
            if (hubListening()) onCollectibleMintTokenOffers(data.tokenOffers);
        }),
        on(CollectibleMintableItemResultMessage, (data) => {
            if (hubListening()) onCollectibleMintableItemResult(send, data.mintResult);
        }),

        // `ShopTab`.
        on(NftStoreOffersMessage, (data) => {
            if (hubListening()) onNftStoreOffers(send, data.nftStoreOffers);
        }),

        // `TransferNftsTab`.
        on(NftTransferFeeMessage, (data) => {
            if (hubListening()) onNftTransferFee(data.transferFee);
        }),
        on(NftTransferAssetsResultMessage, (data) => {
            if (hubListening()) onNftTransferResult(data.resultCode);
        }),

        // `RewardClaimsTab`.
        on(NftClaimsMessage, (data) => {
            if (hubListening()) onNftClaims(data.nftClaims);
        }),
        on(NftClaimResultMessage, (data) => {
            if (hubListening()) onNftClaimResult(data.resultCode);
        }),

        // `HabboCatalog`, for the confirmation of a token pack or shop offer. The catalogue's own
        // handlers show the alerts of `onPurchaseError`; this only takes the dialog down.
        on(NftStorePurchaseMessage, data => onNftStorePurchase(data.result)),
        on(PurchaseOKMessage, () => onCollectiblesPurchaseAnswered()),
        on(PurchaseErrorMessage, () => onCollectiblesPurchaseAnswered()),
    ]);
};

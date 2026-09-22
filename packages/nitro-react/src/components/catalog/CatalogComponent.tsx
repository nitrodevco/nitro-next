import { BuildersClubQueryFurniCountComposer, GetBundleDiscountRulesetComposer, GetCatalogIndexComposer, GetClubGiftInfoComposer, GetGiftWrappingConfigurationComposer, GetMarketplaceConfigurationComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useIsWindowVisible } from '#base/context/system';
import { bridgeCatalogRoomChanged, bridgeGameTokensPurchaseConfirmation, registerCatalogBundleHandlers, registerCatalogClubHandlers, registerCatalogGuildHandlers, registerCatalogHandlers, registerCatalogLimitedEditionHandlers, registerCatalogMarketplaceHandlers, registerCatalogMediaHandlers, registerCatalogPetHandlers, registerCatalogPurchaseFlowHandlers, registerCatalogRoomAdHandlers } from '#base/handlers';
import { useCatalogPageRequest, useCatalogPurchaseFlow, useRegisterHandlers } from '#base/hooks';
import { CatalogPurchaseConfirmationView } from '#base/views/catalog/CatalogPurchaseConfirmationView';
import { CatalogView } from '#base/views/catalog/CatalogView';
import { CatalogMarketplaceConfirmationView } from '#base/views/catalog/marketplace/CatalogMarketplaceConfirmationView';
import { CatalogRentConfirmationView } from '#base/views/catalog/purchase/CatalogRentConfirmationView';

/**
 * The catalogue window's mount, inside the provider of its store (`CatalogWrapper`): registers
 * the window's packet handlers for as long as the store lives, asks for the index the first time
 * the window opens (`HabboCatalog.toggleCatalog` -> `initCatalog`), and shows the window. The
 * purchase flow (`useCatalogPurchaseFlow`) and its dialogs - the purchase confirmation and the
 * rent confirmation - live as long as the store, shown or not, as does the marketplace's purchase
 * confirmation (`MarketplaceConfirmationDialog`, which `MarketPlaceLogic` owns). The first opening
 * also asks for the marketplace configuration (`MarketPlaceLogic`'s constructor).
 */
export const CatalogComponent = () => {
    const isVisible = useIsWindowVisible('catalog');
    const catalogType = useCatalogStore(x => x.catalogType);
    const rootNode = useCatalogStore(x => x.rootNode);
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();

    useRegisterHandlers(socket => registerCatalogHandlers(store, socket));
    useRegisterHandlers(socket => registerCatalogBundleHandlers(store, socket));
    useRegisterHandlers(socket => registerCatalogLimitedEditionHandlers(store, socket));
    useRegisterHandlers(socket => registerCatalogMediaHandlers(store, socket));
    useRegisterHandlers(socket => registerCatalogPetHandlers(store, socket));
    useRegisterHandlers(socket => registerCatalogGuildHandlers(store, socket));
    useRegisterHandlers(socket => registerCatalogRoomAdHandlers(store, socket));
    useRegisterHandlers(socket => registerCatalogClubHandlers(store, socket));
    useRegisterHandlers(() => bridgeCatalogRoomChanged(store));
    useRegisterHandlers(() => bridgeGameTokensPurchaseConfirmation(store));
    useRegisterHandlers(socket => registerCatalogPurchaseFlowHandlers(store, socket));
    useRegisterHandlers(socket => registerCatalogMarketplaceHandlers(store, socket));
    useCatalogPageRequest();
    useCatalogPurchaseFlow();

    useEffect(() => {
        if (!isVisible || rootNode) return;

        send(new GetGiftWrappingConfigurationComposer({}), new GetClubGiftInfoComposer({}), new GetCatalogIndexComposer({ catalogType }), new BuildersClubQueryFurniCountComposer({}), new GetBundleDiscountRulesetComposer({}), new GetMarketplaceConfigurationComposer({}));
    }, [ isVisible, rootNode, catalogType ]);

    // The purchase dialogs are windows of their own: a drop into the room opens the confirmation
    // while the catalogue is hidden, and the infostand and inventory open the rent confirmation.
    return (
        <>
            {isVisible && <CatalogView />}
            <CatalogPurchaseConfirmationView />
            <CatalogRentConfirmationView />
            <CatalogMarketplaceConfirmationView />
        </>
    );
};

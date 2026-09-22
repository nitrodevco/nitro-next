import { showPurchaseConfirmation } from '#base/commands';
import { useCatalogStoreApi } from '#base/context/catalog';
import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { Border, ButtonThick, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogPriceDisplayView } from './CatalogProductPriceView';

/**
 * The Builders Club loyalty list - the `builderLoyaltyWidget` container of
 * `layout_builders_club_loyalty.xml`, Flash's `BuilderLoyaltyCatalogWidget`, drawn from the
 * layout's own children (it attaches no view). The list's one template row is cloned for every
 * offer of the page: the Builders Club icon and the offer's name on a grey bar, its price
 * (`HabboCatalogUtils.showPriceInContainer` into `item_cost_box`) and a buy button that opens the
 * purchase confirmation for it. Unlike the add-ons, nothing here depends on the membership.
 */
export const CatalogBuilderLoyaltyWidgetView = ({ page }: CatalogWidgetProps) => {
    const store = useCatalogStoreApi();
    const productData = useSystemStore(x => x.productData);
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const t = useTranslation();

    return (
        <ScrollArea
            orientation="vertical"
            variant="3"
            layout={{ position: 'absolute', left: 0, width: 287, top: 0, bottom: 20 }}
        >
            <Region
                name="loyalty_list"
                layout={{ flexDirection: 'column', gap: 12, width: '100%' }}
            >
                {page.offers.map(offer => (
                    <Border
                        key={offer.offerId}
                        variant="2"
                        tintColor="#d7d7cf"
                        layout={{ height: 77, width: 269, marginLeft: 1, flexShrink: 0 }}
                    >
                        <Border
                            variant="3"
                            tintColor="#afafa9"
                            layout={{ position: 'absolute', left: 5, width: 260, top: 5, height: 25 }}
                        >
                            <ThemeImage
                                src={`${imageLibraryUrl}/catalogue/icon_193.png`}
                                bitmap={{ fitSizeToContents: true }}
                                layout={{ position: 'absolute', left: 8, top: 5 }}
                            />
                            <ThemeText
                                name="item_header"
                                text={productData[offer.localizationId]?.name ?? t(offer.localizationId)}
                                textStyle="u_headline_medium"
                                textOptions={{ fill: '#ffffff' }}
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 33, top: 2 }}
                            />
                        </Border>
                        <Region layout={{ position: 'absolute', left: 9, width: 125, top: 45, height: 24, flexDirection: 'row', gap: 3 }}>
                            <Region
                                name="item_cost_box"
                                layout={{ minWidth: 20, minHeight: 22, flexShrink: 0 }}
                            >
                                <CatalogPriceDisplayView offer={offer} />
                            </Region>
                        </Region>
                        <ButtonThick
                            variant="5"
                            name="item_buy"
                            tintColor="#0a9bc5"
                            onPointerTap={() => showPurchaseConfirmation(store, offer, page.pageId)}
                            layout={{ position: 'absolute', left: 123, width: 142, top: 37, height: 35, minWidth: 40 }}
                        >
                            {t('buy')}
                        </ButtonThick>
                    </Border>
                ))}
            </Region>
        </ScrollArea>
    );
};

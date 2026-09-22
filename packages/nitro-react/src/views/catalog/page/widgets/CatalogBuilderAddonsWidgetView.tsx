import { useState } from 'react';

import { hasBuilderSecondsLeft, showPurchaseConfirmation } from '#base/commands';
import { useCatalogStoreApi } from '#base/context/catalog';
import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { Border, ButtonThick, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/**
 * The Builders Club add-ons list - the `builderAddonsWidget` container of
 * `layout_builders_club_addons.xml`, Flash's `BuilderAddonsCatalogWidget`, drawn from the layout's
 * own children (it attaches no view). The list's one template row is cloned for every offer of the
 * page: the Builders Club icon and the offer's name on a grey bar, its price in credits (and in
 * diamonds, when it has an activity point price) and a buy button that opens the purchase
 * confirmation for it.
 *
 * `init` reads the membership once: a trial user (no seconds left) sees `trial_warning` under the
 * list and every buy button disabled. Flash's widget does not listen for
 * `CWE_BUILDER_SUBSCRIPTION_UPDATED`, so neither does this; the page shows the state it was
 * built in.
 */
export const CatalogBuilderAddonsWidgetView = ({ page }: CatalogWidgetProps) => {
    const store = useCatalogStoreApi();
    const [ hasSecondsLeft ] = useState(() => hasBuilderSecondsLeft(store));
    const productData = useSystemStore(x => x.productData);
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const t = useTranslation();

    return (
        <>
            <ScrollArea
                orientation="vertical"
                variant="3"
                layout={{ position: 'absolute', left: 0, width: 287, top: 0, bottom: 20 }}
            >
                <Region
                    name="addons_list"
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
                            <Region layout={{ position: 'absolute', left: 9, width: 105, top: 45, height: 24, flexDirection: 'row', gap: 3 }}>
                                <ThemeText
                                    name="item_price"
                                    text={offer.priceInCredits.toString()}
                                    textStyle="u_headline_small"
                                    verticalAlign="top"
                                    layout={{ flexShrink: 0 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('shared/pursearea_credits_icon.png')}
                                    bitmap={{}}
                                    layout={{ width: 15, height: 15, marginTop: 3, flexShrink: 0 }}
                                />
                                {(offer.priceInActivityPoints > 0) && (
                                    <>
                                        <ThemeText
                                            name="diamonds_price"
                                            text={offer.priceInActivityPoints.toString()}
                                            textStyle="u_headline_small"
                                            verticalAlign="top"
                                            layout={{ flexShrink: 0 }}
                                        />
                                        <ThemeImage
                                            name="diamonds_icon"
                                            src={LayoutImage('shared/pursearea_diamond_icon.png')}
                                            bitmap={{}}
                                            layout={{ width: 15, height: 15, marginTop: 3, flexShrink: 0 }}
                                        />
                                    </>
                                )}
                            </Region>
                            <ButtonThick
                                variant="5"
                                name="item_buy"
                                tintColor="#0a9bc5"
                                disabled={!hasSecondsLeft}
                                onPointerTap={() => showPurchaseConfirmation(store, offer, page.pageId)}
                                layout={{ position: 'absolute', left: 123, width: 142, top: 37, height: 35, minWidth: 40 }}
                            >
                                {t('buy')}
                            </ButtonThick>
                        </Border>
                    ))}
                </Region>
            </ScrollArea>
            {!hasSecondsLeft && (
                <ThemeText
                    name="trial_warning"
                    text={t('builder.addon_page.warning.trial')}
                    textStyle="u_bold"
                    textOptions={{ fill: '#cc0000' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, bottom: 3 }}
                />
            )}
        </>
    );
};

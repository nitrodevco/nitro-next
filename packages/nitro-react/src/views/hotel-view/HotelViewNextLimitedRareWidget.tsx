/**
 * `NextLimitedRareCountdownWidget`: `next_ltd_available` - the next limited rare, as the server
 * names it (`LimitedOfferAppearingNextMessage`, asked for by `registerHotelViewHandlers`, which also
 * asks again once the countdown runs out).
 *
 * `refreshContent`: while the rare is on sale (`pageId` 0 or more) the `get` button names it - its
 * product's name - in the countdown's place; while it is still to come the countdown runs down to
 * it; with neither the widget is hidden, as it is until the first answer. Either button opens the
 * catalogue at the rare's page with its offer picked (`onOpenCatalogButton` ->
 * `openCatalogPageById(pageId, offerId, "NORMAL")`).
 */
import { hotelViewColorableBindings, hotelViewColorableFormat, HotelViewCommonSettings, useSystemStore, useWindowActions } from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { Box, CountdownWidget, TemplateWindow } from '#base/theme';

export interface HotelViewNextLimitedRareWidgetProps {
    settings: HotelViewCommonSettings;
}

export const HotelViewNextLimitedRareWidget = ({ settings }: HotelViewNextLimitedRareWidgetProps) => {
    const offer = useSystemStore(x => x.hotelViewNextLimited);
    const product = useSystemStore(x => x.productData[offer?.productClassName ?? '']);
    const now = useSecondsClock();
    const { hideWindow, showWindow } = useWindowActions();
    const onSale = !!offer && (offer.pageId >= 0);
    const coming = !!offer && !onSale && (offer.appearsInSeconds > 0);
    const seconds = offer ? Math.max(0, offer.appearsInSeconds - ((now - offer.receivedAt) / 1000)) : 0;

    const openPage = () => {
        if (!offer) return;

        hideWindow('builders_catalog');
        showWindow('catalog', { pageId: offer.pageId, offerId: offer.offerId });
    };

    return (
        <Box layout={{ flexShrink: 0 }}>
            <TemplateWindow
                id="habbo-friend-bar-com/next_ltd_available_xml"
                bindings={hotelViewColorableBindings(settings, [ 'header' ], {
                    '': { visible: onSale || coming },
                    get: { visible: onSale, caption: product?.name ?? '', onPointerTap: openPage },
                    countdown: {
                        visible: !onSale,
                        children: (
                            <CountdownWidget
                                seconds={seconds}
                                colorableFormat={hotelViewColorableFormat(settings)}
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            />
                        ),
                    },
                    catalogue_button: { onPointerTap: openPage },
                })}
            />
        </Box>
    );
};

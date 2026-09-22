import { maximizeTargetedOffer } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { TargetedOffer, useTargetedOfferStore } from '#base/context/targeted-offers';
import { useTargetedOfferLocalization, useTargetedOfferTimer } from '#base/hooks';
import { Border, Region, ThemeImage, ThemeText } from '#base/theme';
import { getTargetedOfferTimeLeft } from '#base/utils';

/** `TargetedOfferMinimizedView.IMAGE_DEFAULT_URL`. */
const IMAGE_DEFAULT_URL = 'targetedoffers/offer_default_icon.png';

/**
 * Flash's `TargetedOfferMinimizedView` on `targeted_offer_minimized.xml` (192x51): the toolbar
 * extension `OfferController.attachExtension` docks as `targeted_offer` at priority 13, which puts
 * it under the purse and the currency indicators - so it is mounted after `ActivityPointsView` in
 * the extension column, 2 below it (`extension_grid`'s spacing). Rendered only while the minimized
 * view is the one up.
 *
 * A style 9 border in `0x686661` with the offer's `iconImageUrl` (else
 * `targetedoffers/offer_default_icon.png`) from the image library at 6, 6 (40x40), and a list at
 * 0, 6 of `txt_title` (the offer's title, `il_regular_white` bold, wrapped at 138) and, 2 under it,
 * `txt_time_left` (`targeted.offer.minimized.timeleft` with the time in `%timeleft%`, 138x16) - both
 * 50 in. Flash removes a `cnt_time_left` from the list for an offer that never expires, but this
 * layout has none, so the text just stays empty.
 *
 * A press anywhere on it is `maximizeOffer`.
 */
export const TargetedOfferMinimizedView = () => {
    const offer = useTargetedOfferStore(x => x.offer);
    const view = useTargetedOfferStore(x => x.view);

    if (!offer || (view !== 'minimized')) return null;

    return <TargetedOfferMinimizedContent offer={offer} />;
};

const TargetedOfferMinimizedContent = ({ offer }: { offer: TargetedOffer }) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const getLocalization = useTargetedOfferLocalization(offer);
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const secondsRemaining = useTargetedOfferTimer(offer);

    // `OfferView.setTimeLeft`: the template with the time in it, or the time alone when the template is empty.
    const template = getLocalization('targeted.offer.minimized.timeleft');
    const time = (secondsRemaining !== null) ? getTargetedOfferTimeLeft(t, secondsRemaining) : null;
    const timeLeft = (time === null) ? '' : (template.length ? template.replace('%timeleft%', time) : time);

    return (
        <Region
            name="targetedoffers_minimized"
            onPointerTap={() => maximizeTargetedOffer(send, offer)}
            cursor="pointer"
            layout={{ position: 'relative', width: 192, height: 51, marginTop: 2, flexShrink: 0 }}
        >
            <Border
                variant="9"
                tintColor="#686661"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 51 }}
            >
                <Region
                    name="itemlist"
                    layout={{ position: 'absolute', left: 0, top: 6, flexDirection: 'column', gap: 2 }}
                >
                    <ThemeText
                        name="txt_title"
                        text={getLocalization(offer.title)}
                        textStyle="il_regular_white"
                        textOptions={{ wordWrap: true, wordWrapWidth: 134 }}
                        flashFormat={{ bold: true }}
                        verticalAlign="top"
                        layout={{ width: 138, marginLeft: 50, flexShrink: 0, maxWidth: 162 }}
                    />
                    <ThemeText
                        name="txt_time_left"
                        text={timeLeft}
                        textStyle="il_regular_white"
                        flashFormat={{ bold: true }}
                        clip
                        verticalAlign="top"
                        layout={{ height: 16, width: 138, marginLeft: 50, flexShrink: 0 }}
                    />
                </Region>
                <ThemeImage
                    name="bmp_icon"
                    src={`${imageLibraryUrl}${offer.iconImageUrl.length ? offer.iconImageUrl : IMAGE_DEFAULT_URL}`}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 6, width: 40, top: 6, height: 40 }}
                />
            </Border>
        </Region>
    );
};

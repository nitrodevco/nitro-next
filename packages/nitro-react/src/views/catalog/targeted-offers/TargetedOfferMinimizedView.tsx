import { maximizeTargetedOffer } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { TargetedOffer, useTargetedOfferStore } from '#base/context/targeted-offers';
import { useTargetedOfferLocalization, useTargetedOfferTimer } from '#base/hooks';
import { Box, TemplateWindow } from '#base/theme';
import { getTargetedOfferTimeLeft } from '#base/utils';

import { catalogTemplateId } from '../page/catalogTemplates';

/** `TargetedOfferMinimizedView.IMAGE_DEFAULT_URL`. */
const IMAGE_DEFAULT_URL = 'targetedoffers/offer_default_icon.png';

/**
 * Flash's `TargetedOfferMinimizedView` on `targeted_offer_minimized_xml`: the toolbar extension
 * `OfferController.attachExtension` docks as `targeted_offer` at priority 13, which puts it under
 * the purse and the currency indicators - so it is mounted after `ActivityPointsView` in the
 * extension column, 2 below it (`extension_grid`'s spacing). Rendered only while the minimized view
 * is the one up.
 *
 * `txt_title` is the offer's title, `bmp_icon` its `iconImageUrl` (else
 * `targetedoffers/offer_default_icon.png`) from the image library, and `txt_time_left`
 * `targeted.offer.minimized.timeleft` with the time in `%timeleft%` (`OfferView.setTimeLeft`).
 * Flash removes a `cnt_time_left` from the list for an offer that never expires, but this layout
 * has none, so the text just stays empty.
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
        <Box layout={{ position: 'relative', marginTop: 2, flexShrink: 0 }}>
            <TemplateWindow
                id={catalogTemplateId('targeted_offer_minimized_xml')}
                bindings={{
                    '': { onPointerTap: () => maximizeTargetedOffer(send, offer) },
                    txt_title: { caption: getLocalization(offer.title) },
                    txt_time_left: { caption: timeLeft },
                    bmp_icon: { asset: `${imageLibraryUrl}${offer.iconImageUrl.length ? offer.iconImageUrl : IMAGE_DEFAULT_URL}` },
                }}
            />
        </Box>
    );
};

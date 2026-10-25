import { maximizeMallOffer } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { HabboMallOffer, useTargetedOfferStore } from '#base/context/targeted-offers';
import { Box, TemplateWindow } from '#base/theme';

import { catalogTemplateId } from '../page/catalogTemplates';

/** `MallOfferMinimizedView.IMAGE_DEFAULT_URL`. */
const IMAGE_DEFAULT_URL = 'targetedoffers/offer_default_icon.png';

/**
 * Flash's `MallOfferMinimizedView` on `targeted_offer_minimized_xml`, docked as `targeted_offer` at
 * priority 13 like `TargetedOfferMinimizedView` (the same `attachExtension`), so it is mounted in
 * the same place in the extension column. Rendered only while the mall's minimized view is the one up.
 *
 * `txt_title` is the offer's title through the texts, `bmp_icon` always the default icon from the
 * image library; `txt_time_left` is left as the layout has it. A press anywhere on it is
 * `maximizeMallOffer`.
 */
export const MallOfferMinimizedView = () => {
    const mallOffer = useTargetedOfferStore(x => x.mallOffer);
    const view = useTargetedOfferStore(x => x.view);

    if (!mallOffer || (view !== 'mallMinimized')) return null;

    return <MallOfferMinimizedContent offer={mallOffer} />;
};

const MallOfferMinimizedContent = ({ offer }: { offer: HabboMallOffer }) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';

    return (
        <Box layout={{ position: 'relative', marginTop: 2, flexShrink: 0 }}>
            <TemplateWindow
                id={catalogTemplateId('targeted_offer_minimized_xml')}
                bindings={{
                    '': { onPointerTap: () => maximizeMallOffer(send, offer) },
                    txt_title: { caption: t(offer.title, offer.title) },
                    bmp_icon: { asset: `${imageLibraryUrl}${IMAGE_DEFAULT_URL}` },
                }}
            />
        </Box>
    );
};

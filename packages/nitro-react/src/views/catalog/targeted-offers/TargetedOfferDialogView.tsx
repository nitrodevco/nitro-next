import { TargetedOffer } from '#base/context/targeted-offers';
import { useTargetedOfferDialog } from '#base/hooks';
import { Border, Frame, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogCurrencyIcon } from '#base/views/catalog/CatalogCurrencyIcon';

import { TargetedOfferDialogButtonBar } from './TargetedOfferDialogButtonBar';
import { TargetedOfferDialogTimeLeft } from './TargetedOfferDialogTimeLeft';

export interface TargetedOfferDialogViewProps {
    offer: TargetedOffer;
}

/**
 * Flash's `TargetedOfferDialogView` built from `targeted_offer_dialog.xml` (575x430, frame style 3
 * in `0x418db0`, content margins 1, 32, 1, 3), centred. What goes into it is
 * `useTargetedOfferDialog`; this draws the layout:
 *
 * - a yellow (`0xffde5a`) style 3 border at 13, 48 (320x249) with `txt_title`
 *   (`ubuntu_condensed_title` 23, clipped to 301x28) and the `html` `txt_description` (262x195,
 *   wrapped, clipped);
 * - `catalogue_ufo_pricebg` at 236, 188 under the price container at 247, 194: `txt_price_label`
 *   (18, centred), the white 35px credit and activity point amounts with the 22px credit icon and
 *   the `activityPoints_icon` (`getIconStyleFor`, big) beside them, and the bold `+` between;
 * - `bmp_illustration` at 379, 47 (179x283), from the image library;
 * - the button bar at 15, 316 and `cnt_time_left` over the top (`TargetedOfferDialogButtonBar`,
 *   `TargetedOfferDialogTimeLeft`).
 *
 * `setLinkStyle` underlines the description's links with an `a:link` style sheet. The theme's
 * markup keeps an `<a>`'s text but has no style sheet and no link clicks, so a link reads as plain
 * text here.
 */
export const TargetedOfferDialogView = ({ offer }: TargetedOfferDialogViewProps) => {
    const model = useTargetedOfferDialog(offer);

    return (
        <Frame
            id="targeted-offer-dialog"
            variant="3"
            caption={model.title}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 1, 32, 1, 3 ]}
            onClose={model.onClose}
            layout={{ position: 'absolute', width: 575, height: 430 }}
        >
            <Border
                variant="3"
                tintColor="#ffde5a"
                layout={{ position: 'absolute', left: 13, width: 320, top: 48, height: 249 }}
            >
                <ThemeText
                    name="txt_title"
                    text={model.title}
                    textStyle="ubuntu_condensed_title"
                    textOptions={{ fill: '#000001', fontSize: 23 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 301, top: 12, height: 28 }}
                />
                <ThemeText
                    name="txt_description"
                    text={model.description}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 258 }}
                    markup
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 12, width: 262, top: 45, height: 195, maxWidth: 355 }}
                />
            </Border>
            <ThemeImage
                name="pricebg"
                src={LayoutImage('catalog/catalogue_ufo_pricebg.png')}
                bitmap={{}}
                layout={{ position: 'absolute', left: 236, width: 136, top: 188, height: 138 }}
            />
            <Region layout={{ position: 'absolute', left: 247, width: 122, top: 194, height: 134, overflow: 'hidden' }}>
                <ThemeText
                    name="txt_price_label"
                    text={model.priceLabel}
                    textStyle="u_regular"
                    textOptions={{ fontSize: 18, align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 97, top: 10 }}
                />
                <ThemeText
                    name="txt_price_credits"
                    text={model.priceCredits}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', fontSize: 35, align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 12, width: 89, alignSelf: 'center', marginTop: -18.5, marginBottom: 18.5 }}
                />
                <ThemeImage
                    name="credit_icon"
                    src={LayoutImage('shared/pursearea_credits_icon2.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 87, width: 22, top: 43, height: 22 }}
                />
                <ThemeText
                    name="txt_price_activityPoints"
                    text={model.priceActivityPoints}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', fontSize: 35, align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 11, width: 89, alignSelf: 'center', marginTop: 13.5, marginBottom: -13.5 }}
                />
                <CatalogCurrencyIcon
                    type={model.activityPointType}
                    big
                    layout={{ position: 'absolute', left: 88, width: 22, top: 74, height: 22 }}
                />
                <ThemeText
                    name="txt_plus_character"
                    text="+"
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', fontSize: 25, align: 'center' }}
                    flashFormat={{ bold: true }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: -5, width: 41, top: 62 }}
                />
            </Region>
            <ThemeImage
                name="bmp_illustration"
                src={model.illustrationUrl}
                bitmap={{}}
                layout={{ position: 'absolute', left: 379, width: 179, top: 47, height: 283 }}
            />
            <TargetedOfferDialogButtonBar
                model={model}
                left={15}
                top={316}
            />
            {model.timeLeft && (
                <TargetedOfferDialogTimeLeft
                    timeLeft={model.timeLeft}
                    width={579}
                    listCentre={270}
                />
            )}
        </Frame>
    );
};

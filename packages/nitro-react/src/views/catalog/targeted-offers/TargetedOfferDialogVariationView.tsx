import { TargetedOffer } from '#base/context/targeted-offers';
import { useTargetedOfferDialog } from '#base/hooks';
import { Frame, ThemeImage } from '#base/theme';

import { TargetedOfferDialogButtonBar } from './TargetedOfferDialogButtonBar';
import { TargetedOfferDialogTimeLeft } from './TargetedOfferDialogTimeLeft';

export interface TargetedOfferDialogVariationViewProps {
    offer: TargetedOffer;
}

/**
 * Flash's `TargetedOfferDialogView` built from `targeted_offer_dialog_variation.xml` - the layout
 * `OfferController.maximizeOffer` takes when `targeted.offer.override.layout.<id>` names it
 * (640x480, frame style 3 in `0x418db0`, content margins 1, 32, 1, 3), centred. It has no title,
 * description or price elements: the picture (`bmp_illustration`, 638x340 at 0, 35) carries them,
 * and the frame's title is the offer's. Under it the button bar at 55, 366, and `cnt_time_left`
 * over the top (641 wide, its texts centred on 316). The wiring is `useTargetedOfferDialog`, the
 * same as the default layout's.
 */
export const TargetedOfferDialogVariationView = ({ offer }: TargetedOfferDialogVariationViewProps) => {
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
            layout={{ position: 'absolute', width: 640, height: 480 }}
        >
            <ThemeImage
                name="bmp_illustration"
                src={model.illustrationUrl}
                bitmap={{}}
                layout={{ position: 'absolute', left: 0, width: 638, top: 35, height: 340 }}
            />
            <TargetedOfferDialogButtonBar
                model={model}
                left={55}
                top={366}
            />
            {model.timeLeft && (
                <TargetedOfferDialogTimeLeft
                    timeLeft={model.timeLeft}
                    width={641}
                    listCentre={316}
                />
            )}
        </Frame>
    );
};

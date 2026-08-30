import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1562_targeted_offer_habbomall_xml` (layout "targeted_offer_habbomall", 268x362) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TargetedOfferHabbomallLayoutProps {
    captionTxtDescription?: string;
    captionTxtTitle?: string;
    layout?: BoxLayout;
    onBtnBuy?: () => void;
    onClose?: () => void;
    srcBmpIllustration?: string;
}

export const TargetedOfferHabbomallLayout = ({ captionTxtDescription, captionTxtTitle, layout, onBtnBuy, onClose, srcBmpIllustration }: TargetedOfferHabbomallLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 268, height: 362, minWidth: 268, minHeight: 362, ...layout }}
        >
            <ThemeImage
                name="bmp_illustration"
                src={srcBmpIllustration}
                layout={{ position: 'absolute', left: 10, width: 240, top: 6, height: 140 }}
            />
            <Border
                variant="3"
                tintColor="#ffde5a"
                layout={{ position: 'absolute', left: 10, right: 6, top: 153, height: 122 }}
            >
                <ThemeText
                    text={captionTxtTitle ?? ''}
                    name="txt_title"
                    layout={{ position: 'absolute', left: 8, right: 7, top: 8, height: 32 }}
                />
                <ThemeText
                    text={captionTxtDescription ?? t('targeted.offer.habbomall.notification')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 224 }}
                    name="txt_description"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 8, right: 8, bottom: 7, height: 75 }}
                />
            </Border>
            <ButtonThick
                variant="6"
                name="btn_buy"
                tintColor="#4faf4f"
                onPointerTap={onBtnBuy}
                layout={{ position: 'absolute', right: 6, width: 197, bottom: 7, height: 30 }}
            >
                {t('targeted.offer.open.habbomall')}
            </ButtonThick>
        </Frame>
    );
};

import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `caption_txt` of VipDiscountPromotionV2Layout - pass real rows through its `items…` slot. */
export interface VipDiscountPromotionV2LayoutCaptionTxtItemProps {
    captionCaptionTxt?: string;
    layout?: BoxLayout;
}

export const VipDiscountPromotionV2LayoutCaptionTxtItem = ({ captionCaptionTxt, layout }: VipDiscountPromotionV2LayoutCaptionTxtItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionCaptionTxt ?? t('citizen.vip.extend.promo.caption')}
            textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            name="caption_txt"
            verticalAlign="top"
            layout={{ width: 170, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

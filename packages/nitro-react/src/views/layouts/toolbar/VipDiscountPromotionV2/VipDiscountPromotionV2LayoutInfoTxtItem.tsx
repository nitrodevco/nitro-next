import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `info_txt` of VipDiscountPromotionV2Layout - pass real rows through its `items…` slot. */
export interface VipDiscountPromotionV2LayoutInfoTxtItemProps {
    captionInfoTxt?: string;
    layout?: BoxLayout;
}

export const VipDiscountPromotionV2LayoutInfoTxtItem = ({ captionInfoTxt, layout }: VipDiscountPromotionV2LayoutInfoTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info_txt"
            layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionInfoTxt ?? t('citizen.vip.extend.promo.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

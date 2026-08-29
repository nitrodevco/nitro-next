import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `caption_txt` of VipQuestsPromoLayout - pass real rows through its `items…` slot. */
export interface VipQuestsPromoLayoutCaptionTxtItemProps {
    captionCaptionTxt?: string;
    layout?: BoxLayout;
}

export const VipQuestsPromoLayoutCaptionTxtItem = ({ captionCaptionTxt, layout }: VipQuestsPromoLayoutCaptionTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="caption_txt"
            layout={{ width: 170, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCaptionTxt ?? t('citizenship.vip.quests.caption')}
                textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `caption_txt` of VipQuestsPromoLayout - pass real rows through its `items…` slot. */
export interface VipQuestsPromoLayoutCaptionTxtItemProps {
    captionCaptionTxt?: string;
    layout?: BoxLayout;
}

export const VipQuestsPromoLayoutCaptionTxtItem = ({ captionCaptionTxt, layout }: VipQuestsPromoLayoutCaptionTxtItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionCaptionTxt ?? t('citizenship.vip.quests.caption')}
            textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            name="caption_txt"
            verticalAlign="top"
            layout={{ width: 170, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

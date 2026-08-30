import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `info_txt` of VipQuestsPromoLayout - pass real rows through its `items…` slot. */
export interface VipQuestsPromoLayoutInfoTxtItemProps {
    captionInfoTxt?: string;
    layout?: BoxLayout;
}

export const VipQuestsPromoLayoutInfoTxtItem = ({ captionInfoTxt, layout }: VipQuestsPromoLayoutInfoTxtItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionInfoTxt ?? t('citizenship.vip.quests.info')}
            textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            name="info_txt"
            verticalAlign="top"
            layout={{ width: 170, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

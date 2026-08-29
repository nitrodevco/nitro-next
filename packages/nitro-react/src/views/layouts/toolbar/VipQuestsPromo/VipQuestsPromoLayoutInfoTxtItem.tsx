import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `info_txt` of VipQuestsPromoLayout - pass real rows through its `items…` slot. */
export interface VipQuestsPromoLayoutInfoTxtItemProps {
    captionInfoTxt?: string;
    layout?: BoxLayout;
}

export const VipQuestsPromoLayoutInfoTxtItem = ({ captionInfoTxt, layout }: VipQuestsPromoLayoutInfoTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info_txt"
            layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionInfoTxt ?? t('citizenship.vip.quests.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

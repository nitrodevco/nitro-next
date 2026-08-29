import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `handitem_txt` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutHanditemTxtItemProps {
    captionHanditemTxt?: string;
    layout?: BoxLayout;
}

export const BotViewLayoutHanditemTxtItem = ({ captionHanditemTxt, layout }: BotViewLayoutHanditemTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="handitem_txt"
            layout={{ width: 170, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHanditemTxt ?? t('infostand.text.handitem')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `handitem_text` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutHanditemTextItemProps {
    captionHanditemText?: string;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutHanditemTextItem = ({ captionHanditemText, layout }: RentableBotViewLayoutHanditemTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="handitem_text"
            layout={{ width: 170, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHanditemText ?? t('infostand.text.handitem')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

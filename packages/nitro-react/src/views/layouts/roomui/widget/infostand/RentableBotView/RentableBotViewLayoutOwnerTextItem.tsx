import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `owner_text` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutOwnerTextItemProps {
    captionOwnerText?: string;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutOwnerTextItem = ({ captionOwnerText, layout }: RentableBotViewLayoutOwnerTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionOwnerText ?? t('infostand.text.botowner')}
            textOptions={{ fill: '#ffffff' }}
            name="owner_text"
            layout={{ width: 126, height: 13, flexShrink: 0, ...layout }}
        />
    );
};

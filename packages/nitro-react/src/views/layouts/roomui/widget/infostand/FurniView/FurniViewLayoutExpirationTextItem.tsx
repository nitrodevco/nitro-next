import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `expiration_text` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutExpirationTextItemProps {
    captionExpirationText?: string;
    layout?: BoxLayout;
}

export const FurniViewLayoutExpirationTextItem = ({ captionExpirationText, layout }: FurniViewLayoutExpirationTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionExpirationText ?? t('infostand.rent.expiration')}
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            name="expiration_text"
            verticalAlign="top"
            layout={{ width: 170, height: 23, flexShrink: 0, ...layout }}
        />
    );
};

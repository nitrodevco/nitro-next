import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `expiration_text` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutExpirationTextItemProps {
    captionExpirationText?: string;
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutExpirationTextItem = ({ captionExpirationText, layout }: CrackableFurniViewLayoutExpirationTextItemProps) => {
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

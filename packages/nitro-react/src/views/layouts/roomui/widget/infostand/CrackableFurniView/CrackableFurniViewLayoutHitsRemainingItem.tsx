import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `hits_remaining` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutHitsRemainingItemProps {
    captionHitsRemaining?: string;
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutHitsRemainingItem = ({ captionHitsRemaining, layout }: CrackableFurniViewLayoutHitsRemainingItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionHitsRemaining ?? t('infostand.crackable_furni.hits_remaining')}
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            name="hits_remaining"
            verticalAlign="top"
            layout={{ width: 170, height: 14, flexShrink: 0, ...layout }}
        />
    );
};

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `hits_remaining` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutHitsRemainingItemProps {
    captionHitsRemaining?: string;
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutHitsRemainingItem = ({ captionHitsRemaining, layout }: CrackableFurniViewLayoutHitsRemainingItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hits_remaining"
            layout={{ width: 170, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHitsRemaining ?? t('infostand.crackable_furni.hits_remaining')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

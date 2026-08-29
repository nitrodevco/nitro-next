import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `age_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutAgeTextItemProps {
    captionAgeText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutAgeTextItem = ({ captionAgeText, layout }: PetViewLayoutAgeTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="age_text"
            layout={{ width: 42, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionAgeText ?? t('pet.age')}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

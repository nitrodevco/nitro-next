import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `status_rarity_level` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusRarityLevelItem2Props {
    captionStatusRarityLevel?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutStatusRarityLevelItem2 = ({ captionStatusRarityLevel, layout }: PetViewLayoutStatusRarityLevelItem2Props) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionStatusRarityLevel ?? t('infostand.pet.text.raritylevel')}
            textOptions={{ fill: '#ffffff' }}
            name="status_rarity_level"
            layout={{ width: 151, height: 15, flexShrink: 0, minHeight: 15, ...layout }}
        />
    );
};

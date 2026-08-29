import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `status_rarity_level` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusRarityLevelItemProps {
    captionStatusRarityLevel?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutStatusRarityLevelItem = ({ captionStatusRarityLevel, layout }: PetViewLayoutStatusRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_rarity_level"
            layout={{ width: 151, height: 18, flexShrink: 0, minHeight: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionStatusRarityLevel ?? t('infostand.pet.text.raritylevel')}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

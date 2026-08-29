import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `plant_rarity_level` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutPlantRarityLevelItemProps {
    captionPlantRarityLevel?: string;
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutPlantRarityLevelItem = ({ captionPlantRarityLevel, layout }: UseProductControllerFertilizeMonsterplantLayoutPlantRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_rarity_level"
            layout={{ width: 134, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantRarityLevel ?? t('useproduct.widget.monsterplant.plant.raritylevel')}
                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            />
        </Region>
    );
};

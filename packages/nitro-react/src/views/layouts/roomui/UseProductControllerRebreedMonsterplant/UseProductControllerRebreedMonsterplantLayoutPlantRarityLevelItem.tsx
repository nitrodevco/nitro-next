import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plant_rarity_level` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutPlantRarityLevelItemProps {
    captionPlantRarityLevel?: string;
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayoutPlantRarityLevelItem = ({ captionPlantRarityLevel, layout }: UseProductControllerRebreedMonsterplantLayoutPlantRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPlantRarityLevel ?? t('useproduct.widget.monsterplant.plant.raritylevel')}
            textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            name="plant_rarity_level"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 17, flexShrink: 0, ...layout }}
        />
    );
};

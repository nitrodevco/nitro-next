import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `plant_description` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutPlantDescriptionItemProps {
    captionPlantDescription?: string;
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutPlantDescriptionItem = ({ captionPlantDescription, layout }: UseProductControllerFertilizeMonsterplantLayoutPlantDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_description"
            layout={{ width: 122, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantDescription ?? t('useproduct.widget.monsterplant.plant.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};

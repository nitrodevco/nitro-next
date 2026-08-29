import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `plant_name` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPlantNameItemProps {
    captionPlantName?: string;
    layout?: BoxLayout;
}

export const UseProductControllerReviveMonsterplantLayoutPlantNameItem = ({ captionPlantName, layout }: UseProductControllerReviveMonsterplantLayoutPlantNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_name"
            layout={{ alignSelf: 'stretch', height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantName ?? t('useproduct.widget.monsterplant.plant.name')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

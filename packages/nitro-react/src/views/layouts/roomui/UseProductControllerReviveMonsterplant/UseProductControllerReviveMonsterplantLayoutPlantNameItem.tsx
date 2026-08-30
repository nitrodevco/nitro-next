import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plant_name` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPlantNameItemProps {
    captionPlantName?: string;
    layout?: BoxLayout;
}

export const UseProductControllerReviveMonsterplantLayoutPlantNameItem = ({ captionPlantName, layout }: UseProductControllerReviveMonsterplantLayoutPlantNameItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPlantName ?? t('useproduct.widget.monsterplant.plant.name')}
            textOptions={{ align: 'center' }}
            name="plant_name"
            layout={{ alignSelf: 'stretch', height: 17, flexShrink: 0, ...layout }}
        />
    );
};

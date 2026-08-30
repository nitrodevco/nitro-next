import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plant_description` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPlantDescriptionItemProps {
    captionPlantDescription?: string;
    layout?: BoxLayout;
}

export const UseProductControllerReviveMonsterplantLayoutPlantDescriptionItem = ({ captionPlantDescription, layout }: UseProductControllerReviveMonsterplantLayoutPlantDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPlantDescription ?? t('useproduct.widget.monsterplant.plant.description')}
            textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            name="plant_description"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 17, flexShrink: 0, ...layout }}
        />
    );
};

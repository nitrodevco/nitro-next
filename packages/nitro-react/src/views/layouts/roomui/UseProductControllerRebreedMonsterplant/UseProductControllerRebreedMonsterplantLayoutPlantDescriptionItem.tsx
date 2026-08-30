import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plant_description` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutPlantDescriptionItemProps {
    captionPlantDescription?: string;
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayoutPlantDescriptionItem = ({ captionPlantDescription, layout }: UseProductControllerRebreedMonsterplantLayoutPlantDescriptionItemProps) => {
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

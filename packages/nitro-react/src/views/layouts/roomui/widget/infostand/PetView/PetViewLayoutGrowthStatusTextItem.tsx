import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `growth_status_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutGrowthStatusTextItemProps {
    captionGrowthStatusText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutGrowthStatusTextItem = ({ captionGrowthStatusText, layout }: PetViewLayoutGrowthStatusTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionGrowthStatusText ?? t('infostand.pet.text.growth')}
            textOptions={{ fill: '#ffffff' }}
            name="growth_status_text"
            layout={{ width: 136, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

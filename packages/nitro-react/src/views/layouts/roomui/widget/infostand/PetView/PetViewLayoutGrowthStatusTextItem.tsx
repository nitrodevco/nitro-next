import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `growth_status_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutGrowthStatusTextItemProps {
    captionGrowthStatusText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutGrowthStatusTextItem = ({ captionGrowthStatusText, layout }: PetViewLayoutGrowthStatusTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="growth_status_text"
            layout={{ width: 136, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGrowthStatusText ?? t('infostand.pet.text.growth')}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

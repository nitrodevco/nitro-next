import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `owner_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutOwnerTextItemProps {
    captionOwnerText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutOwnerTextItem = ({ captionOwnerText, layout }: PetViewLayoutOwnerTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="owner_text"
            layout={{ width: 128, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionOwnerText ?? t('infostand.text.petowner')}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

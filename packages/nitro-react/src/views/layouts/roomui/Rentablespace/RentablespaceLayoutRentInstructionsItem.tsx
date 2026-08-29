import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `rent_instructions` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutRentInstructionsItemProps {
    captionRentInstructions?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutRentInstructionsItem = ({ captionRentInstructions, layout }: RentablespaceLayoutRentInstructionsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rent_instructions"
            layout={{ width: 241, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRentInstructions ?? t('rentablespace.widget.instructions')}
                textOptions={{ wordWrap: true, wordWrapWidth: 241 }}
            />
        </Region>
    );
};

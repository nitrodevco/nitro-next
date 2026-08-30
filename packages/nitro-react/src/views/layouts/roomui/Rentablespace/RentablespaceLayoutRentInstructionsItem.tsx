import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `rent_instructions` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutRentInstructionsItemProps {
    captionRentInstructions?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutRentInstructionsItem = ({ captionRentInstructions, layout }: RentablespaceLayoutRentInstructionsItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRentInstructions ?? t('rentablespace.widget.instructions')}
            textOptions={{ wordWrap: true, wordWrapWidth: 241 }}
            name="rent_instructions"
            verticalAlign="top"
            layout={{ width: 241, flexShrink: 0, ...layout }}
        />
    );
};

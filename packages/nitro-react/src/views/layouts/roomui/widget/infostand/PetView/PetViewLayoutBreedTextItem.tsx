import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `breed_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutBreedTextItemProps {
    captionBreedText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutBreedTextItem = ({ captionBreedText, layout }: PetViewLayoutBreedTextItemProps) => {
    return (
        <ThemeText
            text={captionBreedText ?? ''}
            textOptions={{ fill: '#ffffff' }}
            name="breed_text"
            layout={{ width: 4, height: 4, flexShrink: 0, ...layout }}
        />
    );
};

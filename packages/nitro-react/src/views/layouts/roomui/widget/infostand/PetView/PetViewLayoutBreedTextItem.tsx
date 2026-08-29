import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `breed_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutBreedTextItemProps {
    captionBreedText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutBreedTextItem = ({ captionBreedText, layout }: PetViewLayoutBreedTextItemProps) => {
    return (
        <Region
            name="breed_text"
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionBreedText ?? ''}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

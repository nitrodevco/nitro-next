import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `description` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutDescriptionItemProps {
    captionDescription?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutDescriptionItem = ({ captionDescription, layout }: BreedPetsResultLayoutDescriptionItemProps) => {
    return (
        <Region
            name="description"
            layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDescription ?? '${breedpetsresult.widget.text '}
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            />
        </Region>
    );
};

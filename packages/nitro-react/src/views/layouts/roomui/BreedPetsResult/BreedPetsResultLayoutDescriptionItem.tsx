import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `description` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutDescriptionItemProps {
    captionDescription?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutDescriptionItem = ({ captionDescription, layout }: BreedPetsResultLayoutDescriptionItemProps) => {
    return (
        <ThemeText
            text={captionDescription ?? '${breedpetsresult.widget.text '}
            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            name="description"
            verticalAlign="top"
            layout={{ width: 254, height: 18, flexShrink: 0, ...layout }}
        />
    );
};

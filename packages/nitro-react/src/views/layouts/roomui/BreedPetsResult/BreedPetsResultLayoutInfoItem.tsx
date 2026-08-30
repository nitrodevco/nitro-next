import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `info` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutInfoItemProps {
    captionInfo?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutInfoItem = ({ captionInfo, layout }: BreedPetsResultLayoutInfoItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionInfo ?? t('breedpetsresult.widget.info')}
            textStyle="text-style-u-italic"
            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            name="info"
            verticalAlign="top"
            layout={{ width: 254, height: 18, flexShrink: 0, ...layout }}
        />
    );
};

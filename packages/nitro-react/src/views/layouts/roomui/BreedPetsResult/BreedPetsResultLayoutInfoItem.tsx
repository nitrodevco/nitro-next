import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `info` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutInfoItemProps {
    captionInfo?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutInfoItem = ({ captionInfo, layout }: BreedPetsResultLayoutInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info"
            layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionInfo ?? t('breedpetsresult.widget.info')}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            />
        </Region>
    );
};

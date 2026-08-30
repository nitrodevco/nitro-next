import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `info` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutInfoItemProps {
    captionInfo?: string;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutInfoItem = ({ captionInfo, layout }: BreedPetsConfirmationLayoutInfoItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionInfo ?? t('breedpets.widget.info')}
            textStyle="text-style-u-italic"
            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            name="info"
            verticalAlign="top"
            layout={{ width: 254, height: 18, flexShrink: 0, ...layout }}
        />
    );
};

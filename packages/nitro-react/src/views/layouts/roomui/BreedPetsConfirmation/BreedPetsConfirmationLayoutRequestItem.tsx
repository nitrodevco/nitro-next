import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `request` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutRequestItemProps {
    captionRequest?: string;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutRequestItem = ({ captionRequest, layout }: BreedPetsConfirmationLayoutRequestItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRequest ?? t('breedpets.widget.request')}
            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            name="request"
            verticalAlign="top"
            layout={{ width: 254, height: 18, flexShrink: 0, ...layout }}
        />
    );
};

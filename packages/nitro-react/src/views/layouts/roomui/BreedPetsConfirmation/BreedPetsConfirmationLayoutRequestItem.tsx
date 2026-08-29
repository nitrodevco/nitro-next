import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `request` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutRequestItemProps {
    captionRequest?: string;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutRequestItem = ({ captionRequest, layout }: BreedPetsConfirmationLayoutRequestItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request"
            layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRequest ?? t('breedpets.widget.request')}
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            />
        </Region>
    );
};

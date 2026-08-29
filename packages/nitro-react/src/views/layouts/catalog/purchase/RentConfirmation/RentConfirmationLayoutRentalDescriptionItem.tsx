import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `rental_description` of RentConfirmationLayout - pass real rows through its `items…` slot. */
export interface RentConfirmationLayoutRentalDescriptionItemProps {
    captionRentalDescription?: string;
    layout?: BoxLayout;
}

export const RentConfirmationLayoutRentalDescriptionItem = ({ captionRentalDescription, layout }: RentConfirmationLayoutRentalDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rental_description"
            layout={{ width: 150, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRentalDescription ?? t('rent.confirmation.rental.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
            />
        </Region>
    );
};

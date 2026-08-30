import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `rental_description` of RentConfirmationLayout - pass real rows through its `items…` slot. */
export interface RentConfirmationLayoutRentalDescriptionItemProps {
    captionRentalDescription?: string;
    layout?: BoxLayout;
}

export const RentConfirmationLayoutRentalDescriptionItem = ({ captionRentalDescription, layout }: RentConfirmationLayoutRentalDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRentalDescription ?? t('rent.confirmation.rental.description')}
            textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
            name="rental_description"
            verticalAlign="top"
            layout={{ width: 150, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

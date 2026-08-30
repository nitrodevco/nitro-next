import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `offer_expiration` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutOfferExpirationItemProps {
    captionOfferExpiration?: string;
    layout?: BoxLayout;
}

export const ClubExtendConfirmationLayoutOfferExpirationItem = ({ captionOfferExpiration, layout }: ClubExtendConfirmationLayoutOfferExpirationItemProps) => {
    return (
        <ThemeText
            text={captionOfferExpiration ?? ''}
            textStyle="text-style-u-bold"
            textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 244 }}
            name="offer_expiration"
            verticalAlign="top"
            layout={{ width: 244, height: 9, flexShrink: 0, ...layout }}
        />
    );
};

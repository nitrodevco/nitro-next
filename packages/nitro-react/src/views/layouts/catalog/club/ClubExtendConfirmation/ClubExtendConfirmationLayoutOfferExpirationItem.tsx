import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `offer_expiration` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutOfferExpirationItemProps {
    captionOfferExpiration?: string;
    layout?: BoxLayout;
}

export const ClubExtendConfirmationLayoutOfferExpirationItem = ({ captionOfferExpiration, layout }: ClubExtendConfirmationLayoutOfferExpirationItemProps) => {
    return (
        <Region
            name="offer_expiration"
            layout={{ width: 244, height: 9, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionOfferExpiration ?? ''}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 244 }}
            />
        </Region>
    );
};

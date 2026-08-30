import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `cant_rent_error` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutCantRentErrorItemProps {
    captionCantRentError?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutCantRentErrorItem = ({ captionCantRentError, layout }: RentablespaceLayoutCantRentErrorItemProps) => {
    return (
        <ThemeText
            text={captionCantRentError ?? 'Only HabboClub members can rent spaces.'}
            textStyle="text-style-u-bold"
            textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 245 }}
            name="cant_rent_error"
            verticalAlign="top"
            layout={{ width: 245, height: 40, flexShrink: 0, ...layout }}
        />
    );
};

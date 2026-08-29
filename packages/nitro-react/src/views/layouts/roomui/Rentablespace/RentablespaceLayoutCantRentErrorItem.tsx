import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `cant_rent_error` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutCantRentErrorItemProps {
    captionCantRentError?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutCantRentErrorItem = ({ captionCantRentError, layout }: RentablespaceLayoutCantRentErrorItemProps) => {
    return (
        <Region
            name="cant_rent_error"
            layout={{ width: 245, height: 40, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCantRentError ?? 'Only HabboClub members can rent spaces.'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 245 }}
            />
        </Region>
    );
};

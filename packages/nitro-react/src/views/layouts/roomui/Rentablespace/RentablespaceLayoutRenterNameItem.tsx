import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `renter_name` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutRenterNameItemProps {
    captionRenterName?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutRenterNameItem = ({ captionRenterName, layout }: RentablespaceLayoutRenterNameItemProps) => {
    return (
        <Region
            name="renter_name"
            layout={{ width: 37, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRenterName ?? 'User'}
                textStyle="text-style-u-italic"
            />
        </Region>
    );
};

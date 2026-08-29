import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `right_padding` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutRightPaddingItemProps {
    border?: ReactNode;
    layout?: BoxLayout;
    marginItemColorRight?: ReactNode;
    visibleBorder?: boolean;
    visibleMarginItemColorRight?: boolean;
    visibleRightPaddingBorder?: boolean;
}

export const WiredStyleVolterBlueLayoutRightPaddingItem = ({ border, layout, marginItemColorRight, visibleBorder, visibleMarginItemColorRight, visibleRightPaddingBorder }: WiredStyleVolterBlueLayoutRightPaddingItemProps) => {
    return (
        <Region
            name="right_padding"
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            {(visibleBorder ?? true) && (
                <Region
                    name="border"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
                >
                    {(visibleMarginItemColorRight ?? true) && (
                        <Region
                            name="margin_item_color_right"
                            backgroundColor="#ffeda5"
                            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                        >
                            {marginItemColorRight}
                        </Region>
                    )}
                </Region>
            )}
            {(visibleRightPaddingBorder ?? true) && (
                <Region
                    name="border"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
                >
                    {border}
                </Region>
            )}
        </Region>
    );
};

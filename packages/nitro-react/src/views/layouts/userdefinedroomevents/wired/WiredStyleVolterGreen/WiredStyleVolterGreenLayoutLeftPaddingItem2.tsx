import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `left_padding` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutLeftPaddingItem2Props {
    border?: ReactNode;
    layout?: BoxLayout;
    marginItemColorLeft?: ReactNode;
    visibleBorder?: boolean;
    visibleLeftPaddingBorder?: boolean;
    visibleMarginItemColorLeft?: boolean;
}

export const WiredStyleVolterGreenLayoutLeftPaddingItem2 = ({ border, layout, marginItemColorLeft, visibleBorder, visibleLeftPaddingBorder, visibleMarginItemColorLeft }: WiredStyleVolterGreenLayoutLeftPaddingItem2Props) => {
    return (
        <Region
            name="left_padding"
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            {(visibleBorder ?? true) && (
                <Region
                    name="border"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
                >
                    {border}
                </Region>
            )}
            {(visibleLeftPaddingBorder ?? true) && (
                <Region
                    name="border"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
                >
                    {(visibleMarginItemColorLeft ?? true) && (
                        <Region
                            name="margin_item_color_left"
                            backgroundColor="#ffeda5"
                            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                        >
                            {marginItemColorLeft}
                        </Region>
                    )}
                </Region>
            )}
        </Region>
    );
};

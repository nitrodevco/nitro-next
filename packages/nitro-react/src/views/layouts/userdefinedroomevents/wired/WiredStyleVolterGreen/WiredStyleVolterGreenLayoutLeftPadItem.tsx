import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `left_pad` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutLeftPadItemProps {
    layout?: BoxLayout;
    leftPad?: ReactNode;
}

export const WiredStyleVolterGreenLayoutLeftPadItem = ({ layout, leftPad }: WiredStyleVolterGreenLayoutLeftPadItemProps) => {
    return (
        <Region
            name="left_pad"
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        >
            {leftPad}
        </Region>
    );
};

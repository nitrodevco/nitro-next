import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `right_pad` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutRightPadItemProps {
    layout?: BoxLayout;
    rightPad?: ReactNode;
}

export const WiredStyleVolterLayoutRightPadItem = ({ layout, rightPad }: WiredStyleVolterLayoutRightPadItemProps) => {
    return (
        <Region
            name="right_pad"
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        >
            {rightPad}
        </Region>
    );
};

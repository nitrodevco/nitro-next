import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `end_padding` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutEndPaddingItemProps {
    endPadding?: ReactNode;
    layout?: BoxLayout;
}

export const TalentTrackLayoutEndPaddingItem = ({ endPadding, layout }: TalentTrackLayoutEndPaddingItemProps) => {
    return (
        <Region
            name="end_padding"
            layout={{ width: 100, height: 280, flexShrink: 0, ...layout }}
        >
            {endPadding}
        </Region>
    );
};

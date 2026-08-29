import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `chest_contents` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutChestContentsItemProps {
    chestContents?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutChestContentsItem = ({ chestContents, layout }: ChestGenericLayoutChestContentsItemProps) => {
    return (
        <Region
            name="chest_contents"
            layout={{ width: 458, height: 254, flexShrink: 0, ...layout }}
        >
            {chestContents}
        </Region>
    );
};

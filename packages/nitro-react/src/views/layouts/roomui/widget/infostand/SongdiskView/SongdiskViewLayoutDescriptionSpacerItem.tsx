import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `description_spacer` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutDescriptionSpacerItemProps {
    descriptionSpacer?: ReactNode;
    layout?: BoxLayout;
}

export const SongdiskViewLayoutDescriptionSpacerItem = ({ descriptionSpacer, layout }: SongdiskViewLayoutDescriptionSpacerItemProps) => {
    return (
        <Region
            name="description_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        >
            {descriptionSpacer}
        </Region>
    );
};

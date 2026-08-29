import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `description_spacer` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutDescriptionSpacerItemProps {
    descriptionSpacer?: ReactNode;
    layout?: BoxLayout;
}

export const JukeboxViewLayoutDescriptionSpacerItem = ({ descriptionSpacer, layout }: JukeboxViewLayoutDescriptionSpacerItemProps) => {
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

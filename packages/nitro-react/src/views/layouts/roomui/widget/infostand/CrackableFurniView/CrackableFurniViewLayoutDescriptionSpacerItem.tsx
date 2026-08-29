import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `description_spacer` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutDescriptionSpacerItemProps {
    descriptionSpacer?: ReactNode;
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutDescriptionSpacerItem = ({ descriptionSpacer, layout }: CrackableFurniViewLayoutDescriptionSpacerItemProps) => {
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

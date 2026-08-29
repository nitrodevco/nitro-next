import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `furni_details_spacer` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutFurniDetailsSpacerItemProps {
    furniDetailsSpacer?: ReactNode;
    layout?: BoxLayout;
}

export const FurniViewLayoutFurniDetailsSpacerItem = ({ furniDetailsSpacer, layout }: FurniViewLayoutFurniDetailsSpacerItemProps) => {
    return (
        <Region
            name="furni_details_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        >
            {furniDetailsSpacer}
        </Region>
    );
};

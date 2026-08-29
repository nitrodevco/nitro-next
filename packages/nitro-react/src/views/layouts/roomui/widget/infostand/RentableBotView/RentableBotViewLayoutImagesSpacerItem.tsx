import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `images_spacer` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutImagesSpacerItemProps {
    imagesSpacer?: ReactNode;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutImagesSpacerItem = ({ imagesSpacer, layout }: RentableBotViewLayoutImagesSpacerItemProps) => {
    return (
        <Region
            name="images_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        >
            {imagesSpacer}
        </Region>
    );
};

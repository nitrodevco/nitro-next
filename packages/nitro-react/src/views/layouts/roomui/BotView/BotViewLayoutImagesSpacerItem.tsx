import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `images_spacer` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutImagesSpacerItemProps {
    imagesSpacer?: ReactNode;
    layout?: BoxLayout;
}

export const BotViewLayoutImagesSpacerItem = ({ imagesSpacer, layout }: BotViewLayoutImagesSpacerItemProps) => {
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

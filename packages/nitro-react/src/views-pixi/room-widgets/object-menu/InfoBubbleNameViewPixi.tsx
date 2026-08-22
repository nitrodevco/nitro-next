import type { IRoomObjectNameData } from '@nitrodevco/nitro-api';

import { Bubble, Text } from '#base/theme-pixi';

export interface InfoBubbleNameViewPixiProps {
    nameData: IRoomObjectNameData;
}

/** Pixi port of views/room-widgets/object-menu/InfoBubbleNameView.tsx. */
export const InfoBubbleNameViewPixi = ({ nameData }: InfoBubbleNameViewPixiProps) => {
    if (!nameData) return null;

    return (
        <Bubble variant="0" tintColor="#3d3d3d" layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, paddingTop: 6, paddingBottom: 6 }}>
            <Text text={nameData.name} textStyle="text-style-u-regular" textOptions={{ fontSize: 11, fill: '#ffffff' }} />
        </Bubble>
    );
};

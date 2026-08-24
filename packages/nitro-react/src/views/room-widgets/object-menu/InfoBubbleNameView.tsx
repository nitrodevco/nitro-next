import { IRoomObjectNameData } from '@nitrodevco/nitro-api';

import { Bubble, ThemeText } from '#base/theme';

export interface InfoBubbleNameViewProps {
    nameData: IRoomObjectNameData;
}

/** Pixi port of views/room-widgets/object-menu/InfoBubbleNameView.tsx. */
export const InfoBubbleNameView = ({ nameData }: InfoBubbleNameViewProps) => {
    if (!nameData) return null;

    return (
        <Bubble
            variant="0"
            tintColor="#3d3d3d"
            layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, paddingTop: 6, paddingBottom: 6 }}
        >
            <ThemeText
                text={nameData.name}
                textStyle="text-style-u-regular"
                textOptions={{ fontSize: 11, fill: '#ffffff' }}
            />
        </Bubble>
    );
};

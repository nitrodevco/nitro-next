import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { IlluminaChatBubbleLayoutBubbleWrapper, IlluminaChatBubbleLayoutBubbleWrapperProps } from './IlluminaChatBubbleLayoutBubbleWrapper';

/** Generated from `2026_illumina_chat_bubble_xml` (layout "chat_bubble", 259x80) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaChatBubbleLayoutProps {
    bubbleWrapper?: IlluminaChatBubbleLayoutBubbleWrapperProps;
    layout?: BoxLayout;
    srcArrowPoint?: string;
    userAvatar?: ReactNode;
}

export const IlluminaChatBubbleLayout = ({ bubbleWrapper, layout, srcArrowPoint, userAvatar }: IlluminaChatBubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 259, height: 80, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Region layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 56 }}>
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="user_avatar"
                        layout={{ position: 'absolute', left: -19, width: 90, top: -21, height: 130 }}
                    >
                        {userAvatar}
                    </WidgetSlot>
                </Region>
                <ThemeImage
                    name="arrow_point"
                    src={srcArrowPoint ?? layoutImage('illumina_light_bubble_chat_arrow.png')}
                    layout={{ position: 'absolute', left: 47, width: 5, top: 39, height: 10 }}
                />
                <IlluminaChatBubbleLayoutBubbleWrapper {...bubbleWrapper} />
            </Region>
        </Region>
    );
};

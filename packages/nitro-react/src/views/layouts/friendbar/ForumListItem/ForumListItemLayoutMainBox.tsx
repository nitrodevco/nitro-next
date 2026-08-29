import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Named region `main_box` of ForumListItemLayout - configured through the parent's `mainBox` prop. */
export interface ForumListItemLayoutMainBoxProps {
    captionDetails?: string;
    captionHeader?: string;
    captionMessages1?: string;
    captionMessages2?: string;
    groupIcon?: ReactNode;
    layout?: BoxLayout;
    onHeaderRegion?: () => void;
    onUnreadRegion?: () => void;
    unreadRegion?: ReactNode;
}

export const ForumListItemLayoutMainBox = ({ captionDetails, captionHeader, captionMessages1, captionMessages2, groupIcon, layout, onHeaderRegion, onUnreadRegion, unreadRegion }: ForumListItemLayoutMainBoxProps) => {
    return (
        <Region
            name="main_box"
            backgroundColor="#eefeff"
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 41, ...layout }}
        >
            <Region
                name="left_button_container"
                layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 41 }}
            >
                <WidgetSlot
                    widgetType="badge_image"
                    name="group_icon"
                    options={{ 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 1, width: 39, top: 1, height: 39 }}
                >
                    {groupIcon}
                </WidgetSlot>
            </Region>
            <Region
                name="texts_container"
                layout={{ position: 'absolute', left: 42, width: 357, top: 0, height: 40 }}
            >
                <Region
                    name="header_region"
                    onPointerTap={onHeaderRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 17 }}
                >
                    <Region
                        name="header"
                        layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionHeader ?? 'Some group header'}
                    </Region>
                </Region>
                <Region
                    name="details"
                    layout={{ position: 'absolute', left: 0, width: 459, top: 16, height: 16, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionDetails ?? 'Rating 1000, last message by LongLongLongName 30 seconds ago'}
                </Region>
            </Region>
            <Region
                name="unread_texts_container"
                layout={{ position: 'absolute', left: 400, width: 100, top: 0, height: 40 }}
            >
                <Region
                    name="unread_region"
                    onPointerTap={onUnreadRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 40 }}
                >
                    {unreadRegion}
                </Region>
                <Region
                    name="messages1"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMessages1 ?? '100 messages'}
                        textStyle="text-style-regular"
                    />
                </Region>
                <Region
                    name="messages2"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 15, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMessages2 ?? '12 new'}
                        textStyle="text-style-regular"
                    />
                </Region>
            </Region>
        </Region>
    );
};

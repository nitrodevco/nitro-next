import { BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `83_forum_list_item_xml` (layout "forum_list_item", 500x41) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ForumListItemLayoutProps {
    captionDetails?: string;
    captionHeader?: string;
    captionMessages1?: string;
    captionMessages2?: string;
    layout?: BoxLayout;
    onHeaderRegion?: () => void;
    onUnreadRegion?: () => void;
}

export const ForumListItemLayout = ({ captionDetails, captionHeader, captionMessages1, captionMessages2, layout, onHeaderRegion, onUnreadRegion }: ForumListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 500, height: 41, ...layout }}>
            <Region
                name="main_box"
                params={16}
                backgroundColor="#eefeff"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 41 }}
            >
                <Region
                    name="left_button_container"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 41 }}
                >
                    <WidgetSlot
                        widgetType="badge_image"
                        name="group_icon"
                        params={16}
                        options={{ 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                        layout={{ position: 'absolute', left: 1, width: 39, top: 1, height: 39 }}
                    />
                </Region>
                <Region
                    name="texts_container"
                    tags={[ 'relative(1)' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 42, width: 357, top: 0, height: 40 }}
                >
                    <Region
                        name="header_region"
                        params={131089}
                        onPointerTap={onHeaderRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 17 }}
                    >
                        <Region
                            name="header"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionHeader ?? 'Some group header'} />
                        </Region>
                    </Region>
                    <Region
                        name="details"
                        params={1073741825}
                        layout={{ position: 'absolute', left: 0, width: 459, top: 16, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionDetails ?? 'Rating 1000, last message by LongLongLongName 30 seconds ago'} />
                    </Region>
                </Region>
                <Region
                    name="unread_texts_container"
                    params={16}
                    layout={{ position: 'absolute', left: 400, width: 100, top: 0, height: 40 }}
                >
                    <Region
                        name="unread_region"
                        params={145}
                        onPointerTap={onUnreadRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 40 }}
                    />
                    <Region
                        name="messages1"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionMessages1 ?? '100 messages'}
                            textStyle="text-style-regular"
                        />
                    </Region>
                    <Region
                        name="messages2"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 100, top: 15, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionMessages2 ?? '12 new'}
                            textStyle="text-style-regular"
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

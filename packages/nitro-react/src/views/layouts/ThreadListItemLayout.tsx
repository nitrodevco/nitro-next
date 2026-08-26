import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `19_thread_list_item_xml` (layout "thread_list_item", 600x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ThreadListItemLayoutProps {
    layout?: BoxLayout;
}

export const ThreadListItemLayout = ({ layout }: ThreadListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 600, height: 40, ...layout }}>
            <Region
                name="main_box"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 600, top: 0, height: 40 }}
            >
                <Region
                    name="left_button_container"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 40 }}
                >
                    <Region
                        name="info_buttons"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 40, flexDirection: 'column' }}
                    >
                        <Region
                            name="thread_lock"
                            params={17}
                            layout={{ width: 20, height: 20, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="icon"
                                params={2192}
                                src={layoutImage('forum_forum_locked.png')}
                                layout={{ position: 'absolute', left: 3, width: 13, top: 1, height: 18 }}
                            />
                        </Region>
                        <Region
                            name="thread_pin"
                            params={17}
                            layout={{ width: 20, height: 20, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="icon"
                                params={2192}
                                src={layoutImage('forum_forum_pinned.png')}
                                layout={{ position: 'absolute', left: 3, width: 13, top: 2, height: 15 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="texts_container"
                    tags={[ 'relative(1)' ]}
                    params={16}
                    backgroundColor="#eefeff"
                    layout={{ position: 'absolute', left: 21, width: 387, top: 0, height: 40 }}
                >
                    <Region
                        name="header_region"
                        params={131089}
                        layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 17 }}
                    >
                        <Region
                            name="header"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 117, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="Some thread header" />
                        </Region>
                    </Region>
                    <Region
                        name="details"
                        params={1073741825}
                        layout={{ position: 'absolute', left: 0, width: 460, top: 16, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="By author LongLongLongName 7 days ago, last message by LongLongLongName 30 seconds ago" />
                    </Region>
                </Region>
                <Region
                    name="unread_texts_container"
                    params={16}
                    layout={{ position: 'absolute', left: 409, width: 140, top: 0, height: 40 }}
                >
                    <Region
                        name="unread_region"
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 40 }}
                    />
                    <Region
                        name="messages1"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="100 messages"
                            textStyle="text-style-regular"
                        />
                    </Region>
                    <Region
                        name="messages2"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 140, top: 15, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="12 new"
                            textStyle="text-style-regular"
                        />
                    </Region>
                </Region>
                <Region
                    name="button_container"
                    params={17}
                    layout={{ position: 'absolute', left: 550, width: 50, top: 0, height: 40 }}
                >
                    <Region
                        name="mod_buttons"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 40, flexDirection: 'row' }}
                    >
                        <Region
                            name="delete_thread"
                            params={17}
                            backgroundColor="#de4537"
                            layout={{ width: 25, height: 40, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="icon"
                                params={2192}
                                src={layoutImage('forum_forum_hide.png')}
                                layout={{ position: 'absolute', left: 5, width: 16, top: 11, height: 16 }}
                            />
                        </Region>
                        <Region
                            name="report_thread"
                            params={17}
                            backgroundColor="#ff9c65"
                            layout={{ width: 25, height: 40, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="icon"
                                params={2192}
                                src={layoutImage('forum_forum_report.png')}
                                layout={{ position: 'absolute', left: 4, width: 17, top: 12, height: 15 }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

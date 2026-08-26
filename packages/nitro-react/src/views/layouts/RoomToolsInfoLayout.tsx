import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `874_room_tools_info_xml` (layout "room_tools_info", 255x77) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomToolsInfoLayoutProps {
    layout?: BoxLayout;
}

export const RoomToolsInfoLayout = ({ layout }: RoomToolsInfoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 255, height: 77, ...layout }}>
            <Region
                params={147456}
                layout={{ position: 'absolute', left: -1, width: 255, top: 0, height: 77, maxWidth: 320 }}
            >
                <Border
                    variant="2"
                    name="window_bg"
                    params={4341777}
                    tintColor="#24231e"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 0, width: 255, top: 0, height: 77, maxWidth: 320 }}
                >
                    <Region
                        name="room_name"
                        params={4341888}
                        layout={{ position: 'absolute', left: 10, width: 245, top: 6, height: 24, minWidth: 60, maxWidth: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="..."
                            textStyle="text-style-ubuntu-condensed-title"
                        />
                    </Region>
                    <Region
                        name="owner_name_and_tags"
                        params={4341776}
                        layout={{ position: 'absolute', left: 10, width: 126, top: 33, height: 44, maxWidth: 300 }}
                    >
                        <Region
                            name="room_owner"
                            params={4341776}
                            layout={{ position: 'absolute', left: 0, width: 126, top: 0, height: 21, maxWidth: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="..."
                                textStyle="text-style-u-headline-medium"
                                textOptions={{ fill: '#999999' }}
                            />
                        </Region>
                        <Region
                            name="tags"
                            params={147472}
                            layout={{ position: 'absolute', left: 0, width: 69, top: 25, height: 19, maxWidth: 230, flexDirection: 'row', gap: 4 }}
                        >
                            <Border
                                variant="3"
                                name="tag1_border"
                                params={16}
                                tintColor="#1c2935"
                                layout={{ width: 30, height: 13, flexShrink: 0 }}
                            >
                                <Region
                                    name="tag1_region"
                                    params={12582929}
                                    layout={{ position: 'absolute', left: 1, width: 29, top: -1, height: 15 }}
                                >
                                    <Region
                                        name="tag1"
                                        params={12582928}
                                        layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text="#jobs"
                                            textOptions={{ fill: '#1b79ab' }}
                                        />
                                    </Region>
                                </Region>
                            </Border>
                            <Border
                                variant="3"
                                name="tag2_border"
                                params={16}
                                tintColor="#1c2935"
                                layout={{ width: 35, height: 13, flexShrink: 0 }}
                            >
                                <Region
                                    name="tag2_region"
                                    params={12582929}
                                    layout={{ position: 'absolute', left: 1, width: 34, top: -1, height: 15 }}
                                >
                                    <Region
                                        name="tag2"
                                        params={12582928}
                                        layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text="#party"
                                            textOptions={{ fill: '#1b79ab' }}
                                        />
                                    </Region>
                                </Region>
                            </Border>
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};

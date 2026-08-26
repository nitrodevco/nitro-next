import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1214_roomtools_xml` (layout "roomtools", 192x32) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomtoolsLayoutProps {
    layout?: BoxLayout;
}

export const RoomtoolsLayout = ({ layout }: RoomtoolsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 32, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 32 }}>
                <Region
                    name="zoom_region"
                    tags={[ 'REGION' ]}
                    tooltip={t('toolbar.icon.tooltip.zoom')}
                    params={17}
                    layout={{ position: 'absolute', left: 0, width: 29, top: 2, height: 29 }}
                >
                    <Border
                        variant="6"
                        tags={[ 'BGCOLOR' ]}
                        params={16}
                        tintColor="#55534e"
                        layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#201e19"
                            blend={0.8}
                            layout={{ position: 'absolute', left: 3, width: 23, top: 3, height: 22 }}
                        />
                        <ThemeImage
                            name="icon_zoom_off"
                            params={16}
                            src="${image.library.url}album3726/icon_zoom_off.png"
                            layout={{ position: 'absolute', left: 1, width: 23, top: 0, height: 27 }}
                        />
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 0, height: 27 }}
                        >
                            <ThemeImage
                                name="icon_zoom_over"
                                params={16}
                                src="${image.library.url}album3726/icon_zoom_over.png"
                                layout={{ position: 'absolute', left: 1, width: 23, top: 0, height: 27 }}
                            />
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="roominfo_region"
                    tags={[ 'REGION' ]}
                    params={17}
                    layout={{ position: 'absolute', left: 31, width: 161, top: 2, height: 29 }}
                >
                    <Border
                        variant="6"
                        tags={[ 'BGCOLOR' ]}
                        params={16}
                        tintColor="#55534e"
                        layout={{ position: 'absolute', left: 0, width: 161, top: 0, height: 29 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#201e19"
                            blend={0.8}
                            layout={{ position: 'absolute', left: 3, width: 155, top: 3, height: 22 }}
                        />
                        <Region
                            name="list"
                            params={16}
                            layout={{ position: 'absolute', left: 9, width: 114, top: 5, height: 17, flexDirection: 'row', gap: 2 }}
                        >
                            <Region
                                name="roominfo_text"
                                tags={[ 'TEXT' ]}
                                params={16}
                                layout={{ width: 175, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('navigator.roomsettings.roomname')}
                                    textStyle="text-style-il-regular-white"
                                    textOptions={{ fill: '#989898' }}
                                />
                            </Region>
                            <Region
                                name="roominfo_name"
                                tags={[ 'TEXT' ]}
                                params={16}
                                layout={{ width: 12, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="..."
                                    textStyle="text-style-il-regular-white"
                                />
                            </Region>
                        </Region>
                    </Border>
                    <Border
                        variant="6"
                        params={16}
                        tintColor="#55534e"
                        layout={{ position: 'absolute', left: 132, width: 29, top: 0, height: 29 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#201e19"
                            blend={0.8}
                            layout={{ position: 'absolute', left: 3, width: 23, top: 3, height: 22 }}
                        />
                        <ThemeImage
                            name="icon_zoom_off"
                            params={16}
                            src={layoutImage('toolbar_room_icon_0.png')}
                            layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                        />
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};

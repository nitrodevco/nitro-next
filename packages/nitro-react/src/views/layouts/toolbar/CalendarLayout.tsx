import { ReactNode } from 'react';

import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1260_calendar_xml` (layout "calendar", 1033x607) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CalendarLayoutProps {
    captionInfoBody?: string;
    captionInfoHeading?: string;
    itemsCalendarItemlist?: ReactNode;
    layout?: BoxLayout;
    onBtnBack?: () => void;
    onBtnForceOpen?: () => void;
    onBtnForward?: () => void;
    onClose?: () => void;
    srcGradient1?: string;
    srcGradient2?: string;
    visibleBtnForceOpen?: boolean;
}

export const CalendarLayout = ({ captionInfoBody, captionInfoHeading, itemsCalendarItemlist, layout, onBtnBack, onBtnForceOpen, onBtnForward, onClose, srcGradient1, srcGradient2, visibleBtnForceOpen }: CalendarLayoutProps) => {
    return (
        <Frame
            variant="3"
            params={1}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 1033, height: 607, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={2192}
                    backgroundColor="#0e0f1f"
                    layout={{ position: 'absolute', left: 0, width: 1033, top: 0, height: 607 }}
                >
                    <Region
                        name="spinner_container"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 1033, top: 106, height: 463 }}
                    >
                        <Region
                            name="calendar_itemlist"
                            params={149}
                            layout={{ position: 'absolute', left: 0, width: 1033, top: 15, height: 447, flexDirection: 'row', gap: 4 }}
                        >
                            {itemsCalendarItemlist ?? (
                                <CalendarLayoutBtnSlotItem />
                            )}
                            <Region
                                params={16}
                                layout={{ width: 202, height: 447, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('campaign_calendar_day_generic_bg.png')}
                                    layout={{ position: 'absolute', left: 0, width: 202, top: 0, height: 447 }}
                                />
                            </Region>
                            <Region
                                params={16}
                                layout={{ width: 202, height: 447, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('campaign_calendar_day_generic_bg.png')}
                                    layout={{ position: 'absolute', left: 0, width: 202, top: 0, height: 447 }}
                                />
                            </Region>
                            <Region
                                params={16}
                                layout={{ width: 202, height: 447, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('campaign_calendar_day_generic_bg.png')}
                                    layout={{ position: 'absolute', left: 0, width: 202, top: 0, height: 447 }}
                                />
                            </Region>
                            <Region
                                params={16}
                                layout={{ width: 202, height: 447, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('campaign_calendar_day_generic_bg.png')}
                                    layout={{ position: 'absolute', left: 0, width: 202, top: 0, height: 447 }}
                                />
                            </Region>
                        </Region>
                        <ThemeImage
                            name="gradient1"
                            params={2064}
                            src={srcGradient1}
                            layout={{ position: 'absolute', left: 0, width: 408, top: 15, height: 447 }}
                        />
                        <ThemeImage
                            name="gradient2"
                            params={2048}
                            src={srcGradient2}
                            layout={{ position: 'absolute', left: 618, width: 408, top: 15, height: 447 }}
                        />
                    </Region>
                </Region>
                <ThemeImage
                    params={16}
                    src={layoutImage('campaign_calendar_icon.png')}
                    layout={{ position: 'absolute', left: 31, width: 47, top: 32, height: 51 }}
                />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 95, width: 500, top: 28, height: 50, maxHeight: 120, flexDirection: 'column', gap: 3 }}
                >
                    <Region
                        name="info_heading"
                        params={9584688}
                        layout={{ width: 500, height: 26, flexShrink: 0, maxWidth: 500, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoHeading ?? 'December 20th'}
                            textStyle="text-style-ubuntu-condensed-title"
                            textOptions={{ fill: '#7ecaed', wordWrap: true, wordWrapWidth: 500 }}
                        />
                    </Region>
                    <Region
                        name="info_body"
                        params={9437232}
                        layout={{ width: 500, height: 17, flexShrink: 0, maxWidth: 500, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoBody ?? 'This spell will produce xxxxxx xxx xxxxx'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 500 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="btn_forward"
                    params={147457}
                    onPointerTap={onBtnForward}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 991, width: 33, top: 325, height: 34 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('icons_forward.png')}
                        layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
                    />
                </Region>
                <Region
                    name="btn_back"
                    params={147457}
                    onPointerTap={onBtnBack}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 4, width: 33, top: 325, height: 34 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('icons_back.png')}
                        layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
                    />
                </Region>
                <Region
                    visible={visibleBtnForceOpen ?? false}
                    layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 30, minWidth: 120, maxWidth: 120 }}
                >
                    <Button
                        variant="6"
                        name="btn_force_open"
                        params={131089}
                        tintColor="#299f3a"
                        onPointerTap={onBtnForceOpen}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        FORCE OPEN
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `btn_slot` of CalendarLayout - pass real rows through its `items…` slot. */
export interface CalendarLayoutBtnSlotItemProps {
    layout?: BoxLayout;
    srcBitmapBg?: string;
    srcBitmapIcon?: string;
    srcBitmapIcon2?: string;
    srcBitmapItem?: string;
    srcBitmapLock?: string;
    srcBitmapOpenedBg?: string;
}

export const CalendarLayoutBtnSlotItem = ({ layout, srcBitmapBg, srcBitmapIcon, srcBitmapIcon2, srcBitmapItem, srcBitmapLock, srcBitmapOpenedBg }: CalendarLayoutBtnSlotItemProps) => {
    return (
        <Region
            name="btn_slot"
            params={21}
            layout={{ width: 202, height: 447, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="bitmap_item"
                params={19}
                src={srcBitmapItem ?? layoutImage('campaign_calendar_day_generic_bg.png')}
                layout={{ position: 'absolute', left: 0, width: 202, top: 0, height: 447 }}
            />
            <Region
                name="btn_present"
                params={16}
                layout={{ position: 'absolute', left: 7, width: 192, top: 115, height: 192 }}
            >
                <ThemeImage
                    name="bitmap_bg"
                    params={4079635}
                    src={srcBitmapBg}
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 192 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 192 }}
                >
                    <ThemeImage
                        name="bitmap_opened_bg"
                        params={4079635}
                        src={srcBitmapOpenedBg ?? layoutImage('campaign_calendar_opened.png')}
                        layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 192 }}
                    />
                </Region>
                <ThemeImage
                    name="bitmap_icon2"
                    params={4079635}
                    src={srcBitmapIcon2}
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 192 }}
                />
                <ThemeImage
                    name="bitmap_icon"
                    params={4079635}
                    src={srcBitmapIcon}
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 192 }}
                />
            </Region>
            <ThemeImage
                name="bitmap_lock"
                params={4079635}
                src={srcBitmapLock ?? layoutImage('campaign_calendar_generic_lock.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 51 }}
            />
        </Region>
    );
};

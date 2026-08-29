import { ReactNode } from 'react';

import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1260_calendar_xml` (layout "calendar", 1033x607) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CalendarLayoutProps {
    btnBack?: CalendarLayoutBtnBackProps;
    btnForward?: CalendarLayoutBtnForwardProps;
    captionInfoBody?: string;
    captionInfoHeading?: string;
    layout?: BoxLayout;
    onBtnForceOpen?: () => void;
    onClose?: () => void;
    spinnerContainer?: CalendarLayoutSpinnerContainerProps;
    visibleBtnForceOpen?: boolean;
}

export const CalendarLayout = ({ btnBack, btnForward, captionInfoBody, captionInfoHeading, layout, onBtnForceOpen, onClose, spinnerContainer, visibleBtnForceOpen }: CalendarLayoutProps) => {
    return (
        <Frame
            variant="3"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 1033, height: 607, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    backgroundColor="#0e0f1f"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <CalendarLayoutSpinnerContainer {...spinnerContainer} />
                </Region>
                <ThemeImage
                    src={layoutImage('campaign_calendar_icon.png')}
                    layout={{ position: 'absolute', left: 31, width: 47, top: 32, height: 51 }}
                />
                <Region layout={{ position: 'absolute', left: 95, width: 500, top: 28, height: 50, maxHeight: 120, flexDirection: 'column', gap: 3 }}>
                    <Region
                        name="info_heading"
                        layout={{ width: 500, flexShrink: 0, maxWidth: 500, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoHeading ?? 'December 20th'}
                            textStyle="text-style-ubuntu-condensed-title"
                            textOptions={{ fill: '#7ecaed', wordWrap: true, wordWrapWidth: 500 }}
                        />
                    </Region>
                    <Region
                        name="info_body"
                        layout={{ width: 500, flexShrink: 0, maxWidth: 500, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoBody ?? 'This spell will produce xxxxxx xxx xxxxx'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 500 }}
                        />
                    </Region>
                </Region>
                <CalendarLayoutBtnForward {...btnForward} />
                <CalendarLayoutBtnBack {...btnBack} />
                <Region
                    visible={visibleBtnForceOpen ?? false}
                    layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 30, minWidth: 120, maxWidth: 120 }}
                >
                    <Button
                        variant="6"
                        name="btn_force_open"
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

/** Named region `btn_present` of CalendarLayout - configured through the parent's `btnPresent` prop. */
export interface CalendarLayoutBtnPresentProps {
    layout?: BoxLayout;
    srcBitmapBg?: string;
    srcBitmapIcon?: string;
    srcBitmapIcon2?: string;
    srcBitmapOpenedBg?: string;
}

export const CalendarLayoutBtnPresent = ({ layout, srcBitmapBg, srcBitmapIcon, srcBitmapIcon2, srcBitmapOpenedBg }: CalendarLayoutBtnPresentProps) => {
    return (
        <Region
            name="btn_present"
            layout={{ position: 'absolute', left: 7, width: 192, top: 115, height: 192, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="bitmap_bg"
                src={srcBitmapBg}
                layout={{ position: 'absolute', width: 192, alignSelf: 'center', height: 192 }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', width: 192, alignSelf: 'center', height: 192 }}
            >
                <ThemeImage
                    name="bitmap_opened_bg"
                    src={srcBitmapOpenedBg ?? layoutImage('campaign_calendar_opened.png')}
                    layout={{ position: 'absolute', width: 192, alignSelf: 'center', height: 192 }}
                />
            </Region>
            <ThemeImage
                name="bitmap_icon2"
                src={srcBitmapIcon2}
                layout={{ position: 'absolute', width: 192, alignSelf: 'center', height: 192 }}
            />
            <ThemeImage
                name="bitmap_icon"
                src={srcBitmapIcon}
                layout={{ position: 'absolute', width: 192, alignSelf: 'center', height: 192 }}
            />
        </Region>
    );
};

/** Row template `btn_slot` of CalendarLayout - pass real rows through its `items…` slot. */
export interface CalendarLayoutBtnSlotItemProps {
    btnPresent?: CalendarLayoutBtnPresentProps;
    layout?: BoxLayout;
    onBtnSlot?: () => void;
    srcBitmapItem?: string;
    srcBitmapLock?: string;
}

export const CalendarLayoutBtnSlotItem = ({ btnPresent, layout, onBtnSlot, srcBitmapItem, srcBitmapLock }: CalendarLayoutBtnSlotItemProps) => {
    return (
        <Region
            name="btn_slot"
            onPointerTap={onBtnSlot}
            cursor="pointer"
            layout={{ width: 202, height: 447, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="bitmap_item"
                src={srcBitmapItem ?? layoutImage('campaign_calendar_day_generic_bg.png')}
                layout={{ position: 'absolute', left: 0, width: 202, top: 0, height: 447 }}
            />
            <CalendarLayoutBtnPresent {...btnPresent} />
            <ThemeImage
                name="bitmap_lock"
                src={srcBitmapLock ?? layoutImage('campaign_calendar_generic_lock.png')}
                layout={{ position: 'absolute', marginLeft: -77.5, marginRight: 77.5, width: 47, alignSelf: 'center', marginTop: -198, marginBottom: 198, height: 51 }}
            />
        </Region>
    );
};

/** Named region `calendar_itemlist` of CalendarLayout - configured through the parent's `calendarItemlist` prop. */
export interface CalendarLayoutCalendarItemlistProps {
    itemsCalendarItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const CalendarLayoutCalendarItemlist = ({ itemsCalendarItemlist, layout }: CalendarLayoutCalendarItemlistProps) => {
    return (
        <Region
            name="calendar_itemlist"
            layout={{ position: 'absolute', left: 0, right: 0, top: 15, height: 447, flexDirection: 'row', gap: 4, ...layout }}
        >
            {itemsCalendarItemlist ?? (
                <CalendarLayoutBtnSlotItem />
            )}
            <Region layout={{ width: 202, height: 447, flexShrink: 0 }}>
                <ThemeImage
                    src={layoutImage('campaign_calendar_day_generic_bg.png')}
                    layout={{ position: 'absolute', left: 0, width: 202, top: 0, height: 447 }}
                />
            </Region>
            <Region layout={{ width: 202, height: 447, flexShrink: 0 }}>
                <ThemeImage
                    src={layoutImage('campaign_calendar_day_generic_bg.png')}
                    layout={{ position: 'absolute', left: 0, width: 202, top: 0, height: 447 }}
                />
            </Region>
            <Region layout={{ width: 202, height: 447, flexShrink: 0 }}>
                <ThemeImage
                    src={layoutImage('campaign_calendar_day_generic_bg.png')}
                    layout={{ position: 'absolute', left: 0, width: 202, top: 0, height: 447 }}
                />
            </Region>
            <Region layout={{ width: 202, height: 447, flexShrink: 0 }}>
                <ThemeImage
                    src={layoutImage('campaign_calendar_day_generic_bg.png')}
                    layout={{ position: 'absolute', left: 0, width: 202, top: 0, height: 447 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `spinner_container` of CalendarLayout - configured through the parent's `spinnerContainer` prop. */
export interface CalendarLayoutSpinnerContainerProps {
    calendarItemlist?: CalendarLayoutCalendarItemlistProps;
    layout?: BoxLayout;
    srcGradient1?: string;
    srcGradient2?: string;
}

export const CalendarLayoutSpinnerContainer = ({ calendarItemlist, layout, srcGradient1, srcGradient2 }: CalendarLayoutSpinnerContainerProps) => {
    return (
        <Region
            name="spinner_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 106, height: 463, ...layout }}
        >
            <CalendarLayoutCalendarItemlist {...calendarItemlist} />
            <ThemeImage
                name="gradient1"
                src={srcGradient1}
                layout={{ position: 'absolute', left: 0, width: 408, top: 15, bottom: 1 }}
            />
            <ThemeImage
                name="gradient2"
                src={srcGradient2}
                layout={{ position: 'absolute', left: 618, width: 408, top: 15, bottom: 1 }}
            />
        </Region>
    );
};

/** Named region `btn_forward` of CalendarLayout - configured through the parent's `btnForward` prop. */
export interface CalendarLayoutBtnForwardProps {
    layout?: BoxLayout;
    onBtnForward?: () => void;
}

export const CalendarLayoutBtnForward = ({ layout, onBtnForward }: CalendarLayoutBtnForwardProps) => {
    return (
        <Region
            name="btn_forward"
            onPointerTap={onBtnForward}
            cursor="pointer"
            layout={{ position: 'absolute', left: 991, width: 33, top: 325, height: 34, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_forward.png')}
                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
            />
        </Region>
    );
};

/** Named region `btn_back` of CalendarLayout - configured through the parent's `btnBack` prop. */
export interface CalendarLayoutBtnBackProps {
    layout?: BoxLayout;
    onBtnBack?: () => void;
}

export const CalendarLayoutBtnBack = ({ layout, onBtnBack }: CalendarLayoutBtnBackProps) => {
    return (
        <Region
            name="btn_back"
            onPointerTap={onBtnBack}
            cursor="pointer"
            layout={{ position: 'absolute', left: 4, width: 33, top: 325, height: 34, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_back.png')}
                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
            />
        </Region>
    );
};

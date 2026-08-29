import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `btn_slot` of CalendarLayout - pass real rows through its `items…` slot. */
export interface CalendarLayoutBtnSlotItemProps {
    layout?: BoxLayout;
    onBtnSlot?: () => void;
    srcBitmapBg?: string;
    srcBitmapIcon?: string;
    srcBitmapIcon2?: string;
    srcBitmapItem?: string;
    srcBitmapLock?: string;
    srcBitmapOpenedBg?: string;
    tintBitmapIcon2?: string;
    visibleBitmapBg?: boolean;
    visibleBitmapIcon?: boolean;
    visibleBitmapIcon2?: boolean;
    visibleBitmapItem?: boolean;
    visibleBitmapLock?: boolean;
    visibleBitmapOpenedBg?: boolean;
    visibleBtnPresent?: boolean;
}

export const CalendarLayoutBtnSlotItem = ({ layout, onBtnSlot, srcBitmapBg, srcBitmapIcon, srcBitmapIcon2, srcBitmapItem, srcBitmapLock, srcBitmapOpenedBg, tintBitmapIcon2, visibleBitmapBg, visibleBitmapIcon, visibleBitmapIcon2, visibleBitmapItem, visibleBitmapLock, visibleBitmapOpenedBg, visibleBtnPresent }: CalendarLayoutBtnSlotItemProps) => {
    return (
        <Region
            name="btn_slot"
            onPointerTap={onBtnSlot}
            cursor="pointer"
            layout={{ width: 202, height: 447, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleBitmapItem ?? true) && (
                <ThemeImage
                    name="bitmap_item"
                    src={srcBitmapItem ?? layoutImage('campaign_calendar_day_generic_bg.png')}
                    layout={{ position: 'absolute', left: 0, width: 202, top: 0, height: 447 }}
                />
            )}
            {(visibleBtnPresent ?? true) && (
                <Region
                    name="btn_present"
                    layout={{ position: 'absolute', left: 7, width: 192, top: 115, height: 192, justifyContent: 'center' }}
                >
                    {(visibleBitmapBg ?? true) && (
                        <ThemeImage
                            name="bitmap_bg"
                            src={srcBitmapBg}
                            layout={{ position: 'absolute', width: 192, alignSelf: 'center', height: 192 }}
                        />
                    )}
                    {(visibleBitmapOpenedBg ?? false) && (
                        <ThemeImage
                            name="bitmap_opened_bg"
                            src={srcBitmapOpenedBg ?? layoutImage('campaign_calendar_opened.png')}
                            layout={{ position: 'absolute', width: 192, alignSelf: 'center', height: 192 }}
                        />
                    )}
                    {(visibleBitmapIcon2 ?? true) && (
                        <ThemeImage
                            name="bitmap_icon2"
                            src={srcBitmapIcon2}
                            tint={tintBitmapIcon2}
                            layout={{ position: 'absolute', width: 192, alignSelf: 'center', height: 192 }}
                        />
                    )}
                    {(visibleBitmapIcon ?? true) && (
                        <ThemeImage
                            name="bitmap_icon"
                            src={srcBitmapIcon}
                            layout={{ position: 'absolute', width: 192, alignSelf: 'center', height: 192 }}
                        />
                    )}
                </Region>
            )}
            {(visibleBitmapLock ?? true) && (
                <ThemeImage
                    name="bitmap_lock"
                    src={srcBitmapLock ?? layoutImage('campaign_calendar_generic_lock.png')}
                    layout={{ position: 'absolute', marginLeft: -77.5, marginRight: 77.5, width: 47, alignSelf: 'center', marginTop: -198, marginBottom: 198, height: 51 }}
                />
            )}
        </Region>
    );
};

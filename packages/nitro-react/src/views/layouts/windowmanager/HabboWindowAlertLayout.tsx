import { ReactNode } from 'react';

import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `2424_habbo_window_alert_xml` (layout "habbo_window_alert", 278x141) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboWindowAlertLayoutProps {
    captionAlertSummary?: string;
    itemsAlertButtonList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const HabboWindowAlertLayout = ({ captionAlertSummary, itemsAlertButtonList, layout, onClose }: HabboWindowAlertLayoutProps) => {
    return (
        <Frame
            variant="3"
            id="_alert_frame"
            name="_alert_frame"
            caption="Alert"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 278, height: 141, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    name="_alert_summary"
                    layout={{ position: 'absolute', left: 27, width: 210, top: 14, minHeight: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAlertSummary ?? 'Alert'}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    />
                </Region>
                <Region
                    name="_alert_button_list"
                    layout={{ position: 'absolute', marginLeft: -5.5, marginRight: 5.5, width: 215, bottom: 36, height: 24, minHeight: 22, flexDirection: 'row', gap: 32 }}
                >
                    {itemsAlertButtonList ?? (
                        <>
                            <HabboWindowAlertLayoutAlertButtonCancelItem />
                            <HabboWindowAlertLayoutAlertButtonCustomItem />
                            <HabboWindowAlertLayoutAlertButtonOkItem />
                        </>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `_alert_button_cancel` of HabboWindowAlertLayout - pass real rows through its `items…` slot. */
export interface HabboWindowAlertLayoutAlertButtonCancelItemProps {
    captionAlertButtonCancel?: string;
    layout?: BoxLayout;
    onAlertButtonCancel?: () => void;
}

export const HabboWindowAlertLayoutAlertButtonCancelItem = ({ captionAlertButtonCancel, layout, onAlertButtonCancel }: HabboWindowAlertLayoutAlertButtonCancelItemProps) => {
    return (
        <Region
            name="_alert_button_cancel"
            layout={{ width: 51, height: 17, flexShrink: 0, minWidth: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
            onPointerTap={onAlertButtonCancel}
            cursor="pointer"
        >
            <ThemeText
                text={captionAlertButtonCancel ?? 'Cancel'}
                textStyle="text-style-u-regular"
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

/** Row template `_alert_button_custom` of HabboWindowAlertLayout - pass real rows through its `items…` slot. */
export interface HabboWindowAlertLayoutAlertButtonCustomItemProps {
    layout?: BoxLayout;
    onAlertButtonCustom?: () => void;
}

export const HabboWindowAlertLayoutAlertButtonCustomItem = ({ layout, onAlertButtonCustom }: HabboWindowAlertLayoutAlertButtonCustomItemProps) => {
    return (
        <Button
            variant="3"
            name="_alert_button_custom"
            onPointerTap={onAlertButtonCustom}
            layout={{ width: 50, height: 24, flexShrink: 0, minWidth: 50, ...layout }}
        >
            Alert
        </Button>
    );
};

/** Row template `_alert_button_ok` of HabboWindowAlertLayout - pass real rows through its `items…` slot. */
export interface HabboWindowAlertLayoutAlertButtonOkItemProps {
    layout?: BoxLayout;
    onAlertButtonOk?: () => void;
}

export const HabboWindowAlertLayoutAlertButtonOkItem = ({ layout, onAlertButtonOk }: HabboWindowAlertLayoutAlertButtonOkItemProps) => {
    return (
        <ButtonThick
            variant="3"
            name="_alert_button_ok"
            onPointerTap={onAlertButtonOk}
            layout={{ width: 50, height: 24, flexShrink: 0, minWidth: 50, ...layout }}
        >
            Ok
        </ButtonThick>
    );
};

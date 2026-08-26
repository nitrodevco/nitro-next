import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `2424_habbo_window_alert_xml` (layout "habbo_window_alert", 278x141) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboWindowAlertLayoutProps {
    layout?: BoxLayout;
    onAlertButtonCancel?: () => void;
    onAlertButtonCustom?: () => void;
    onAlertButtonOk?: () => void;
    onClose?: () => void;
}

export const HabboWindowAlertLayout = ({ layout, onAlertButtonCancel, onAlertButtonCustom, onAlertButtonOk, onClose }: HabboWindowAlertLayoutProps) => {
    return (
        <Frame
            variant="3"
            id="_alert_frame"
            name="_alert_frame"
            params={32769}
            caption="Alert"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 278, height: 141, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="_alert_summary"
                    tags={[ 'DESCRIPTION' ]}
                    params={8388624}
                    layout={{ position: 'absolute', left: 27, width: 210, top: 14, height: 57, minHeight: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="Alert"
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    />
                </Region>
                <Region
                    name="_alert_button_list"
                    params={787664}
                    layout={{ position: 'absolute', left: 26, width: 215, top: 81, height: 24, minHeight: 22, flexDirection: 'row', gap: 32 }}
                >
                    <Region
                        name="_alert_button_cancel"
                        params={131073}
                        layout={{ width: 51, height: 17, flexShrink: 0, minWidth: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPointerTap={onAlertButtonCancel}
                        cursor="pointer"
                    >
                        <ThemeText
                            text="Cancel"
                            textStyle="text-style-u-regular"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="_alert_button_custom"
                        params={131089}
                        onPointerTap={onAlertButtonCustom}
                        layout={{ width: 50, height: 24, flexShrink: 0, minWidth: 50 }}
                    >
                        Alert
                    </Button>
                    <ButtonThick
                        variant="3"
                        name="_alert_button_ok"
                        params={131089}
                        onPointerTap={onAlertButtonOk}
                        layout={{ width: 50, height: 24, flexShrink: 0, minWidth: 50 }}
                    >
                        Ok
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};

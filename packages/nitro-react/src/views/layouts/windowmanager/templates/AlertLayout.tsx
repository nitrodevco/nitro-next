import { BoxLayout, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `1788_alert_xml` (layout "habbo_window_layout_alert", 300x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AlertLayoutProps {
    captionAlertText?: string;
    captionAlertTitle?: string;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const AlertLayout = ({ captionAlertText, captionAlertTitle, layout, onClose }: AlertLayoutProps) => {
    return (
        <Frame
            id="frame"
            name="frame"
            onClose={onClose}
            layout={{ width: 200, height: 400, minWidth: 200, minHeight: 400, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <ThemeText
                    text={captionAlertTitle ?? ''}
                    name="alert_title"
                    layout={{ position: 'absolute', marginLeft: -6, marginRight: 6, width: 160, top: 8, height: 20 }}
                />
                <ThemeText
                    text={captionAlertText ?? ''}
                    name="alert_text"
                    layout={{ position: 'absolute', marginLeft: -6, marginRight: 6, width: 160, top: 40, height: 120 }}
                />
            </Region>
        </Frame>
    );
};

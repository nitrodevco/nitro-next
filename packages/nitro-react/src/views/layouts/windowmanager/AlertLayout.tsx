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
            layout={{ width: 200, height: 400, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="alert_title"
                    layout={{ position: 'absolute', left: 8, width: 160, top: 8, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionAlertTitle ?? ''} />
                </Region>
                <Region
                    name="alert_text"
                    layout={{ position: 'absolute', left: 8, width: 160, top: 40, height: 120, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionAlertText ?? ''} />
                </Region>
            </Region>
        </Frame>
    );
};

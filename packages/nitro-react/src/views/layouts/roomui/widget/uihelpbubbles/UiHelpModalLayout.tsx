import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1088_ui_help_modal_xml` (layout "ui_help_modal", 150x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UiHelpModalLayoutProps {
    layout?: BoxLayout;
    srcBitmap?: string;
}

export const UiHelpModalLayout = ({ layout, srcBitmap }: UiHelpModalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 150, height: 100, ...layout }}>
            <Region
                params={2176}
                layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 100 }}
            >
                <ThemeImage
                    name="bitmap"
                    params={2225}
                    src={srcBitmap}
                    tint="#24231e"
                    layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 99 }}
                />
                <Region
                    name="ui_container"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 146, top: 0, height: 94 }}
                />
            </Region>
        </Region>
    );
};

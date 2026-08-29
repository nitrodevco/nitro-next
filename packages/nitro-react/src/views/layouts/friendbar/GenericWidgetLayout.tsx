import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `43_generic_widget_xml` (layout "landing_view", 250x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GenericWidgetLayoutProps {
    layout?: BoxLayout;
    srcBitmap?: string;
}

export const GenericWidgetLayout = ({ layout, srcBitmap }: GenericWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 30, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 30 }}
            >
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 10, width: 20, top: 10, height: 20 }}
                />
                <Region
                    name="content_container"
                    layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 20, flexDirection: 'column' }}
                />
            </Region>
        </Region>
    );
};

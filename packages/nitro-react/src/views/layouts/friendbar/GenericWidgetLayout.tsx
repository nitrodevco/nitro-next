import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `43_generic_widget_xml` (layout "landing_view", 250x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GenericWidgetLayoutProps {
    contentContainer?: GenericWidgetLayoutContentContainerProps;
    layout?: BoxLayout;
    srcBitmap?: string;
}

export const GenericWidgetLayout = ({ contentContainer, layout, srcBitmap }: GenericWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 30, ...layout }}>
            <Region
                params={147472}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 30 }}
            >
                <ThemeImage
                    name="bitmap"
                    params={16}
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 10, width: 20, top: 10, height: 20 }}
                />
                <GenericWidgetLayoutContentContainer {...contentContainer} />
            </Region>
        </Region>
    );
};

/** Named region `content_container` of GenericWidgetLayout - configured through the parent's `contentContainer` prop. */
export interface GenericWidgetLayoutContentContainerProps {
    layout?: BoxLayout;
}

export const GenericWidgetLayoutContentContainer = ({ layout }: GenericWidgetLayoutContentContainerProps) => {
    return (
        <Region
            name="content_container"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 20, flexDirection: 'column', ...layout }}
        />
    );
};

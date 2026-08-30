import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `30_dynamic_widget_grid_separator_xml` (layout "dynamic_widget_grid_separator", 500x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DynamicWidgetGridSeparatorLayoutProps {
    captionSeparatorTitle?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    srcBorderBar?: string;
    srcHdrLine?: string;
}

export const DynamicWidgetGridSeparatorLayout = ({ captionSeparatorTitle, colorableTextColor, layout, srcBorderBar, srcHdrLine }: DynamicWidgetGridSeparatorLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 500, height: 20, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row', gap: 6 }}>
                <ThemeImage
                    name="border_bar"
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ width: 12, height: 4, flexShrink: 0, minHeight: 4, maxHeight: 4 }}
                />
                <ThemeText
                    text={captionSeparatorTitle ?? 'Title PH'}
                    textStyle="text-style-il-heading-3"
                    textOptions={{ fill: colorableTextColor }}
                    name="separator_title"
                    layout={{ width: 40, alignSelf: 'stretch', flexShrink: 0 }}
                />
                <ThemeImage
                    name="hdr_line"
                    src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ width: 450, height: 4, flexShrink: 0, minHeight: 4, maxHeight: 4 }}
                />
            </Region>
        </Region>
    );
};

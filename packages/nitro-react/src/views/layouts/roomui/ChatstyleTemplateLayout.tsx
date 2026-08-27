import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1024_chatstyle_template_xml` (layout "chatstyle_template", 55x34) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatstyleTemplateLayoutProps {
    layout?: BoxLayout;
    onChatstyleRegion?: () => void;
    srcBubblePreview?: string;
}

export const ChatstyleTemplateLayout = ({ layout, onChatstyleRegion, srcBubblePreview }: ChatstyleTemplateLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 55, height: 34, ...layout }}>
            <Region
                name="chatstyle_region"
                params={17}
                onPointerTap={onChatstyleRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 34 }}
            >
                <Border
                    variant="2"
                    name="background_color"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 34 }}
                />
                <ThemeImage
                    name="bubble_preview"
                    params={3148816}
                    src={srcBubblePreview}
                    layout={{ position: 'absolute', left: 0, width: 55, top: '50%', marginTop: -12, height: 24 }}
                />
            </Region>
        </Region>
    );
};

import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1024_chatstyle_template_xml` (layout "chatstyle_template", 55x34) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatstyleTemplateLayoutProps {
    layout?: BoxLayout;
    onChatstyleRegion?: () => void;
    srcBubblePreview?: string;
    tintBubblePreview?: string;
}

export const ChatstyleTemplateLayout = ({ layout, onChatstyleRegion, srcBubblePreview, tintBubblePreview }: ChatstyleTemplateLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 55, height: 34, ...layout }}>
            <Region
                name="chatstyle_region"
                onPointerTap={onChatstyleRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="2"
                    name="background_color"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ThemeImage
                    name="bubble_preview"
                    src={srcBubblePreview}
                    tint={tintBubblePreview}
                    layout={{ position: 'absolute', left: 0, width: 55, alignSelf: 'center', height: 24 }}
                />
            </Region>
        </Region>
    );
};

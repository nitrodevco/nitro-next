import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1024_chatstyle_template_xml` (layout "chatstyle_template", 55x34) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatstyleTemplateLayoutProps {
    chatstyleRegion?: ChatstyleTemplateLayoutChatstyleRegionProps;
    layout?: BoxLayout;
}

export const ChatstyleTemplateLayout = ({ chatstyleRegion, layout }: ChatstyleTemplateLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 55, height: 34, ...layout }}>
            <ChatstyleTemplateLayoutChatstyleRegion {...chatstyleRegion} />
        </Region>
    );
};

/** Named region `chatstyle_region` of ChatstyleTemplateLayout - configured through the parent's `chatstyleRegion` prop. */
export interface ChatstyleTemplateLayoutChatstyleRegionProps {
    layout?: BoxLayout;
    onChatstyleRegion?: () => void;
    srcBubblePreview?: string;
}

export const ChatstyleTemplateLayoutChatstyleRegion = ({ layout, onChatstyleRegion, srcBubblePreview }: ChatstyleTemplateLayoutChatstyleRegionProps) => {
    return (
        <Region
            name="chatstyle_region"
            params={17}
            onPointerTap={onChatstyleRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 34, ...layout }}
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
                layout={{ position: 'absolute', left: 0, width: 55, alignSelf: 'center', height: 24 }}
            />
        </Region>
    );
};

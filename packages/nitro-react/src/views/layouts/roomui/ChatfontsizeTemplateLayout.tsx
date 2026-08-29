import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `881_chatfontsize_template_xml` (layout "chatfontsize_template", 18x18) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatfontsizeTemplateLayoutProps {
    chatfontsizeRegion?: ChatfontsizeTemplateLayoutChatfontsizeRegionProps;
    layout?: BoxLayout;
}

export const ChatfontsizeTemplateLayout = ({ chatfontsizeRegion, layout }: ChatfontsizeTemplateLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 18, height: 18, ...layout }}>
            <ChatfontsizeTemplateLayoutChatfontsizeRegion {...chatfontsizeRegion} />
        </Region>
    );
};

/** Named region `chatfontsize_region` of ChatfontsizeTemplateLayout - configured through the parent's `chatfontsizeRegion` prop. */
export interface ChatfontsizeTemplateLayoutChatfontsizeRegionProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onChatfontsizeRegion?: () => void;
}

export const ChatfontsizeTemplateLayoutChatfontsizeRegion = ({ captionLabel, layout, onChatfontsizeRegion }: ChatfontsizeTemplateLayoutChatfontsizeRegionProps) => {
    return (
        <Region
            name="chatfontsize_region"
            params={17}
            onPointerTap={onChatfontsizeRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18, ...layout }}
        >
            <Border
                variant="2"
                name="background_color"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 18 }}
            />
            <Region
                name="label"
                params={4194320}
                layout={{ position: 'absolute', left: 4, top: 1, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLabel ?? 'S'}
                    textOptions={{ fill: '#333333' }}
                />
            </Region>
        </Region>
    );
};

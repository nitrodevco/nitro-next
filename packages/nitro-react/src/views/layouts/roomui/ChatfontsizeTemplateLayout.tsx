import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `881_chatfontsize_template_xml` (layout "chatfontsize_template", 18x18) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatfontsizeTemplateLayoutProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onChatfontsizeRegion?: () => void;
}

export const ChatfontsizeTemplateLayout = ({ captionLabel, layout, onChatfontsizeRegion }: ChatfontsizeTemplateLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 18, height: 18, ...layout }}>
            <Region
                name="chatfontsize_region"
                onPointerTap={onChatfontsizeRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="2"
                    name="background_color"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Region
                    name="label"
                    layout={{ position: 'absolute', left: 4, top: 1, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLabel ?? 'S'}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

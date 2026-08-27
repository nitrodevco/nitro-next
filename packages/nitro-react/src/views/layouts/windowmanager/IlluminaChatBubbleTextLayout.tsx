import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1852_illumina_chat_bubble_text_xml` (layout "illumina_chat_bubble_text", 207x4) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaChatBubbleTextLayoutProps {
    captionMessage?: string;
    layout?: BoxLayout;
}

export const IlluminaChatBubbleTextLayout = ({ captionMessage, layout }: IlluminaChatBubbleTextLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 207, height: 4, ...layout }}>
            <Region
                name="message"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 207, top: 0, height: 4, minHeight: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessage ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 207 }}
                />
            </Region>
        </Region>
    );
};

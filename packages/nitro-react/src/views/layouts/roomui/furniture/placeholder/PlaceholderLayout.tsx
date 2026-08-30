import { Border, BoxLayout, Frame, ThemeText } from '#base/theme';

/** Generated from `919_placeholder_xml` (layout "packagecard", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaceholderLayoutProps {
    captionPhMsg?: string;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PlaceholderLayout = ({ captionPhMsg, layout, onClose }: PlaceholderLayoutProps) => {
    return (
        <Frame
            variant="0"
            id="ph_frame"
            name="ph_frame"
            caption="This feature is not yet available!"
            onClose={onClose}
            layout={{ width: 250, height: 150, minWidth: 250, minHeight: 150, ...layout }}
        >
            <Border
                variant="0"
                name="ph_border"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: -9 }}
            >
                <ThemeText
                    text={captionPhMsg ?? 'Coming soon!'}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 134 }}
                    name="ph_msg"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 82, width: 134, top: 17, height: 44 }}
                />
            </Border>
        </Frame>
    );
};

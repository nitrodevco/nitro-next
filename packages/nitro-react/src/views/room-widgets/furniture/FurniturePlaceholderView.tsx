import { Border, Frame, ThemeText } from '#base/theme';

export interface FurniturePlaceholderViewProps {
    onClose: () => void;
}

/**
 * The stand-in for furniture whose real dialog was never built, on the `placeholder` layout
 * (250x150, frame style 0 with margins 6, 25, 6, 7). Its two lines are written into the Flash
 * layout in English rather than localised (`ph_frame` and `ph_msg` captions, no `${...}` key), so
 * the port shows the same literal text - there is no key for a hotel to translate.
 *
 * `PlaceholderView.createWindow` builds it in a container at (-300, 300) and `showWindow` moves it
 * to x 200. `ph_border` is a fixed 238x118 box, and `ph_msg` a word-wrapped Volter 9 field cut at
 * its 134x44 box.
 */
export const FurniturePlaceholderView = ({ onClose }: FurniturePlaceholderViewProps) => {
    return (
        <Frame
            variant="0"
            id="ph_frame"
            caption="This feature is not yet available!"
            dropShadow={false}
            onClose={onClose}
            defaultPosition={{ x: 200, y: 300 }}
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            layout={{ position: 'absolute', width: 250, height: 150 }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, top: 0, width: 238, height: 118 }}
            >
                <ThemeText
                    text="Coming soon!"
                    textOptions={{ fontFamily: 'Volter', fontSize: 9, wordWrap: true, wordWrapWidth: 130 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 82, top: 17, width: 134, height: 44 }}
                />
            </Border>
        </Frame>
    );
};

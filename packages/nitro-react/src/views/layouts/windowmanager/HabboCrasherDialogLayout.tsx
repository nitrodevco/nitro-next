import { BoxLayout, ButtonThick, Frame, ThemeText } from '#base/theme';

/** Generated from `2112_habbo_crasher_dialog_xml` (layout "habbo_crasher_dialog", 201x123) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboCrasherDialogLayoutProps {
    captionCrasherText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onCrasherButton?: () => void;
}

export const HabboCrasherDialogLayout = ({ captionCrasherText, layout, onClose, onCrasherButton }: HabboCrasherDialogLayoutProps) => {
    return (
        <Frame
            variant="3"
            id="crasher_frame"
            name="crasher_frame"
            caption="Client Crasher Tool"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 201, height: 123, minWidth: 201, minHeight: 123, ...layout }}
        >
            <ThemeText
                text={captionCrasherText ?? 'Warning: Pressing the button crashes the client!!!'}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 171 }}
                name="crasher_text"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 7, right: 11, top: 12, height: 36 }}
            />
            <ButtonThick
                variant="3"
                name="crasher_button"
                tooltip={'Pressing me is the last thing you\'ll do...'}
                onPointerTap={onCrasherButton}
                layout={{ position: 'absolute', left: 50, width: 79, bottom: -2, height: 34 }}
            >
                Crash Me!
            </ButtonThick>
        </Frame>
    );
};

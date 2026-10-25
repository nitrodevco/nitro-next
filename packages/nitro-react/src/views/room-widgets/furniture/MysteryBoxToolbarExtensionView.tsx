import { getMysteryBoxKeyColor } from '#base/context/user';
import { Box, TemplateWindow, TemplateWindows } from '#base/theme';

/**
 * The mystery box tracker in the toolbar's extension column - `MysteryBoxToolbarExtension`, which
 * builds `habbo-room-ui-com/mystery_box_toolbar_extension` and docks it as `mystery_box`.
 *
 * `setKeyColors`: the box and the key the account collects, each shown only while the server names
 * a colour for it, tinted from `KEY_COLORS`, with `mysterybox.tracker.box.<colour>` /
 * `.key.<colour>` as its region's tooltip. `setMinimised`: minimised, the window is cut to its
 * 25 pixel title bar, the maximise button replaces the minimise one, and the small box and key show
 * in the title bar for whichever colour is set; maximised, it is 137 tall. `faq_link` shows only
 * when the hotel has a `mysterybox.faq.url`.
 */
export interface MysteryBoxToolbarExtensionViewProps {
    /** `SessionDataManager.mysteryBoxColor`; empty for none. */
    boxColor: string;
    /** `SessionDataManager.mysteryKeyColor`; empty for none. */
    keyColor: string;
    minimised: boolean;
    faqVisible: boolean;
    onMinimise: (minimised: boolean) => void;
    onFaq: () => void;
}

export const MysteryBoxToolbarExtensionView = ({ boxColor, keyColor, minimised, faqVisible, onMinimise, onFaq }: MysteryBoxToolbarExtensionViewProps) => {
    const hasBox = boxColor !== '';
    const hasKey = keyColor !== '';
    const boxTint = hasBox ? getMysteryBoxKeyColor(boxColor) : undefined;
    const keyTint = hasKey ? getMysteryBoxKeyColor(keyColor) : undefined;

    /** `setMinimised`: `_window.height = 25` or `137`. */
    const arrange = ({ root }: TemplateWindows) => root()?.setHeight(minimised ? 25 : 137);

    return (
        // 2 below what is over it, `extension_grid`'s spacing.
        <Box layout={{ marginTop: 2, flexShrink: 0 }}>
            <TemplateWindow
                id="habbo-room-ui-com/mystery_box_toolbar_extension"
                arrange={arrange}
                bindings={{
                    // `windowProcedure`.
                    minimize_region: { visible: !minimised, onPointerTap: () => onMinimise(true) },
                    maximize_region: { visible: minimised, onPointerTap: () => onMinimise(false) },
                    faq_link: { visible: faqVisible, onPointerTap: onFaq },
                    // `setKeyColors`.
                    box_region: { tooltip: hasBox ? `\${mysterybox.tracker.box.${boxColor.toLowerCase()}}` : '' },
                    box_colour: { visible: hasBox, color: boxTint },
                    box_overlay: { visible: hasBox },
                    small_box: { visible: hasBox && minimised, color: boxTint },
                    key_region: { tooltip: hasKey ? `\${mysterybox.tracker.key.${keyColor.toLowerCase()}}` : '' },
                    key_colour: { visible: hasKey, color: keyTint },
                    key_overlay: { visible: hasKey },
                    small_key: { visible: hasKey && minimised, color: keyTint },
                }}
            />
        </Box>
    );
};

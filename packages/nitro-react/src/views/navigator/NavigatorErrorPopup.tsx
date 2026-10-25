/**
 * `habbo-navigator-com/nav_error_popup_xml` as `TextFieldManager.displayError` places it: the message
 * in `error_text`, its border and the popup as wide as the text (`textWidth + 5`, then 15 more), the
 * `popup_arrow_down` (`refreshButton`) under the middle, and the whole thing centred on the refused
 * field and standing on its top edge (`y = field.y - height + 3`).
 *
 * Give it the field's rect in the coordinates of the field's parent - Flash adds the popup to the
 * field's own parent.
 */
import { Box, findTemplateChild, LayoutImage, measureTemplateText, TemplateWindow, TemplateWindows, useTemplate } from '#base/theme';

const TEMPLATE = 'habbo-navigator-com/nav_error_popup_xml';

/** `nav_error_popup`'s `popup_container` height, which `displayError` stands on the field with. */
const POPUP_HEIGHT = 33;

/** `displayError`: the text is 5 wider than its text, the border and popup 15 wider than that. */
const TEXT_PADDING = 5;
const BORDER_PADDING = 15;

export interface NavigatorErrorPopupProps {
    text: string;
    /** The refused field's rect, in its parent's coordinates. */
    fieldLeft: number;
    fieldTop: number;
    fieldWidth: number;
}

export const NavigatorErrorPopup = ({ text, fieldLeft, fieldTop, fieldWidth }: NavigatorErrorPopupProps) => {
    const template = useTemplate(TEMPLATE);
    const errorText = template && findTemplateChild(template.elements, 'error_text');
    const textWidth = Math.ceil((errorText && measureTemplateText(errorText, text, undefined)?.textWidth) ?? 0) + TEXT_PADDING;
    const width = textWidth + BORDER_PADDING;

    const arrange = ({ find }: TemplateWindows) => {
        const arrow = find('popup_arrow_down');

        find('error_text')?.setWidth(textWidth);
        find('border')?.setWidth(width);
        find('popup_container')?.setWidth(width);
        arrow?.setX(Math.trunc((width / 2) - (arrow.width / 2)));
    };

    return (
        <Box layout={{ position: 'absolute', left: fieldLeft + Math.trunc((fieldWidth - width) / 2), top: fieldTop - POPUP_HEIGHT + 3 }}>
            <TemplateWindow
                id={TEMPLATE}
                bindings={{
                    error_text: { caption: text },
                    // `refreshButton(popup, "popup_arrow_down", true)`: the navigator's bitmap of that name.
                    popup_arrow_down: { asset: LayoutImage('habbo-navigator-com/popup_arrow_down.png') },
                }}
                arrange={arrange}
            />
        </Box>
    );
};

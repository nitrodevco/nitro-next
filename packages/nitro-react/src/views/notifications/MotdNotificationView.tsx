import { TemplateWindow, TemplateWindows, useTemplate, useTemplateFrame } from '#base/theme';

/**
 * One message-of-the-day window - Flash's `notifications/singular/MOTDNotification` over
 * `habbo-notifications-com/motd_notification_xml`, centred (`_window.center()`). Each message is a
 * clone of `motd_notification_item` in `message_list`, its `message_text` the message and the item
 * made `textHeight + 20` high. `close` and the header close dispose it.
 */
const TEMPLATE = 'habbo-notifications-com/motd_notification_xml';
const ITEM_TEMPLATE = 'habbo-notifications-com/motd_notification_item_xml';

/** `MOTDNotification.LIST_ITEM_HEIGHT_MARGIN`: each item is its text's height and this. */
const LIST_ITEM_HEIGHT_MARGIN = 20;

/** `relative_vertical_scale_strech` (sic), which the item carries. */
const RELATIVE_VERTICAL_SCALE_STRETCH = 2048;

export interface MotdNotificationViewProps {
    /** The store's id of this window, which names its frame. */
    id: number;
    /** `MOTDNotificationEvent`'s messages, one list item each. */
    messages: string[];
    /** `close` and `header_button_close` - `MOTDNotification.dispose`. */
    onClose: () => void;
}

export const MotdNotificationView = ({ id, messages, onClose }: MotdNotificationViewProps) => {
    const item = useTemplate(ITEM_TEMPLATE);
    const frame = useTemplateFrame({ id: `motd_notification_${id}`, centered: true, rememberPosition: false, onClose });

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={{
                close: { onPointerTap: onClose },
                message_list: {
                    items: item
                        ? messages.map((message, index) => ({
                                key: String(index),
                                from: item,
                                bindings: { message_text: { caption: message } },
                                arrange: ({ find, root }: TemplateWindows) => {
                                    const clone = root();
                                    const field = find('message_text');

                                    if (!clone || !field) return;

                                    // `textHeight + 20`; the text, stretched with it, shrinks to fit.
                                    clone.setHeight(field.textHeight + LIST_ITEM_HEIGHT_MARGIN);
                                    // The list's content box grows as items go in, and would stretch them with it.
                                    clone.setParamFlag(RELATIVE_VERTICAL_SCALE_STRETCH, false);
                                },
                            }))
                        : [],
                },
            }}
        />
    );
};

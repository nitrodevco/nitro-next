/**
 * `WiredErrorInfoView` on `error_info_view_xml` - what an error of the monitor tab's log means:
 * its category's icon, its name, and the explanation `wiredmenu.error_info.<errorId>`, drawn from
 * the Flash template (`initialize`). The explanation's text grows the `contents` container, and the
 * window follows it (`_window.height = contents.height + 48`). It belongs to the monitor tab and
 * goes when the menu's view does.
 */
import type { IWiredErrorLogsError } from '@nitrodevco/nitro-packets';

import { useTranslation } from '#base/context/system';
import { LayoutImage, TemplateWindow, TemplateWindows } from '#base/theme';

export interface WiredErrorInfoViewProps {
    error: IWiredErrorLogsError;
    onClose: () => void;
}

/** `initialize`'s last line: the frame's caption bar and padding around `contents`. */
const FRAME_EXTRA_HEIGHT = 48;

const arrange = ({ find, root }: TemplateWindows) => {
    const contents = find('contents');

    if (contents) root()?.setHeight(contents.height + FRAME_EXTRA_HEIGHT);
};

export const WiredErrorInfoView = ({ error, onClose }: WiredErrorInfoViewProps) => {
    const t = useTranslation();

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/error_info_view_xml"
            frame={{ id: 'wired_error_info', defaultPosition: { x: 35, y: 30 }, onClose }}
            arrange={arrange}
            bindings={{
                error_name: { caption: error.errorName },
                type_icon: { asset: LayoutImage(`habbo-window-manager-com/icon_wired_${error.category.toLowerCase()}.png`) },
                error_text: { caption: t(`wiredmenu.error_info.${error.errorId}`, `wiredmenu.error_info.${error.errorId}`) },
            }}
        />
    );
};

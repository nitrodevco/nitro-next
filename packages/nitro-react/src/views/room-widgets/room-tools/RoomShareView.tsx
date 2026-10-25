/**
 * The share panel behind the tool column's link button - `RoomToolsToolbarCtrl.onWindowEvent`'s
 * `button_share`, on `habbo-room-ui-com`'s `share_room` layout, centred (`window.center()`): its
 * `close` tag closes it, `embed_src_txt` holds the embed snippet (`getEmbedData()`),
 * `embed_src_direct_txt` the plain link to the room (`${url.prefix}/room/%roomId%`) and
 * `thumbnail_image` the room's thumbnail (`getThumbnailUrl`), the layout's default room picture while
 * there is none. Flash put the snippet on the clipboard as it opened the window, which the widget does.
 */
import { TemplateWindow } from '#base/theme';

export interface RoomShareViewProps {
    /** The embed snippet, already filled in - it is also what was put on the clipboard. */
    embedCode: string;
    /** The plain link to the room, for anyone who does not want to embed it. */
    directLink: string;
    thumbnailUrl: string;
    onClose: () => void;
}

const SHARE_TEMPLATE = 'habbo-room-ui-com/share_room_xml';

export const RoomShareView = ({ embedCode, directLink, thumbnailUrl, onClose }: RoomShareViewProps) => (
    <TemplateWindow
        id={SHARE_TEMPLATE}
        frame={{ id: 'room-share', centered: true, rememberPosition: false, onClose }}
        bindings={{
            embed_src_txt: { caption: embedCode },
            // Here to be selected and copied: typing into it changes nothing.
            embed_src_direct_txt: { caption: directLink },
            ...(thumbnailUrl.length ? { thumbnail_image: { asset: thumbnailUrl } } : {}),
        }}
    />
);

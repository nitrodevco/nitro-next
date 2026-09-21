import { useTranslation } from '#base/context/system';
import { Frame, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

export interface RoomShareViewProps {
    /** The embed snippet, already filled in - it is also what was put on the clipboard. */
    embedCode: string;
    /** The plain link to the room, for anyone who does not want to embed it. */
    directLink: string;
    thumbnailUrl: string;
    onClose: () => void;
}

/**
 * The share panel behind the tool column's link button, on the `share_room` layout (457x196):
 * the room's thumbnail, the embed snippet, and the plain link to copy. Flash put the snippet on
 * the clipboard as it opened the window, which the widget does.
 */
export const RoomShareView = ({ embedCode, directLink, thumbnailUrl, onClose }: RoomShareViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="room-share"
            caption={t('navigator.embed.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            defaultPosition={{ x: 120, y: 90 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 457, height: 250 }}
        >
            <Region
                name="thumbnail_edges"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 18, width: 112, top: 19, height: 112 }}
            >
                <ThemeImage
                    name="thumbnail_image"
                    src={thumbnailUrl.length ? thumbnailUrl : LayoutImage('shared/newnavigator_default_room.png')}
                    layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
                />
            </Region>
            <Region
                name="embed_info"
                layout={{ position: 'absolute', right: 10, width: 285, top: 10, height: 240 }}
            >
                <ThemeText
                    text={t('navigator.embed.headline')}
                    textStyle="u_bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 281, fontSize: 18 }}
                    name="embed_info_hdln"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: 4, top: 0, height: 26 }}
                />
                <ThemeText
                    text={t('navigator.embed.info')}
                    textStyle="u_small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 286 }}
                    name="embed_info_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: -1, top: 28, height: 40 }}
                />
                <ThemeText
                    text={embedCode}
                    textStyle="u_small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 286, fontSize: 14 }}
                    flashFormat={{ underline: true }}
                    name="embed_src_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: -1, top: 68, height: 36 }}
                />
                <ThemeText
                    text={t('navigator.embed.direct.info')}
                    textStyle="u_small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 286, fontSize: 14 }}
                    name="embed_info_direct_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: -1, top: 107, height: 50 }}
                />
                {/* Read-only in practice: it is here to be selected and copied, as the Flash field was. */}
                <TextInput
                    value={directLink}
                    onChange={() => undefined}
                    layout={{ position: 'absolute', left: 0, right: -5, top: 162, height: 24 }}
                />
            </Region>
        </Frame>
    );
};

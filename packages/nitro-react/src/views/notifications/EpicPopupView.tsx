import { TemplateWindow, useTemplateFrame } from '#base/theme';

/**
 * Flash's friend bar `HabboEpicPopupView.showPopup`: `habbo-friend-bar-com/epic_popup_frame_xml`,
 * centred, `content_static_bitmap` showing the packet's picture (`assetUri`); `close_button` and the
 * header close dispose it (`windowProc`).
 */
const TEMPLATE = 'habbo-friend-bar-com/epic_popup_frame_xml';

export interface EpicPopupViewProps {
    imageUri: string;
    onClose: () => void;
}

export const EpicPopupView = ({ imageUri, onClose }: EpicPopupViewProps) => {
    const frame = useTemplateFrame({ id: 'epic_popup_frame', centered: true, rememberPosition: false, onClose });

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={{
                content_static_bitmap: { asset: imageUri },
                close_button: { onPointerTap: onClose },
            }}
        />
    );
};

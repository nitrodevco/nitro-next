import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateWindow } from '#base/theme';

/**
 * A Vimeo screen - `VimeoDisplayWidget`, drawn from its `habbo-room-ui-com/vimeo_viewer_xml`
 * template, which `createWindow` builds and centres: the black `video_background` with its centred
 * `no_videos_label`, and the `video_id_editor` strip across its top shown for staff only, whose
 * `video_id` input sets the screen's video on Enter (`windowProcedure`'s `WKE_KEY_DOWN` 13,
 * `int(caption)`). The header's close hides it.
 *
 * The video itself is not played. Flash put a `VimeoPlayer` in `video_wrapper`, shown while the id
 * is above 0; the port draws into one Pixi canvas with no DOM to embed a player in, so the wrapper
 * stays hidden and - as `FurnitureYoutubeView` does - `no_videos_label` names the id of the video
 * in place of the player, and says there is none when there is not. The window keeps its opening
 * size: Flash's is resizable (minimum 400x350), which only mattered for the player's size.
 */
const VIMEO_TEMPLATE = 'habbo-room-ui-com/vimeo_viewer_xml';

/** `vimeo_viewer`'s `video_id` input as the layout leaves it - `createWindow` never overwrites it. */
const DEFAULT_VIDEO_ID_INPUT = '40036380';

export interface FurnitureVimeoViewProps {
    /** The video on the screen; 0 for none. */
    videoId: number;
    /** `hasSecurity(5)`: staff get the `video_id_editor` over the picture. */
    canEdit: boolean;
    /** Enter in the id input: the new id, already the number `int(caption)` makes of it. */
    onSetVideo: (videoId: number) => void;
    onClose: () => void;
}

export const FurnitureVimeoView = ({ videoId, canEdit, onSetVideo, onClose }: FurnitureVimeoViewProps) => {
    const t = useTranslation();
    const [ videoIdInput, setVideoIdInput ] = useState(DEFAULT_VIDEO_ID_INPUT);

    const bindings: TemplateBindings = {
        no_videos_label: { caption: (videoId > 0) ? String(videoId) : t('widget.furni.video_viewer.no_videos') },
        video_id_editor: { visible: canEdit },
        video_id: {
            caption: videoIdInput,
            onChange: setVideoIdInput,
            onEnter: () => onSetVideo(parseInt(videoIdInput, 10) | 0),
        },
    };

    return (
        <TemplateWindow
            id={VIMEO_TEMPLATE}
            bindings={bindings}
            frame={{ id: 'vimeo_viewer', centered: true, rememberPosition: false, onClose }}
        />
    );
};

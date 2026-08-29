import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `878_vimeo_viewer_xml` (layout "vimeo_viewer", 451x356) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VimeoViewerLayoutProps {
    captionNoVideosLabel?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    videoWrapper?: ReactNode;
    visibleVideoWrapper?: boolean;
}

export const VimeoViewerLayout = ({ captionNoVideosLabel, layout, onClose, videoWrapper, visibleVideoWrapper }: VimeoViewerLayoutProps) => {
    const t = useTranslation();
    const [ videoIdValue, setVideoIdValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="video_viewer"
            name="video_viewer"
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 451, height: 356, ...layout }}
        >
            <Region
                name="video_background"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 7, right: 13, top: 6, bottom: 48, justifyContent: 'center' }}
            >
                <Region
                    name="no_videos_label"
                    layout={{ position: 'absolute', width: 187, alignSelf: 'center', height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNoVideosLabel ?? t('widget.furni.video_viewer.no_videos')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
                {(visibleVideoWrapper ?? false) && (
                    <Region
                        name="video_wrapper"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        {videoWrapper}
                    </Region>
                )}
            </Region>
            <Border
                variant="3"
                name="video_id_editor"
                layout={{ position: 'absolute', left: 12, right: 18, top: 12, height: 19 }}
            >
                <Region layout={{ position: 'absolute', left: 1, width: 52, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text="Video id:"
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <TextInput
                    value={videoIdValue}
                    onChange={setVideoIdValue}
                    layout={{ position: 'absolute', left: 53, right: 2, top: 1, height: 17 }}
                />
            </Border>
        </Frame>
    );
};

import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ThemeText } from '#base/theme';

import { VideoViewerLayoutRightPane, VideoViewerLayoutRightPaneProps } from './VideoViewerLayoutRightPane';

/** Generated from `1013_video_viewer_xml` (layout "video_viewer", 738x356) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VideoViewerLayoutProps {
    captionNoVideosLabel?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    rightPane?: VideoViewerLayoutRightPaneProps;
    videoWrapper?: ReactNode;
    visibleVideoWrapper?: boolean;
}

export const VideoViewerLayout = ({ captionNoVideosLabel, layout, onClose, rightPane, videoWrapper, visibleVideoWrapper }: VideoViewerLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="video_viewer"
            name="video_viewer"
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 738, height: 356, minWidth: 400, minHeight: 350, ...layout }}
        >
            <Region
                name="video_background"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 7, width: 431, top: 6, bottom: 7, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionNoVideosLabel ?? t('widget.furni.video_viewer.no_videos')}
                    textStyle="text-style-il-regular-white"
                    name="no_videos_label"
                    layout={{ position: 'absolute', width: 187, alignSelf: 'center', height: 16 }}
                />
                {(visibleVideoWrapper ?? false) && (
                    <Region
                        name="video_wrapper"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        {videoWrapper}
                    </Region>
                )}
            </Region>
            <VideoViewerLayoutRightPane {...rightPane} />
        </Frame>
    );
};

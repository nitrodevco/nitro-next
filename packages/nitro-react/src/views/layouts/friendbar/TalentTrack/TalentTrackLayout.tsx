import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { TalentTrackLayoutPanorama, TalentTrackLayoutPanoramaProps } from './TalentTrackLayoutPanorama';
import { TalentTrackLayoutProgressContainer, TalentTrackLayoutProgressContainerProps } from './TalentTrackLayoutProgressContainer';

/** Generated from `23_talent_track_xml` (layout "talent_track", 1000x490) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TalentTrackLayoutProps {
    captionFrameSubtitle?: string;
    captionFrameTitle?: string;
    layout?: BoxLayout;
    onButtonTrackCitizenship?: () => void;
    onButtonTrackHelper?: () => void;
    onFrame?: () => void;
    panorama?: TalentTrackLayoutPanoramaProps;
    progressContainer?: TalentTrackLayoutProgressContainerProps;
    srcMaskLeft?: string;
    srcMaskRight?: string;
    visibleButtonTrackCitizenship?: boolean;
    visibleButtonTrackHelper?: boolean;
}

export const TalentTrackLayout = ({ captionFrameSubtitle, captionFrameTitle, layout, onButtonTrackCitizenship, onButtonTrackHelper, onFrame, panorama, progressContainer, srcMaskLeft, srcMaskRight, visibleButtonTrackCitizenship, visibleButtonTrackHelper }: TalentTrackLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 1000, height: 490, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 1000, top: 0, height: 490, minWidth: 100, minHeight: 50 }}>
                <Frame
                    variant="101"
                    id="frame"
                    name="frame"
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 1000, top: 22, height: 445, minWidth: 100 }}
                >
                    <TalentTrackLayoutPanorama {...panorama} />
                    {/* <scrollbar_horizontal> for panorama - rendered by that list's ScrollArea */}
                    <ThemeImage
                        name="mask_left"
                        src={srcMaskLeft ?? layoutImage('talent_mask_left.png')}
                        layout={{ position: 'absolute', left: 0, width: 24, top: 20, height: 280 }}
                    />
                    <ThemeImage
                        name="mask_right"
                        src={srcMaskRight ?? layoutImage('talent_mask_right.png')}
                        layout={{ position: 'absolute', right: 0, width: 24, top: 20, height: 280 }}
                    />
                    <TalentTrackLayoutProgressContainer {...progressContainer} />
                    {(visibleButtonTrackCitizenship ?? false) && (
                        <Button
                            variant="102"
                            name="button_track_citizenship"
                            onPointerTap={onButtonTrackCitizenship}
                            layout={{ position: 'absolute', left: 10, width: 36, top: 10, height: 32 }}
                        >
                            C
                        </Button>
                    )}
                    {(visibleButtonTrackHelper ?? false) && (
                        <Button
                            variant="102"
                            name="button_track_helper"
                            onPointerTap={onButtonTrackHelper}
                            layout={{ position: 'absolute', left: 51, width: 36, top: 10, height: 32 }}
                        >
                            H
                        </Button>
                    )}
                </Frame>
                <Region layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 53, minWidth: 100 }}>
                    <Region
                        name="frame_subtitle"
                        layout={{ position: 'absolute', left: 18, width: 179, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionFrameSubtitle ?? t('talent.track.helper.frame.subtitle')}
                            textStyle="text-style-il-frame-modal-title"
                            textOptions={{ fill: '#cccccc' }}
                        />
                    </Region>
                    <Region
                        name="frame_title"
                        layout={{ position: 'absolute', left: 18, width: 352, top: 16, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionFrameTitle ?? t('talent.track.helper.frame.title')}
                            textStyle="text-style-il-frame-modal-title"
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

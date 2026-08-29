import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `trackname_container` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutTracknameContainerItemProps {
    captionTrackNameText?: string;
    layout?: BoxLayout;
    srcIconDisc?: string;
    tintIconDisc?: string;
    visibleIconDisc?: boolean;
    visibleTrackNameText?: boolean;
}

export const SongdiskViewLayoutTracknameContainerItem = ({ captionTrackNameText, layout, srcIconDisc, tintIconDisc, visibleIconDisc, visibleTrackNameText }: SongdiskViewLayoutTracknameContainerItemProps) => {
    return (
        <Region
            name="trackname_container"
            layout={{ width: 170, height: 14, flexShrink: 0, ...layout }}
        >
            {(visibleIconDisc ?? true) && (
                <ThemeImage
                    name="icon_disc"
                    src={srcIconDisc ?? layoutImage('jb_icon_disc.png')}
                    tint={tintIconDisc}
                    layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 14 }}
                />
            )}
            {(visibleTrackNameText ?? true) && (
                <Region
                    name="track_name_text"
                    layout={{ position: 'absolute', left: 20, width: 150, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTrackNameText ?? ''}
                        textStyle="text-style-bold"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 150 }}
                    />
                </Region>
            )}
        </Region>
    );
};

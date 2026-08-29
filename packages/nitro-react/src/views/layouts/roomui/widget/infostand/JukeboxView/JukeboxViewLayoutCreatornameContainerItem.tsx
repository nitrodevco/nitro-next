import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `creatorname_container` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutCreatornameContainerItemProps {
    captionTrackCreatorText?: string;
    layout?: BoxLayout;
    srcIconComposer?: string;
    tintIconComposer?: string;
    visibleIconComposer?: boolean;
    visibleTrackCreatorText?: boolean;
}

export const JukeboxViewLayoutCreatornameContainerItem = ({ captionTrackCreatorText, layout, srcIconComposer, tintIconComposer, visibleIconComposer, visibleTrackCreatorText }: JukeboxViewLayoutCreatornameContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="creatorname_container"
            layout={{ width: 170, height: 15, flexShrink: 0, ...layout }}
        >
            {(visibleIconComposer ?? true) && (
                <ThemeImage
                    name="icon_composer"
                    src={srcIconComposer ?? layoutImage('jb_icon_composer.png')}
                    tint={tintIconComposer}
                    layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 14 }}
                />
            )}
            {(visibleTrackCreatorText ?? true) && (
                <Region
                    name="track_creator_text"
                    layout={{ position: 'absolute', left: 20, width: 150, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTrackCreatorText ?? t('infostand.jukebox.text.creator')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 150 }}
                    />
                </Region>
            )}
        </Region>
    );
};

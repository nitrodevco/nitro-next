import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `now_playing_text` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutNowPlayingTextItemProps {
    captionNowPlayingText?: string;
    layout?: BoxLayout;
}

export const JukeboxViewLayoutNowPlayingTextItem = ({ captionNowPlayingText, layout }: JukeboxViewLayoutNowPlayingTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionNowPlayingText ?? t('infostand.jukebox.text.not.playing')}
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            name="now_playing_text"
            verticalAlign="top"
            layout={{ width: 170, height: 14, flexShrink: 0, ...layout }}
        />
    );
};

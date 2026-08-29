import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/**
 * Catalog widget `songDiskProductViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutSoundmachine_1627Layout); each passes its own placement through `layout`.
 */
/** Named region `playPreviewContainer` of SongDiskProductViewWidget2 - configured through the parent's `playPreviewContainer` prop. */
export interface SongDiskProductViewWidget2PlayPreviewContainerProps {
    captionPlayPreviewText?: string;
    layout?: BoxLayout;
    onListen?: () => void;
}

export const SongDiskProductViewWidget2PlayPreviewContainer = ({ captionPlayPreviewText, layout, onListen }: SongDiskProductViewWidget2PlayPreviewContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="playPreviewContainer"
            params={16}
            layout={{ position: 'absolute', left: 7, width: 175, top: 195, height: 36, ...layout }}
        >
            <Border
                variant="2"
                params={16}
                tintColor="#cccccc"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 36 }}
            />
            <Button
                variant="3"
                name="listen"
                params={131089}
                onPointerTap={onListen}
                layout={{ position: 'absolute', left: 102, width: 66, top: 8, height: 22, minWidth: 66, maxWidth: 66 }}
            >
                {t('play_preview_button')}
            </Button>
            <Region
                name="play_preview_text"
                params={16}
                layout={{ position: 'absolute', left: 9, width: 64, top: 11, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayPreviewText ?? t('play_preview')}
                    textStyle="text-style-u-small"
                />
            </Region>
        </Region>
    );
};

/** Named region `songDiskProductViewWidget` of SongDiskProductViewWidget2 - configured through the parent's `songDiskProductViewWidget` prop. */
export interface SongDiskProductViewWidget2Props {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    captionCtlgSongLength?: string;
    layout?: BoxLayout;
    playPreviewContainer?: SongDiskProductViewWidget2PlayPreviewContainerProps;
    srcCtlgTeaserimg1?: string;
}

export const SongDiskProductViewWidget2 = ({ captionCtlgDescription, captionCtlgProductName, captionCtlgSongLength, layout, playPreviewContainer, srcCtlgTeaserimg1 }: SongDiskProductViewWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="songDiskProductViewWidget"
            tags={[ 'EMBEDDED' ]}
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <Region
                name="ctlg_product_name"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 175, top: 16, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgProductName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 175 }}
                />
            </Region>
            <Region
                name="ctlg_description"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 62, top: 34, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="ctlg_song_length"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 31, top: 53, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSongLength ?? '00:00'}
                    textStyle="text-style-u-small"
                />
            </Region>
            <SongDiskProductViewWidget2PlayPreviewContainer {...playPreviewContainer} />
        </Region>
    );
};

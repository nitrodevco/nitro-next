import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `songDiskProductViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutSoundmachine_1654Layout); each passes its own placement through `layout`.
 */
/** Named region `songDiskProductViewWidget` of SongDiskProductViewWidget - configured through the parent's `songDiskProductViewWidget` prop. */
export interface SongDiskProductViewWidgetProps extends CatalogWidgetFlags {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    captionCtlgSongLength?: string;
    captionPlayPreviewText?: string;
    layout?: BoxLayout;
    onListen?: () => void;
    srcCtlgTeaserimg1?: string;
}

export const SongDiskProductViewWidget = ({ captionCtlgDescription, captionCtlgProductName, captionCtlgSongLength, captionPlayPreviewText, layout, onListen, srcCtlgTeaserimg1 }: SongDiskProductViewWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="songDiskProductViewWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 176 }}
            />
            <Region
                name="ctlg_product_name"
                layout={{ position: 'absolute', left: 0, width: 175, top: 176, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgProductName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 175 }}
                />
            </Region>
            <Region
                name="ctlg_description"
                layout={{ position: 'absolute', left: 0, width: 62, top: 194, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="ctlg_song_length"
                layout={{ position: 'absolute', left: 0, width: 31, top: 213, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSongLength ?? '00:00'}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="playPreviewContainer"
                layout={{ position: 'absolute', left: 0, width: 175, top: 235, height: 36 }}
            >
                <Border
                    variant="2"
                    tintColor="#cccccc"
                    layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 36 }}
                />
                <Button
                    variant="3"
                    name="listen"
                    onPointerTap={onListen}
                    layout={{ position: 'absolute', left: 102, width: 66, top: 8, height: 22, minWidth: 66, maxWidth: 66 }}
                >
                    {t('play_preview_button')}
                </Button>
                <Region
                    name="play_preview_text"
                    layout={{ position: 'absolute', left: 9, width: 85, top: 11, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionPlayPreviewText ?? t('play_preview')}
                        textStyle="text-style-u-small"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

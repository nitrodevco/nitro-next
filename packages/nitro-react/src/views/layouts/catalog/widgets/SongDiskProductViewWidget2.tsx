import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `songDiskProductViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutSoundmachine_1627Layout); each passes its own placement through `layout`.
 */
/** Named region `songDiskProductViewWidget` of SongDiskProductViewWidget2 - configured through the parent's `songDiskProductViewWidget` prop. */
export interface SongDiskProductViewWidget2Props extends CatalogWidgetFlags {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    captionCtlgSongLength?: string;
    captionPlayPreviewText?: string;
    layout?: BoxLayout;
    onListen?: () => void;
    srcCtlgTeaserimg1?: string;
    tintCtlgTeaserimg1?: string;
}

export const SongDiskProductViewWidget2 = ({ captionCtlgDescription, captionCtlgProductName, captionCtlgSongLength, captionPlayPreviewText, layout, onListen, srcCtlgTeaserimg1, tintCtlgTeaserimg1 }: SongDiskProductViewWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="songDiskProductViewWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
                tint={tintCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <ThemeText
                text={captionCtlgProductName ?? t('lorem.title')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 175 }}
                name="ctlg_product_name"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, width: 175, top: 16, height: 17 }}
            />
            <ThemeText
                text={captionCtlgDescription ?? t('lorem.title')}
                textStyle="text-style-u-small"
                name="ctlg_description"
                layout={{ position: 'absolute', left: 10, width: 62, top: 34, height: 15 }}
            />
            <ThemeText
                text={captionCtlgSongLength ?? '00:00'}
                textStyle="text-style-u-small"
                name="ctlg_song_length"
                layout={{ position: 'absolute', left: 10, width: 31, top: 53, height: 15 }}
            />
            <Region
                name="playPreviewContainer"
                layout={{ position: 'absolute', left: 7, width: 175, top: 195, height: 36 }}
            >
                <Border
                    variant="2"
                    tintColor="#cccccc"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Button
                    variant="3"
                    name="listen"
                    onPointerTap={onListen}
                    layout={{ position: 'absolute', left: 102, width: 66, top: 8, height: 22, minWidth: 66, maxWidth: 66 }}
                >
                    {t('play_preview_button')}
                </Button>
                <ThemeText
                    text={captionPlayPreviewText ?? t('play_preview')}
                    textStyle="text-style-u-small"
                    name="play_preview_text"
                    layout={{ position: 'absolute', left: 9, width: 64, top: 11, height: 15 }}
                />
            </Region>
        </Region>
    );
};

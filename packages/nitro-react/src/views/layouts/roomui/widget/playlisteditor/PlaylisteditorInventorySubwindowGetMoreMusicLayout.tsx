import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1007_playlisteditor_inventory_subwindow_get_more_music_xml` (layout "inventory_subwindow_get_more_music", 278x110) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorInventorySubwindowGetMoreMusicLayoutProps {
    layout?: BoxLayout;
    onOpenCatalogButton?: () => void;
    srcGetMoreMusicBackgroundImage?: string;
    tintGetMoreMusicBackgroundImage?: string;
}

export const PlaylisteditorInventorySubwindowGetMoreMusicLayout = ({ layout, onOpenCatalogButton, srcGetMoreMusicBackgroundImage, tintGetMoreMusicBackgroundImage }: PlaylisteditorInventorySubwindowGetMoreMusicLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 278, height: 110, ...layout }}>
            <Region
                name="get_more_music_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="get_more_music_background_image"
                    src={srcGetMoreMusicBackgroundImage}
                    tint={tintGetMoreMusicBackgroundImage}
                    layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 110 }}
                />
                <ThemeText
                    text={t('playlist.editor.text.get.more.music')}
                    textStyle="text-style-bold"
                    layout={{ position: 'absolute', left: 15, width: 236, top: 12, height: 19 }}
                />
                <ThemeText
                    text={t('playlist.editor.text.you.have.no.songdisks.available')}
                    layout={{ position: 'absolute', left: 15, width: 285, top: 35, height: 17 }}
                />
                <ThemeText
                    text={t('playlist.editor.text.you.can.buy.some.from.the.catalogue')}
                    layout={{ position: 'absolute', left: 15, width: 319, alignSelf: 'center', marginTop: 3.5, marginBottom: -3.5, height: 17 }}
                />
                <ButtonThick
                    variant="3"
                    name="open_catalog_button"
                    onPointerTap={onOpenCatalogButton}
                    layout={{ position: 'absolute', left: 15, width: 233, bottom: 8, height: 29 }}
                >
                    {t('playlist.editor.button.open.catalogue')}
                </ButtonThick>
            </Region>
        </Region>
    );
};

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1007_playlisteditor_inventory_subwindow_get_more_music_xml` (layout "inventory_subwindow_get_more_music", 278x110) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorInventorySubwindowGetMoreMusicLayoutProps {
    getMoreMusicContainer?: PlaylisteditorInventorySubwindowGetMoreMusicLayoutGetMoreMusicContainerProps;
    layout?: BoxLayout;
}

export const PlaylisteditorInventorySubwindowGetMoreMusicLayout = ({ getMoreMusicContainer, layout }: PlaylisteditorInventorySubwindowGetMoreMusicLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 278, height: 110, ...layout }}>
            <PlaylisteditorInventorySubwindowGetMoreMusicLayoutGetMoreMusicContainer {...getMoreMusicContainer} />
        </Region>
    );
};

/** Named region `get_more_music_container` of PlaylisteditorInventorySubwindowGetMoreMusicLayout - configured through the parent's `getMoreMusicContainer` prop. */
export interface PlaylisteditorInventorySubwindowGetMoreMusicLayoutGetMoreMusicContainerProps {
    layout?: BoxLayout;
    onOpenCatalogButton?: () => void;
    srcGetMoreMusicBackgroundImage?: string;
}

export const PlaylisteditorInventorySubwindowGetMoreMusicLayoutGetMoreMusicContainer = ({ layout, onOpenCatalogButton, srcGetMoreMusicBackgroundImage }: PlaylisteditorInventorySubwindowGetMoreMusicLayoutGetMoreMusicContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="get_more_music_container"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 110, ...layout }}
        >
            <ThemeImage
                name="get_more_music_background_image"
                params={16}
                src={srcGetMoreMusicBackgroundImage}
                layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 110 }}
            />
            <Region
                params={16}
                layout={{ position: 'absolute', left: 15, width: 236, top: 12, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('playlist.editor.text.get.more.music')}
                    textStyle="text-style-bold"
                />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 15, width: 285, top: 35, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={t('playlist.editor.text.you.have.no.songdisks.available')} />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 15, width: 319, top: 50, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={t('playlist.editor.text.you.can.buy.some.from.the.catalogue')} />
            </Region>
            <ButtonThick
                variant="3"
                name="open_catalog_button"
                params={131089}
                onPointerTap={onOpenCatalogButton}
                layout={{ position: 'absolute', left: 15, width: 233, top: 73, height: 29 }}
            >
                {t('playlist.editor.button.open.catalogue')}
            </ButtonThick>
        </Region>
    );
};

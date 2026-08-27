import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1627_layout_soundmachine_xml` (layout "ctlg_soundmachine", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSoundmachine_1627LayoutProps {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    captionCtlgSelectproduct?: string;
    captionCtlgSongLength?: string;
    captionPlayPreviewText?: string;
    layout?: BoxLayout;
    onListen?: () => void;
    srcCtlgTeaserimg1?: string;
}

export const LayoutSoundmachine_1627Layout = ({ captionCtlgDescription, captionCtlgProductName, captionCtlgSelectproduct, captionCtlgSongLength, captionPlayPreviewText, layout, onListen, srcCtlgTeaserimg1 }: LayoutSoundmachine_1627LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_soundmachine"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="ctlg_selectproduct"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 6, width: 130, top: 130, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                        textStyle="text-style-u-small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                    />
                </Region>
                <Region
                    name="itemGridWidget"
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 180 }}
                />
                <Region
                    name="songDiskProductViewWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
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
                    <Region
                        name="playPreviewContainer"
                        params={16}
                        layout={{ position: 'absolute', left: 7, width: 175, top: 195, height: 36 }}
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
                </Region>
                <Region
                    name="specialInfoWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 110, width: 142, top: 28, height: 73 }}
                />
                <Region
                    name="purchaseWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
            </Region>
        </Region>
    );
};

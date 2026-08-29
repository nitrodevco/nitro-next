import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1627_layout_soundmachine_xml` (layout "ctlg_soundmachine", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSoundmachine_1627LayoutProps {
    ctlgSoundmachine?: LayoutSoundmachine_1627LayoutCtlgSoundmachineProps;
    layout?: BoxLayout;
}

export const LayoutSoundmachine_1627Layout = ({ ctlgSoundmachine, layout }: LayoutSoundmachine_1627LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSoundmachine_1627LayoutCtlgSoundmachine {...ctlgSoundmachine} />
        </Region>
    );
};

/** Named region `itemGridWidget` of LayoutSoundmachine_1627Layout - configured through the parent's `itemGridWidget` prop. */
export interface LayoutSoundmachine_1627LayoutItemGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSoundmachine_1627LayoutItemGridWidget = ({ layout }: LayoutSoundmachine_1627LayoutItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 35, ...layout }}
        />
    );
};

/** Named region `playPreviewContainer` of LayoutSoundmachine_1627Layout - configured through the parent's `playPreviewContainer` prop. */
export interface LayoutSoundmachine_1627LayoutPlayPreviewContainerProps {
    captionPlayPreviewText?: string;
    layout?: BoxLayout;
    onListen?: () => void;
}

export const LayoutSoundmachine_1627LayoutPlayPreviewContainer = ({ captionPlayPreviewText, layout, onListen }: LayoutSoundmachine_1627LayoutPlayPreviewContainerProps) => {
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

/** Named region `songDiskProductViewWidget` of LayoutSoundmachine_1627Layout - configured through the parent's `songDiskProductViewWidget` prop. */
export interface LayoutSoundmachine_1627LayoutSongDiskProductViewWidgetProps {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    captionCtlgSongLength?: string;
    layout?: BoxLayout;
    playPreviewContainer?: LayoutSoundmachine_1627LayoutPlayPreviewContainerProps;
    srcCtlgTeaserimg1?: string;
}

export const LayoutSoundmachine_1627LayoutSongDiskProductViewWidget = ({ captionCtlgDescription, captionCtlgProductName, captionCtlgSongLength, layout, playPreviewContainer, srcCtlgTeaserimg1 }: LayoutSoundmachine_1627LayoutSongDiskProductViewWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="songDiskProductViewWidget"
            tags={[ 'EMBEDDED' ]}
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240, ...layout }}
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
            <LayoutSoundmachine_1627LayoutPlayPreviewContainer {...playPreviewContainer} />
        </Region>
    );
};

/** Named region `specialInfoWidget` of LayoutSoundmachine_1627Layout - configured through the parent's `specialInfoWidget` prop. */
export interface LayoutSoundmachine_1627LayoutSpecialInfoWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSoundmachine_1627LayoutSpecialInfoWidget = ({ layout }: LayoutSoundmachine_1627LayoutSpecialInfoWidgetProps) => {
    return (
        <Region
            name="specialInfoWidget"
            params={16}
            layout={{ position: 'absolute', left: 110, width: 142, top: 28, height: 73, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutSoundmachine_1627Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutSoundmachine_1627LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSoundmachine_1627LayoutPurchaseWidget = ({ layout }: LayoutSoundmachine_1627LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30, ...layout }}
        />
    );
};

/** Named region `ctlg_soundmachine` of LayoutSoundmachine_1627Layout - configured through the parent's `ctlgSoundmachine` prop. */
export interface LayoutSoundmachine_1627LayoutCtlgSoundmachineProps {
    captionCtlgSelectproduct?: string;
    itemGridWidget?: LayoutSoundmachine_1627LayoutItemGridWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: LayoutSoundmachine_1627LayoutPurchaseWidgetProps;
    songDiskProductViewWidget?: LayoutSoundmachine_1627LayoutSongDiskProductViewWidgetProps;
    specialInfoWidget?: LayoutSoundmachine_1627LayoutSpecialInfoWidgetProps;
}

export const LayoutSoundmachine_1627LayoutCtlgSoundmachine = ({ captionCtlgSelectproduct, itemGridWidget, layout, purchaseWidget, songDiskProductViewWidget, specialInfoWidget }: LayoutSoundmachine_1627LayoutCtlgSoundmachineProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_soundmachine"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
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
            <LayoutSoundmachine_1627LayoutItemGridWidget {...itemGridWidget} />
            <LayoutSoundmachine_1627LayoutSongDiskProductViewWidget {...songDiskProductViewWidget} />
            <LayoutSoundmachine_1627LayoutSpecialInfoWidget {...specialInfoWidget} />
            <LayoutSoundmachine_1627LayoutPurchaseWidget {...purchaseWidget} />
        </Region>
    );
};

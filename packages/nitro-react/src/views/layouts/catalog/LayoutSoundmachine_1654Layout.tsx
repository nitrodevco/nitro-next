import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1654_layout_soundmachine_xml` (layout "ctlg_soundmachine", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSoundmachine_1654LayoutProps {
    ctlgSoundmachine?: LayoutSoundmachine_1654LayoutCtlgSoundmachineProps;
    layout?: BoxLayout;
}

export const LayoutSoundmachine_1654Layout = ({ ctlgSoundmachine, layout }: LayoutSoundmachine_1654LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSoundmachine_1654LayoutCtlgSoundmachine {...ctlgSoundmachine} />
        </Region>
    );
};

/** Named region `itemGridWidget` of LayoutSoundmachine_1654Layout - configured through the parent's `itemGridWidget` prop. */
export interface LayoutSoundmachine_1654LayoutItemGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSoundmachine_1654LayoutItemGridWidget = ({ layout }: LayoutSoundmachine_1654LayoutItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            params={16}
            layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 275, ...layout }}
        />
    );
};

/** Named region `playPreviewContainer` of LayoutSoundmachine_1654Layout - configured through the parent's `playPreviewContainer` prop. */
export interface LayoutSoundmachine_1654LayoutPlayPreviewContainerProps {
    captionPlayPreviewText?: string;
    layout?: BoxLayout;
    onListen?: () => void;
}

export const LayoutSoundmachine_1654LayoutPlayPreviewContainer = ({ captionPlayPreviewText, layout, onListen }: LayoutSoundmachine_1654LayoutPlayPreviewContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="playPreviewContainer"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 175, top: 235, height: 36, ...layout }}
        >
            <Border
                variant="2"
                params={16}
                tintColor="#cccccc"
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
                layout={{ position: 'absolute', left: 9, width: 85, top: 11, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPlayPreviewText ?? t('play_preview')}
                    textStyle="text-style-u-small"
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `songDiskProductViewWidget` of LayoutSoundmachine_1654Layout - configured through the parent's `songDiskProductViewWidget` prop. */
export interface LayoutSoundmachine_1654LayoutSongDiskProductViewWidgetProps {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    captionCtlgSongLength?: string;
    layout?: BoxLayout;
    playPreviewContainer?: LayoutSoundmachine_1654LayoutPlayPreviewContainerProps;
    srcCtlgTeaserimg1?: string;
}

export const LayoutSoundmachine_1654LayoutSongDiskProductViewWidget = ({ captionCtlgDescription, captionCtlgProductName, captionCtlgSongLength, layout, playPreviewContainer, srcCtlgTeaserimg1 }: LayoutSoundmachine_1654LayoutSongDiskProductViewWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="songDiskProductViewWidget"
            tags={[ 'EMBEDDED' ]}
            params={16}
            layout={{ position: 'absolute', left: 180, width: 175, top: 154, height: 274, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 176 }}
            />
            <Region
                name="ctlg_product_name"
                params={16}
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
                params={16}
                layout={{ position: 'absolute', left: 0, width: 62, top: 194, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="ctlg_song_length"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 31, top: 213, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSongLength ?? '00:00'}
                    textStyle="text-style-u-small"
                />
            </Region>
            <LayoutSoundmachine_1654LayoutPlayPreviewContainer {...playPreviewContainer} />
        </Region>
    );
};

/** Named region `specialInfoWidget` of LayoutSoundmachine_1654Layout - configured through the parent's `specialInfoWidget` prop. */
export interface LayoutSoundmachine_1654LayoutSpecialInfoWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSoundmachine_1654LayoutSpecialInfoWidget = ({ layout }: LayoutSoundmachine_1654LayoutSpecialInfoWidgetProps) => {
    return (
        <Region
            name="specialInfoWidget"
            params={16}
            layout={{ position: 'absolute', left: 180, width: 142, top: 118, height: 73, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutSoundmachine_1654Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutSoundmachine_1654LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSoundmachine_1654LayoutPurchaseWidget = ({ layout }: LayoutSoundmachine_1654LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30, ...layout }}
        />
    );
};

/** Named region `ctlg_soundmachine` of LayoutSoundmachine_1654Layout - configured through the parent's `ctlgSoundmachine` prop. */
export interface LayoutSoundmachine_1654LayoutCtlgSoundmachineProps {
    captionCtlgSelectproduct?: string;
    itemGridWidget?: LayoutSoundmachine_1654LayoutItemGridWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: LayoutSoundmachine_1654LayoutPurchaseWidgetProps;
    songDiskProductViewWidget?: LayoutSoundmachine_1654LayoutSongDiskProductViewWidgetProps;
    specialInfoWidget?: LayoutSoundmachine_1654LayoutSpecialInfoWidgetProps;
}

export const LayoutSoundmachine_1654LayoutCtlgSoundmachine = ({ captionCtlgSelectproduct, itemGridWidget, layout, purchaseWidget, songDiskProductViewWidget, specialInfoWidget }: LayoutSoundmachine_1654LayoutCtlgSoundmachineProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_soundmachine"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                params={16}
                layout={{ position: 'absolute', left: 6, width: 130, top: 130, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                />
            </Region>
            <LayoutSoundmachine_1654LayoutItemGridWidget {...itemGridWidget} />
            <LayoutSoundmachine_1654LayoutSongDiskProductViewWidget {...songDiskProductViewWidget} />
            <LayoutSoundmachine_1654LayoutSpecialInfoWidget {...specialInfoWidget} />
            <LayoutSoundmachine_1654LayoutPurchaseWidget {...purchaseWidget} />
        </Region>
    );
};

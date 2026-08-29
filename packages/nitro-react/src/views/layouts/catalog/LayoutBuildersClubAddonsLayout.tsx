import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1673_layout_builders_club_addons_xml` (layout "layout_builders_club_addons", 360x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBuildersClubAddonsLayoutProps {
    ctlgBuildersClubAddons?: LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddonsProps;
    layout?: BoxLayout;
}

export const LayoutBuildersClubAddonsLayout = ({ ctlgBuildersClubAddons, layout }: LayoutBuildersClubAddonsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 508, ...layout }}>
            <LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddons {...ctlgBuildersClubAddons} />
        </Region>
    );
};

/** Named region `addons_list` of LayoutBuildersClubAddonsLayout - configured through the parent's `addonsList` prop. */
export interface LayoutBuildersClubAddonsLayoutAddonsListProps {
    captionDiamondsPrice?: string;
    captionItemHeader?: string;
    captionItemPrice?: string;
    layout?: BoxLayout;
    onItemBuy?: () => void;
    srcDiamondsIcon?: string;
}

export const LayoutBuildersClubAddonsLayoutAddonsList = ({ captionDiamondsPrice, captionItemHeader, captionItemPrice, layout, onItemBuy, srcDiamondsIcon }: LayoutBuildersClubAddonsLayoutAddonsListProps) => {
    const t = useTranslation();

    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 287, top: 0, bottom: 20, ...layout }}
        >
            <Region
                name="addons_list"
                params={2064}
                layout={{ flexDirection: 'column', gap: 12, width: '100%' }}
            >
                <Border
                    variant="2"
                    params={16}
                    tintColor="#d7d7cf"
                    layout={{ width: 269, height: 77, flexShrink: 0 }}
                >
                    <Border
                        variant="3"
                        params={16}
                        tintColor="#afafa9"
                        layout={{ position: 'absolute', left: 5, width: 260, top: 5, height: 25 }}
                    >
                        <ThemeImage
                            params={16}
                            src="${image.library.url}/catalogue/icon_193.png"
                            layout={{ position: 'absolute', left: 8, width: 15, top: 5, height: 15 }}
                        />
                        <Region
                            name="item_header"
                            params={16}
                            layout={{ position: 'absolute', left: 33, width: 88, top: 2, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionItemHeader ?? 'item name'}
                                textStyle="text-style-u-headline-medium"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Border>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 9, width: 105, top: 45, height: 24, flexDirection: 'row', gap: 3 }}
                    >
                        <Region
                            name="item_price"
                            params={16}
                            layout={{ width: 28, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionItemPrice ?? '999'}
                                textStyle="text-style-u-headline-small"
                            />
                        </Region>
                        <ThemeImage
                            params={16}
                            src={layoutImage('pursearea_credits_icon.png')}
                            layout={{ width: 15, height: 15, flexShrink: 0 }}
                        />
                        <Region
                            name="diamonds_price"
                            params={16}
                            visible={false}
                            layout={{ width: 28, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDiamondsPrice ?? '999'}
                                textStyle="text-style-u-headline-small"
                            />
                        </Region>
                        <Region
                            visible={false}
                            layout={{ width: 15, height: 15, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="diamonds_icon"
                                params={16}
                                src={srcDiamondsIcon ?? layoutImage('pursearea_diamond_icon.png')}
                                layout={{ width: 15, height: 15, flexShrink: 0 }}
                            />
                        </Region>
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="item_buy"
                        params={393233}
                        tintColor="#0a9bc5"
                        onPointerTap={onItemBuy}
                        layout={{ position: 'absolute', right: 4, width: 142, top: 37, height: 35, minWidth: 40 }}
                    >
                        {t('buy')}
                    </ButtonThick>
                </Border>
            </Region>
        </ScrollArea>
    );
};

/** Named region `builderAddonsWidget` of LayoutBuildersClubAddonsLayout - configured through the parent's `builderAddonsWidget` prop. */
export interface LayoutBuildersClubAddonsLayoutBuilderAddonsWidgetProps {
    addonsList?: LayoutBuildersClubAddonsLayoutAddonsListProps;
    captionTrialWarning?: string;
    layout?: BoxLayout;
}

export const LayoutBuildersClubAddonsLayoutBuilderAddonsWidget = ({ addonsList, captionTrialWarning, layout }: LayoutBuildersClubAddonsLayoutBuilderAddonsWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="builderAddonsWidget"
            params={2064}
            layout={{ position: 'absolute', left: 14, width: 300, top: 108, bottom: 20, ...layout }}
        >
            <LayoutBuildersClubAddonsLayoutAddonsList {...addonsList} />
            <Region
                name="trial_warning"
                params={1040}
                layout={{ position: 'absolute', left: 0, width: 193, bottom: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrialWarning ?? t('builder.addon_page.warning.trial')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#cc0000' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `ctlg_builders_club_addons` of LayoutBuildersClubAddonsLayout - configured through the parent's `ctlgBuildersClubAddons` prop. */
export interface LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddonsProps {
    builderAddonsWidget?: LayoutBuildersClubAddonsLayoutBuilderAddonsWidgetProps;
    captionCtlgDescription?: string;
    layout?: BoxLayout;
}

export const LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddons = ({ builderAddonsWidget, captionCtlgDescription, layout }: LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddonsProps) => {
    return (
        <Region
            name="ctlg_builders_club_addons"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_description"
                params={1}
                layout={{ position: 'absolute', left: 15, width: 276, top: 28, height: 80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? '<b>Formatted</b> text'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 276 }}
                />
            </Region>
            <ThemeImage
                params={16}
                src="${image.library.url}catalogue/bc_bottom.png"
                layout={{ position: 'absolute', left: 290, width: 72, top: 316, height: 90 }}
            />
            <LayoutBuildersClubAddonsLayoutBuilderAddonsWidget {...builderAddonsWidget} />
            <ThemeImage
                params={16}
                src="${image.library.url}catalogue/bc_top.png"
                layout={{ position: 'absolute', left: 249, width: 111, top: 21, height: 282 }}
            />
        </Region>
    );
};

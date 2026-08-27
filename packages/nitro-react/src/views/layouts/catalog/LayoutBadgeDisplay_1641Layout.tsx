import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1641_layout_badge_display_xml` (layout "ctlg_badge_display", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBadgeDisplay_1641LayoutProps {
    captionCtlgSelectbadge?: string;
    captionCtlgSelectproduct?: string;
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1641Layout = ({ captionCtlgSelectbadge, captionCtlgSelectproduct, layout }: LayoutBadgeDisplay_1641LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_badgedisplay"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="ctlg_selectproduct"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 107, top: 130, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <Region
                    name="productViewWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 180, width: 175, top: 150, height: 248 }}
                />
                <Region
                    name="specialInfoWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 169, width: 142, top: 118, height: 73 }}
                />
                <Region
                    name="purchaseWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
                <Region
                    name="itemGridWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 73 }}
                />
                <Region
                    name="limitedItemWidget"
                    layout={{ position: 'absolute', left: 181, width: 170, top: 400, height: 30 }}
                >
                    <WidgetSlot
                        widgetType="limited_item_overlay_supply"
                        name="unique_item_overlay_container"
                        params={147472}
                        layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 40 }}
                    />
                </Region>
                <Region
                    name="ctlg_selectbadge"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 100, top: 227, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSelectbadge ?? t('catalog_selectbadge')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <Region
                    name="userBadgeSelectorWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 4, width: 170, top: 242, height: 175 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 195 }}
                    >
                        <Region
                            name="badgeGrid"
                            params={16}
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
                        />
                    </ScrollArea>
                </Region>
            </Region>
        </Region>
    );
};

import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1669_layout_badge_display_xml` (layout "ctlg_badge_display", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBadgeDisplay_1669LayoutProps {
    captionCtlgSelectbadge?: string;
    captionCtlgSelectproduct?: string;
    captionSearchPlaceholder?: string;
    layout?: BoxLayout;
    onCancelSearchBtn?: () => void;
    visibleCancelSearchBtn?: boolean;
}

export const LayoutBadgeDisplay_1669Layout = ({ captionCtlgSelectbadge, captionCtlgSelectproduct, captionSearchPlaceholder, layout, onCancelSearchBtn, visibleCancelSearchBtn }: LayoutBadgeDisplay_1669LayoutProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_badgedisplay"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <Region
                    name="ctlg_selectproduct"
                    params={1040}
                    visible={false}
                    layout={{ position: 'absolute', left: 5, width: 107, bottom: 40, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <Region
                    name="productViewWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                />
                <Region
                    name="specialInfoWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 99, width: 142, top: 13, height: 73 }}
                />
                <Region
                    name="purchaseWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
                />
                <Region
                    name="itemGridWidget"
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 95, top: 245, bottom: 40 }}
                />
                <Region
                    name="limitedItemWidget"
                    layout={{ position: 'absolute', left: 180, width: 170, top: 20, height: 30 }}
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
                    params={1040}
                    visible={false}
                    layout={{ position: 'absolute', left: 190, width: 100, bottom: 44, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSelectbadge ?? t('catalog_selectbadge')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <Region
                    name="userBadgeSelectorWidget"
                    params={2064}
                    layout={{ position: 'absolute', left: 105, width: 255, top: 245, bottom: 40 }}
                >
                    <Border
                        variant="105"
                        name="search_input_border"
                        params={144}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26 }}
                    >
                        <TextInput
                            value={searchInputValue}
                            onChange={setSearchInputValue}
                            maxLength={40}
                            layout={{ position: 'absolute', left: 6, right: 78, top: 3, height: 19, minWidth: 171, maxWidth: 171 }}
                        />
                        <Region
                            name="search_placeholder"
                            params={16}
                            layout={{ position: 'absolute', left: 6, width: 83, top: 3, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSearchPlaceholder ?? t('generic.search')}
                                textOptions={{ fill: '#666666' }}
                            />
                        </Region>
                        <Region
                            name="cancel_search_btn"
                            params={81}
                            visible={visibleCancelSearchBtn ?? false}
                            onPointerTap={onCancelSearchBtn}
                            cursor="pointer"
                            layout={{ position: 'absolute', right: 4, width: 19, top: 3, height: 19 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('icons_close.png')}
                                layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 12 }}
                            />
                        </Region>
                    </Border>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 30, bottom: 0 }}
                    >
                        <Region
                            name="badgeGrid"
                            params={2192}
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
                        />
                    </ScrollArea>
                </Region>
            </Region>
        </Region>
    );
};

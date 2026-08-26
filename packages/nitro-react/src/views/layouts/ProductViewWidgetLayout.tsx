import { BoxLayout, ContainerButton, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1555_productViewWidget_xml` (layout "productViewWidget", 360x348) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProductViewWidgetLayoutProps {
    layout?: BoxLayout;
    onRotateAvatarLeft?: () => void;
    onRotateAvatarRight?: () => void;
}

export const ProductViewWidgetLayout = ({ layout, onRotateAvatarLeft, onRotateAvatarRight }: ProductViewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 348, ...layout }}>
            <Region
                name="main_container"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 348 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    params={2192}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 348 }}
                />
                <Region
                    name="room_canvas_container"
                    params={2193}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 348 }}
                >
                    <Region
                        name="room_canvas"
                        params={2208}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 348 }}
                    />
                </Region>
                <ContainerButton
                    variant="5"
                    name="rotate_avatar_left"
                    params={65}
                    onPointerTap={onRotateAvatarLeft}
                    layout={{ position: 'absolute', left: 300, width: 25, top: 8, height: 24 }}
                >
                    <Icon
                        variant="2"
                        params={16}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 7, width: 30, top: 7, height: 30 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="5"
                    name="rotate_avatar_right"
                    params={65}
                    onPointerTap={onRotateAvatarRight}
                    layout={{ position: 'absolute', left: 329, width: 25, top: 8, height: 24 }}
                >
                    <Icon
                        variant="3"
                        params={16}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 9, width: 28, top: 7, height: 29 }}
                    />
                </ContainerButton>
                <Region
                    name="toggle_preview_zoom"
                    params={65}
                    dynamicStyle="button"
                    layout={{ position: 'absolute', left: 331, width: 20, top: 37, height: 22 }}
                >
                    <ThemeImage
                        tags={[ '#icon' ]}
                        params={16}
                        src={layoutImage('roomtools_magnifier.png')}
                        layout={{ position: 'absolute', left: 3, width: 13, top: 0, height: 22 }}
                    />
                </Region>
                <Region
                    name="toggle_preview_magic"
                    params={65}
                    dynamicStyle="button"
                    layout={{ position: 'absolute', left: 331, width: 22, top: 63, height: 22 }}
                >
                    <ThemeImage
                        tags={[ '#icon' ]}
                        params={16}
                        src={layoutImage('avatar_editor_tabs_ae_tabs_generic.png')}
                        layout={{ position: 'absolute', left: -10, width: 41, top: 0, height: 22 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="separator"
                    params={1168}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 278, height: 4 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 11, width: 137, top: 88, height: 76 }}
                >
                    <Region
                        name="bundleGrid"
                        params={16}
                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                    />
                </ScrollArea>
                <WidgetSlot
                    widgetType="product_image"
                    name="product_image_widget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 200 }}
                />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 280, top: 12, height: 64, flexDirection: 'column' }}
                >
                    <Region
                        name="ctlg_product_name"
                        layout={{ width: 280, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="product"
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 280 }}
                        />
                    </Region>
                    <Region
                        name="ctlg_description"
                        layout={{ width: 280, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="description"
                            textStyle="text-style-u-small"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 280 }}
                        />
                    </Region>
                    <Region
                        visible={false}
                        layout={{ width: 40, height: 16, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="tradeable_icon"
                            src={layoutImage('inventory_furni_no_trade_icon.png')}
                            layout={{ width: 40, height: 16, flexShrink: 0 }}
                        />
                    </Region>
                    <Region
                        visible={false}
                        layout={{ width: 28, height: 16, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="recyclable_icon"
                            src={layoutImage('inventory_furni_no_recycle_icon.png')}
                            layout={{ width: 28, height: 16, flexShrink: 0 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

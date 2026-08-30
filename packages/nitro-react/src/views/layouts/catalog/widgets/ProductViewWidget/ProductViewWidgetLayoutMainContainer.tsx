import { ReactNode } from 'react';

import { BoxLayout, ContainerButton, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `main_container` of ProductViewWidgetLayout - configured through the parent's `mainContainer` prop. */
export interface ProductViewWidgetLayoutMainContainerProps {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    itemsBundleGrid?: ReactNode;
    layout?: BoxLayout;
    onRoomCanvasContainer?: () => void;
    onRotateAvatarLeft?: () => void;
    onRotateAvatarRight?: () => void;
    onTogglePreviewMagic?: () => void;
    onTogglePreviewZoom?: () => void;
    productImageWidget?: ReactNode;
    roomCanvas?: ReactNode;
    srcCtlgTeaserimg1?: string;
    srcRecyclableIcon?: string;
    srcTradeableIcon?: string;
    tintCtlgTeaserimg1?: string;
    visibleRecyclableIcon?: boolean;
    visibleTradeableIcon?: boolean;
}

export const ProductViewWidgetLayoutMainContainer = ({ captionCtlgDescription, captionCtlgProductName, itemsBundleGrid, layout, onRoomCanvasContainer, onRotateAvatarLeft, onRotateAvatarRight, onTogglePreviewMagic, onTogglePreviewZoom, productImageWidget, roomCanvas, srcCtlgTeaserimg1, srcRecyclableIcon, srcTradeableIcon, tintCtlgTeaserimg1, visibleRecyclableIcon, visibleTradeableIcon }: ProductViewWidgetLayoutMainContainerProps) => {
    return (
        <Region
            name="main_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
                tint={tintCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Region
                name="room_canvas_container"
                backgroundColor="#000000"
                onPointerTap={onRoomCanvasContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="room_canvas"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {roomCanvas}
                </Region>
            </Region>
            <ContainerButton
                variant="5"
                name="rotate_avatar_left"
                onPointerTap={onRotateAvatarLeft}
                layout={{ position: 'absolute', right: 35, width: 25, top: 8, height: 24 }}
            >
                <Icon
                    variant="2"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 7, width: 30, top: 7, height: 30 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="5"
                name="rotate_avatar_right"
                onPointerTap={onRotateAvatarRight}
                layout={{ position: 'absolute', right: 6, width: 25, top: 8, height: 24 }}
            >
                <Icon
                    variant="3"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 9, width: 28, top: 7, height: 29 }}
                />
            </ContainerButton>
            <Region
                name="toggle_preview_zoom"
                dynamicStyle="button"
                onPointerTap={onTogglePreviewZoom}
                cursor="pointer"
                layout={{ position: 'absolute', right: 9, width: 20, top: 37, height: 22 }}
            >
                <ThemeImage
                    src={layoutImage('roomtools_magnifier.png')}
                    layout={{ position: 'absolute', left: 3, width: 13, top: 0, height: 22 }}
                />
            </Region>
            <Region
                name="toggle_preview_magic"
                dynamicStyle="button"
                onPointerTap={onTogglePreviewMagic}
                cursor="pointer"
                layout={{ position: 'absolute', right: 7, width: 22, top: 63, height: 22 }}
            >
                <ThemeImage
                    src={layoutImage('avatar_editor_tabs_ae_tabs_generic.png')}
                    layout={{ position: 'absolute', left: -10, width: 41, top: 0, height: 22 }}
                />
            </Region>
            {/* `widget` is hidden and has no name to show it by */}
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 11, width: 137, top: 88, height: 76 }}
            >
                <Region
                    name="bundleGrid"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                >
                    {itemsBundleGrid}
                </Region>
            </ScrollArea>
            <WidgetSlot
                widgetType="product_image"
                name="product_image_widget"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 200 }}
            >
                {productImageWidget}
            </WidgetSlot>
            <Region layout={{ position: 'absolute', left: 5, width: 280, top: 12, height: 64, flexDirection: 'column' }}>
                <ThemeText
                    text={captionCtlgProductName ?? 'product'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 280 }}
                    name="ctlg_product_name"
                    verticalAlign="top"
                    layout={{ width: 280, height: 17, flexShrink: 0 }}
                />
                <ThemeText
                    text={captionCtlgDescription ?? 'description'}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 280 }}
                    name="ctlg_description"
                    verticalAlign="top"
                    layout={{ width: 280, height: 15, flexShrink: 0 }}
                />
                {(visibleTradeableIcon ?? false) && (
                    <ThemeImage
                        name="tradeable_icon"
                        src={srcTradeableIcon ?? layoutImage('inventory_furni_no_trade_icon.png')}
                        layout={{ width: 40, height: 16, flexShrink: 0 }}
                    />
                )}
                {(visibleRecyclableIcon ?? false) && (
                    <ThemeImage
                        name="recyclable_icon"
                        src={srcRecyclableIcon ?? layoutImage('inventory_furni_no_recycle_icon.png')}
                        layout={{ width: 28, height: 16, flexShrink: 0 }}
                    />
                )}
            </Region>
        </Region>
    );
};

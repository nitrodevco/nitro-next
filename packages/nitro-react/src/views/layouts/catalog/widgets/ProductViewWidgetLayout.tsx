import { BoxLayout, ContainerButton, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1555_productViewWidget_xml` (layout "productViewWidget", 360x348) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProductViewWidgetLayoutProps {
    layout?: BoxLayout;
    mainContainer?: ProductViewWidgetLayoutMainContainerProps;
}

export const ProductViewWidgetLayout = ({ layout, mainContainer }: ProductViewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 348, ...layout }}>
            <ProductViewWidgetLayoutMainContainer {...mainContainer} />
        </Region>
    );
};

/** Named region `room_canvas` of ProductViewWidgetLayout - configured through the parent's `roomCanvas` prop. */
export interface ProductViewWidgetLayoutRoomCanvasProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ProductViewWidgetLayoutRoomCanvas = ({ layout, tags }: ProductViewWidgetLayoutRoomCanvasProps) => {
    return (
        <Region
            name="room_canvas"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `room_canvas_container` of ProductViewWidgetLayout - configured through the parent's `roomCanvasContainer` prop. */
export interface ProductViewWidgetLayoutRoomCanvasContainerProps {
    layout?: BoxLayout;
    onRoomCanvasContainer?: () => void;
    roomCanvas?: ProductViewWidgetLayoutRoomCanvasProps;
    tags?: string[];
}

export const ProductViewWidgetLayoutRoomCanvasContainer = ({ layout, onRoomCanvasContainer, roomCanvas, tags }: ProductViewWidgetLayoutRoomCanvasContainerProps) => {
    return (
        <Region
            name="room_canvas_container"
            tags={tags}
            backgroundColor="#000000"
            onPointerTap={onRoomCanvasContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ProductViewWidgetLayoutRoomCanvas {...roomCanvas} />
        </Region>
    );
};

/** Named region `toggle_preview_zoom` of ProductViewWidgetLayout - configured through the parent's `togglePreviewZoom` prop. */
export interface ProductViewWidgetLayoutTogglePreviewZoomProps {
    layout?: BoxLayout;
    onTogglePreviewZoom?: () => void;
    tags?: string[];
}

export const ProductViewWidgetLayoutTogglePreviewZoom = ({ layout, onTogglePreviewZoom, tags }: ProductViewWidgetLayoutTogglePreviewZoomProps) => {
    return (
        <Region
            name="toggle_preview_zoom"
            tags={tags}
            dynamicStyle="button"
            onPointerTap={onTogglePreviewZoom}
            cursor="pointer"
            layout={{ position: 'absolute', right: 9, width: 20, top: 37, height: 22, ...layout }}
        >
            <ThemeImage
                tags={[ '#icon' ]}
                src={layoutImage('roomtools_magnifier.png')}
                layout={{ position: 'absolute', left: 3, width: 13, top: 0, height: 22 }}
            />
        </Region>
    );
};

/** Named region `toggle_preview_magic` of ProductViewWidgetLayout - configured through the parent's `togglePreviewMagic` prop. */
export interface ProductViewWidgetLayoutTogglePreviewMagicProps {
    layout?: BoxLayout;
    onTogglePreviewMagic?: () => void;
    tags?: string[];
}

export const ProductViewWidgetLayoutTogglePreviewMagic = ({ layout, onTogglePreviewMagic, tags }: ProductViewWidgetLayoutTogglePreviewMagicProps) => {
    return (
        <Region
            name="toggle_preview_magic"
            tags={tags}
            dynamicStyle="button"
            onPointerTap={onTogglePreviewMagic}
            cursor="pointer"
            layout={{ position: 'absolute', right: 7, width: 22, top: 63, height: 22, ...layout }}
        >
            <ThemeImage
                tags={[ '#icon' ]}
                src={layoutImage('avatar_editor_tabs_ae_tabs_generic.png')}
                layout={{ position: 'absolute', left: -10, width: 41, top: 0, height: 22 }}
            />
        </Region>
    );
};

/** Named region `bundleGrid` of ProductViewWidgetLayout - configured through the parent's `bundleGrid` prop. */
export interface ProductViewWidgetLayoutBundleGridProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ProductViewWidgetLayoutBundleGrid = ({ layout, tags }: ProductViewWidgetLayoutBundleGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 11, width: 137, top: 88, height: 76, ...layout }}
        >
            <Region
                name="bundleGrid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `main_container` of ProductViewWidgetLayout - configured through the parent's `mainContainer` prop. */
export interface ProductViewWidgetLayoutMainContainerProps {
    bundleGrid?: ProductViewWidgetLayoutBundleGridProps;
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    layout?: BoxLayout;
    onRotateAvatarLeft?: () => void;
    onRotateAvatarRight?: () => void;
    roomCanvasContainer?: ProductViewWidgetLayoutRoomCanvasContainerProps;
    srcCtlgTeaserimg1?: string;
    srcRecyclableIcon?: string;
    srcTradeableIcon?: string;
    tags?: string[];
    togglePreviewMagic?: ProductViewWidgetLayoutTogglePreviewMagicProps;
    togglePreviewZoom?: ProductViewWidgetLayoutTogglePreviewZoomProps;
}

export const ProductViewWidgetLayoutMainContainer = ({ bundleGrid, captionCtlgDescription, captionCtlgProductName, layout, onRotateAvatarLeft, onRotateAvatarRight, roomCanvasContainer, srcCtlgTeaserimg1, srcRecyclableIcon, srcTradeableIcon, tags, togglePreviewMagic, togglePreviewZoom }: ProductViewWidgetLayoutMainContainerProps) => {
    return (
        <Region
            name="main_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <ProductViewWidgetLayoutRoomCanvasContainer {...roomCanvasContainer} />
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
            <ProductViewWidgetLayoutTogglePreviewZoom {...togglePreviewZoom} />
            <ProductViewWidgetLayoutTogglePreviewMagic {...togglePreviewMagic} />
            <WidgetSlot
                widgetType="separator"
                visible={false}
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 66, height: 4 }}
            />
            <ProductViewWidgetLayoutBundleGrid {...bundleGrid} />
            <WidgetSlot
                widgetType="product_image"
                name="product_image_widget"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 200 }}
            />
            <Region layout={{ position: 'absolute', left: 5, width: 280, top: 12, height: 64, flexDirection: 'column' }}>
                <Region
                    name="ctlg_product_name"
                    layout={{ width: 280, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgProductName ?? 'product'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 280 }}
                    />
                </Region>
                <Region
                    name="ctlg_description"
                    layout={{ width: 280, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgDescription ?? 'description'}
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
                        src={srcTradeableIcon ?? layoutImage('inventory_furni_no_trade_icon.png')}
                        layout={{ width: 40, height: 16, flexShrink: 0 }}
                    />
                </Region>
                <Region
                    visible={false}
                    layout={{ width: 28, height: 16, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="recyclable_icon"
                        src={srcRecyclableIcon ?? layoutImage('inventory_furni_no_recycle_icon.png')}
                        layout={{ width: 28, height: 16, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

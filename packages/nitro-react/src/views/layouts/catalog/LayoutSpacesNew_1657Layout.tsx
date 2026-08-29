import { useTranslation } from '#base/context';
import { BoxLayout, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ScrollArea, ThemeImage } from '#base/theme';

/** Generated from `1657_layout_spaces_new_xml` (layout "ctlg_spaces_new", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSpacesNew_1657LayoutProps {
    ctlgSpacesNew?: LayoutSpacesNew_1657LayoutCtlgSpacesNewProps;
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1657Layout = ({ ctlgSpacesNew, layout }: LayoutSpacesNew_1657LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSpacesNew_1657LayoutCtlgSpacesNew {...ctlgSpacesNew} />
        </Region>
    );
};

/** Named region `productViewWidget` of LayoutSpacesNew_1657Layout - configured through the parent's `productViewWidget` prop. */
export interface LayoutSpacesNew_1657LayoutProductViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1657LayoutProductViewWidget = ({ layout }: LayoutSpacesNew_1657LayoutProductViewWidgetProps) => {
    return (
        <Region
            name="productViewWidget"
            tags={[ 'NO_ROOM_CANVAS' ]}
            params={16}
            layout={{ position: 'absolute', left: 180, width: 170, top: 150, height: 245, ...layout }}
        />
    );
};

/** Named region `roomPreviewWidget` of LayoutSpacesNew_1657Layout - configured through the parent's `roomPreviewWidget` prop. */
export interface LayoutSpacesNew_1657LayoutRoomPreviewWidgetProps {
    layout?: BoxLayout;
    srcCatalogFloorPreviewExample?: string;
    srcCatalogSpacePreviewWindow?: string;
    srcCatalogWallPreviewBRight?: string;
}

export const LayoutSpacesNew_1657LayoutRoomPreviewWidget = ({ layout, srcCatalogFloorPreviewExample, srcCatalogSpacePreviewWindow, srcCatalogWallPreviewBRight }: LayoutSpacesNew_1657LayoutRoomPreviewWidgetProps) => {
    return (
        <Region
            name="roomPreviewWidget"
            params={16}
            layout={{ position: 'absolute', left: 180, width: 180, top: 150, height: 275, ...layout }}
        >
            <ThemeImage
                name="catalog_floor_preview_example"
                params={16}
                src={srcCatalogFloorPreviewExample}
                layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 277 }}
            />
            <ThemeImage
                name="catalog_wall_preview_b_right"
                params={16}
                src={srcCatalogWallPreviewBRight}
                layout={{ position: 'absolute', left: 29, width: 288, top: 151, height: 147 }}
            />
            <ThemeImage
                name="catalog_space_preview_window"
                params={16}
                src={srcCatalogSpacePreviewWindow}
                layout={{ position: 'absolute', left: 118, width: 120, top: 151, height: 118 }}
            />
        </Region>
    );
};

/** Named region `purchaseWidget` of LayoutSpacesNew_1657Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutSpacesNew_1657LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1657LayoutPurchaseWidget = ({ layout }: LayoutSpacesNew_1657LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30, ...layout }}
        />
    );
};

/** Named region `groups` of LayoutSpacesNew_1657Layout - configured through the parent's `groups` prop. */
export interface LayoutSpacesNew_1657LayoutGroupsProps {
    layout?: BoxLayout;
    onGroupFloors?: () => void;
    onGroupViews?: () => void;
    onGroupWalls?: () => void;
}

export const LayoutSpacesNew_1657LayoutGroups = ({ layout, onGroupFloors, onGroupViews, onGroupWalls }: LayoutSpacesNew_1657LayoutGroupsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="groups"
            params={17}
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 22, ...layout }}
        >
            <ButtonGroupLeft
                variant="100"
                name="group.walls"
                params={131089}
                onPointerTap={onGroupWalls}
                layout={{ position: 'absolute', left: 0, width: 147, top: 0, height: 21, minWidth: 50 }}
            >
                {t('catalog.spaces.tab.walls')}
            </ButtonGroupLeft>
            <ButtonGroupCenter
                variant="100"
                name="group.floors"
                params={131089}
                onPointerTap={onGroupFloors}
                layout={{ position: 'absolute', left: 50, width: 152, top: 0, height: 21, minWidth: 50 }}
            >
                {t('catalog.spaces.tab.floors')}
            </ButtonGroupCenter>
            <ButtonGroupRight
                variant="100"
                name="group.views"
                params={131089}
                onPointerTap={onGroupViews}
                layout={{ position: 'absolute', left: 100, width: 150, top: 0, height: 21, minWidth: 50 }}
            >
                {t('catalog.spaces.tab.views')}
            </ButtonGroupRight>
        </Region>
    );
};

/** Named region `itemGrid` of LayoutSpacesNew_1657Layout - configured through the parent's `itemGrid` prop. */
export interface LayoutSpacesNew_1657LayoutItemGridProps {
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1657LayoutItemGrid = ({ layout }: LayoutSpacesNew_1657LayoutItemGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 170, top: 28, height: 239, ...layout }}
        >
            <Region
                name="itemGrid"
                params={16}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `spacesNewWidget` of LayoutSpacesNew_1657Layout - configured through the parent's `spacesNewWidget` prop. */
export interface LayoutSpacesNew_1657LayoutSpacesNewWidgetProps {
    groups?: LayoutSpacesNew_1657LayoutGroupsProps;
    itemGrid?: LayoutSpacesNew_1657LayoutItemGridProps;
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1657LayoutSpacesNewWidget = ({ groups, itemGrid, layout }: LayoutSpacesNew_1657LayoutSpacesNewWidgetProps) => {
    return (
        <Region
            name="spacesNewWidget"
            tags={[ 'EMBEDDED', 'FIXED' ]}
            params={16}
            layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 292, ...layout }}
        >
            <LayoutSpacesNew_1657LayoutGroups {...groups} />
            <LayoutSpacesNew_1657LayoutItemGrid {...itemGrid} />
        </Region>
    );
};

/** Named region `activityPointDisplayWidget` of LayoutSpacesNew_1657Layout - configured through the parent's `activityPointDisplayWidget` prop. */
export interface LayoutSpacesNew_1657LayoutActivityPointDisplayWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1657LayoutActivityPointDisplayWidget = ({ layout }: LayoutSpacesNew_1657LayoutActivityPointDisplayWidgetProps) => {
    return (
        <Region
            name="activityPointDisplayWidget"
            params={16}
            layout={{ position: 'absolute', left: 180, width: 175, top: 125, height: 28, ...layout }}
        />
    );
};

/** Named region `ctlg_spaces_new` of LayoutSpacesNew_1657Layout - configured through the parent's `ctlgSpacesNew` prop. */
export interface LayoutSpacesNew_1657LayoutCtlgSpacesNewProps {
    activityPointDisplayWidget?: LayoutSpacesNew_1657LayoutActivityPointDisplayWidgetProps;
    layout?: BoxLayout;
    productViewWidget?: LayoutSpacesNew_1657LayoutProductViewWidgetProps;
    purchaseWidget?: LayoutSpacesNew_1657LayoutPurchaseWidgetProps;
    roomPreviewWidget?: LayoutSpacesNew_1657LayoutRoomPreviewWidgetProps;
    spacesNewWidget?: LayoutSpacesNew_1657LayoutSpacesNewWidgetProps;
}

export const LayoutSpacesNew_1657LayoutCtlgSpacesNew = ({ activityPointDisplayWidget, layout, productViewWidget, purchaseWidget, roomPreviewWidget, spacesNewWidget }: LayoutSpacesNew_1657LayoutCtlgSpacesNewProps) => {
    return (
        <Region
            name="ctlg_spaces_new"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <LayoutSpacesNew_1657LayoutProductViewWidget {...productViewWidget} />
            <LayoutSpacesNew_1657LayoutRoomPreviewWidget {...roomPreviewWidget} />
            <LayoutSpacesNew_1657LayoutPurchaseWidget {...purchaseWidget} />
            <LayoutSpacesNew_1657LayoutSpacesNewWidget {...spacesNewWidget} />
            <LayoutSpacesNew_1657LayoutActivityPointDisplayWidget {...activityPointDisplayWidget} />
        </Region>
    );
};

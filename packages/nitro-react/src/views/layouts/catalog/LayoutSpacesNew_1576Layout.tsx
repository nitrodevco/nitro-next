import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ScrollArea, ThemeImage } from '#base/theme';

/** Generated from `1576_layout_spaces_new_xml` (layout "ctlg_spaces_new", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSpacesNew_1576LayoutProps {
    ctlgSpacesNew?: LayoutSpacesNew_1576LayoutCtlgSpacesNewProps;
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1576Layout = ({ ctlgSpacesNew, layout }: LayoutSpacesNew_1576LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSpacesNew_1576LayoutCtlgSpacesNew {...ctlgSpacesNew} />
        </Region>
    );
};

/** Named region `productViewWidget` of LayoutSpacesNew_1576Layout - configured through the parent's `productViewWidget` prop. */
export interface LayoutSpacesNew_1576LayoutProductViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1576LayoutProductViewWidget = ({ layout }: LayoutSpacesNew_1576LayoutProductViewWidgetProps) => {
    return (
        <Region
            name="productViewWidget"
            tags={[ 'NO_ROOM_CANVAS' ]}
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240, ...layout }}
        />
    );
};

/** Named region `roomPreviewWidget` of LayoutSpacesNew_1576Layout - configured through the parent's `roomPreviewWidget` prop. */
export interface LayoutSpacesNew_1576LayoutRoomPreviewWidgetProps {
    layout?: BoxLayout;
    srcCatalogFloorPreviewExample?: string;
    srcCatalogSpacePreviewWindow?: string;
    srcCatalogWallPreviewBRight?: string;
}

export const LayoutSpacesNew_1576LayoutRoomPreviewWidget = ({ layout, srcCatalogFloorPreviewExample, srcCatalogSpacePreviewWindow, srcCatalogWallPreviewBRight }: LayoutSpacesNew_1576LayoutRoomPreviewWidgetProps) => {
    return (
        <Region
            name="roomPreviewWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240, ...layout }}
        >
            <ThemeImage
                name="catalog_floor_preview_example"
                params={16}
                src={srcCatalogFloorPreviewExample}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <ThemeImage
                name="catalog_wall_preview_b_right"
                params={16}
                src={srcCatalogWallPreviewBRight}
                layout={{ position: 'absolute', left: 29, width: 288, top: 21, height: 147 }}
            />
            <ThemeImage
                name="catalog_space_preview_window"
                params={16}
                src={srcCatalogSpacePreviewWindow}
                layout={{ position: 'absolute', left: 123, width: 120, top: 51, height: 118 }}
            />
        </Region>
    );
};

/** Named region `activityPointDisplayWidget` of LayoutSpacesNew_1576Layout - configured through the parent's `activityPointDisplayWidget` prop. */
export interface LayoutSpacesNew_1576LayoutActivityPointDisplayWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1576LayoutActivityPointDisplayWidget = ({ layout }: LayoutSpacesNew_1576LayoutActivityPointDisplayWidgetProps) => {
    return (
        <Region
            name="activityPointDisplayWidget"
            layout={{ position: 'absolute', left: 180, width: 175, top: 205, height: 28, ...layout }}
        />
    );
};

/** Named region `groups` of LayoutSpacesNew_1576Layout - configured through the parent's `groups` prop. */
export interface LayoutSpacesNew_1576LayoutGroupsProps {
    layout?: BoxLayout;
    onGroupFloors?: () => void;
    onGroupViews?: () => void;
    onGroupWalls?: () => void;
}

export const LayoutSpacesNew_1576LayoutGroups = ({ layout, onGroupFloors, onGroupViews, onGroupWalls }: LayoutSpacesNew_1576LayoutGroupsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="groups"
            params={17}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 22, ...layout }}
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

/** Named region `itemGrid` of LayoutSpacesNew_1576Layout - configured through the parent's `itemGrid` prop. */
export interface LayoutSpacesNew_1576LayoutItemGridProps {
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1576LayoutItemGrid = ({ layout }: LayoutSpacesNew_1576LayoutItemGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 2, width: 356, top: 27, bottom: 2, ...layout }}
        >
            <Region
                name="itemGrid"
                params={2064}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `spacesNewWidget` of LayoutSpacesNew_1576Layout - configured through the parent's `spacesNewWidget` prop. */
export interface LayoutSpacesNew_1576LayoutSpacesNewWidgetProps {
    groups?: LayoutSpacesNew_1576LayoutGroupsProps;
    itemGrid?: LayoutSpacesNew_1576LayoutItemGridProps;
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1576LayoutSpacesNewWidget = ({ groups, itemGrid, layout }: LayoutSpacesNew_1576LayoutSpacesNewWidgetProps) => {
    return (
        <Region
            name="spacesNewWidget"
            tags={[ 'EMBEDDED', 'FIXED' ]}
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 35, ...layout }}
        >
            <LayoutSpacesNew_1576LayoutGroups {...groups} />
            <Border
                variant="6"
                params={2064}
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 360, top: 25, bottom: 0 }}
            />
            <LayoutSpacesNew_1576LayoutItemGrid {...itemGrid} />
        </Region>
    );
};

/** Named region `purchaseWidget` of LayoutSpacesNew_1576Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutSpacesNew_1576LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1576LayoutPurchaseWidget = ({ layout }: LayoutSpacesNew_1576LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30, ...layout }}
        />
    );
};

/** Named region `ctlg_spaces_new` of LayoutSpacesNew_1576Layout - configured through the parent's `ctlgSpacesNew` prop. */
export interface LayoutSpacesNew_1576LayoutCtlgSpacesNewProps {
    activityPointDisplayWidget?: LayoutSpacesNew_1576LayoutActivityPointDisplayWidgetProps;
    layout?: BoxLayout;
    productViewWidget?: LayoutSpacesNew_1576LayoutProductViewWidgetProps;
    purchaseWidget?: LayoutSpacesNew_1576LayoutPurchaseWidgetProps;
    roomPreviewWidget?: LayoutSpacesNew_1576LayoutRoomPreviewWidgetProps;
    spacesNewWidget?: LayoutSpacesNew_1576LayoutSpacesNewWidgetProps;
}

export const LayoutSpacesNew_1576LayoutCtlgSpacesNew = ({ activityPointDisplayWidget, layout, productViewWidget, purchaseWidget, roomPreviewWidget, spacesNewWidget }: LayoutSpacesNew_1576LayoutCtlgSpacesNewProps) => {
    return (
        <Region
            name="ctlg_spaces_new"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LayoutSpacesNew_1576LayoutProductViewWidget {...productViewWidget} />
            <LayoutSpacesNew_1576LayoutRoomPreviewWidget {...roomPreviewWidget} />
            <LayoutSpacesNew_1576LayoutActivityPointDisplayWidget {...activityPointDisplayWidget} />
            <LayoutSpacesNew_1576LayoutSpacesNewWidget {...spacesNewWidget} />
            <LayoutSpacesNew_1576LayoutPurchaseWidget {...purchaseWidget} />
        </Region>
    );
};

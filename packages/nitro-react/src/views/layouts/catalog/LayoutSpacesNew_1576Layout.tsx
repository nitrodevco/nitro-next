import { BoxLayout, Region } from '#base/theme';
import { ActivityPointDisplayWidget, ActivityPointDisplayWidgetProps } from '#base/views/layouts/catalog/widgets/ActivityPointDisplayWidget';
import { ProductViewWidget2, ProductViewWidget2Props } from '#base/views/layouts/catalog/widgets/ProductViewWidget2';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { RoomPreviewWidget2, RoomPreviewWidget2Props } from '#base/views/layouts/catalog/widgets/RoomPreviewWidget2';
import { SpacesNewWidget, SpacesNewWidgetProps } from '#base/views/layouts/catalog/widgets/SpacesNewWidget';

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

/** Named region `ctlg_spaces_new` of LayoutSpacesNew_1576Layout - configured through the parent's `ctlgSpacesNew` prop. */
export interface LayoutSpacesNew_1576LayoutCtlgSpacesNewProps {
    activityPointDisplayWidget?: ActivityPointDisplayWidgetProps;
    layout?: BoxLayout;
    productViewWidget?: ProductViewWidget2Props;
    purchaseWidget?: PurchaseWidgetProps;
    roomPreviewWidget?: RoomPreviewWidget2Props;
    spacesNewWidget?: SpacesNewWidgetProps;
}

export const LayoutSpacesNew_1576LayoutCtlgSpacesNew = ({ activityPointDisplayWidget, layout, productViewWidget, purchaseWidget, roomPreviewWidget, spacesNewWidget }: LayoutSpacesNew_1576LayoutCtlgSpacesNewProps) => {
    return (
        <Region
            name="ctlg_spaces_new"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <ProductViewWidget2
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                {...productViewWidget}
            />
            <RoomPreviewWidget2
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                {...roomPreviewWidget}
            />
            <ActivityPointDisplayWidget
                layout={{ position: 'absolute', left: 180, width: 175, top: 205, height: 28 }}
                {...activityPointDisplayWidget}
            />
            <SpacesNewWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 35 }}
                {...spacesNewWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

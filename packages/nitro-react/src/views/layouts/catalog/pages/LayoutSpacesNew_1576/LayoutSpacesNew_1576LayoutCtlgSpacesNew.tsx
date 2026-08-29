import { BoxLayout, Region } from '#base/theme';
import { ActivityPointDisplayWidget, ActivityPointDisplayWidgetProps } from '#base/views/layouts/catalog/widgets/ActivityPointDisplayWidget';
import { ProductViewWidget, ProductViewWidgetProps } from '#base/views/layouts/catalog/widgets/ProductViewWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { RoomPreviewWidget2, RoomPreviewWidget2Props } from '#base/views/layouts/catalog/widgets/RoomPreviewWidget2';
import { SpacesNewWidget2, SpacesNewWidget2Props } from '#base/views/layouts/catalog/widgets/SpacesNewWidget2';

/** Named region `ctlg_spaces_new` of LayoutSpacesNew_1576Layout - configured through the parent's `ctlgSpacesNew` prop. */
export interface LayoutSpacesNew_1576LayoutCtlgSpacesNewProps {
    activityPointDisplayWidget?: ActivityPointDisplayWidgetProps;
    layout?: BoxLayout;
    productViewWidget?: ProductViewWidgetProps;
    purchaseWidget?: PurchaseWidgetProps;
    roomPreviewWidget?: RoomPreviewWidget2Props;
    spacesNewWidget?: SpacesNewWidget2Props;
}

export const LayoutSpacesNew_1576LayoutCtlgSpacesNew = ({ activityPointDisplayWidget, layout, productViewWidget, purchaseWidget, roomPreviewWidget, spacesNewWidget }: LayoutSpacesNew_1576LayoutCtlgSpacesNewProps) => {
    return (
        <Region
            name="ctlg_spaces_new"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ProductViewWidget
                noRoomCanvas
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 240 }}
                {...productViewWidget}
            />
            <RoomPreviewWidget2
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 240 }}
                {...roomPreviewWidget}
            />
            <ActivityPointDisplayWidget
                layout={{ position: 'absolute', left: 180, width: 175, top: 205, height: 28 }}
                {...activityPointDisplayWidget}
            />
            <SpacesNewWidget2
                fixed
                layout={{ position: 'absolute', left: 0, right: 0, top: 245, bottom: 35 }}
                {...spacesNewWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

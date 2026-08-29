import { BoxLayout, Region } from '#base/theme';
import { ActivityPointDisplayWidget, ActivityPointDisplayWidgetProps } from '#base/views/layouts/catalog/widgets/ActivityPointDisplayWidget';
import { ProductViewWidget, ProductViewWidgetProps } from '#base/views/layouts/catalog/widgets/ProductViewWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { RoomPreviewWidget, RoomPreviewWidgetProps } from '#base/views/layouts/catalog/widgets/RoomPreviewWidget';
import { SpacesNewWidget, SpacesNewWidgetProps } from '#base/views/layouts/catalog/widgets/SpacesNewWidget';

/** Named region `ctlg_spaces_new` of LayoutSpacesNew_1657Layout - configured through the parent's `ctlgSpacesNew` prop. */
export interface LayoutSpacesNew_1657LayoutCtlgSpacesNewProps {
    activityPointDisplayWidget?: ActivityPointDisplayWidgetProps;
    layout?: BoxLayout;
    productViewWidget?: ProductViewWidgetProps;
    purchaseWidget?: PurchaseWidgetProps;
    roomPreviewWidget?: RoomPreviewWidgetProps;
    spacesNewWidget?: SpacesNewWidgetProps;
}

export const LayoutSpacesNew_1657LayoutCtlgSpacesNew = ({ activityPointDisplayWidget, layout, productViewWidget, purchaseWidget, roomPreviewWidget, spacesNewWidget }: LayoutSpacesNew_1657LayoutCtlgSpacesNewProps) => {
    return (
        <Region
            name="ctlg_spaces_new"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <ProductViewWidget
                noRoomCanvas
                layout={{ position: 'absolute', left: 180, width: 170, top: 150, height: 245 }}
                {...productViewWidget}
            />
            <RoomPreviewWidget
                layout={{ position: 'absolute', left: 180, width: 180, top: 150, height: 275 }}
                {...roomPreviewWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                {...purchaseWidget}
            />
            <SpacesNewWidget
                fixed
                layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 292 }}
                {...spacesNewWidget}
            />
            <ActivityPointDisplayWidget
                layout={{ position: 'absolute', left: 180, width: 175, top: 125, height: 28 }}
                {...activityPointDisplayWidget}
            />
        </Region>
    );
};

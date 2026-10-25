/**
 * Not Flash's: a client module's widget in a reception widget slot (`hotelView.addWidget`), drawn
 * where the hotel's configured widget for that slot would be, at the width of the slot's pane. The
 * last widget added for a slot is the one drawn; one that throws is caught on its own.
 */
import { ClientModuleHotelViewWidget } from '#base/context/client-modules';
import { ViewErrorBoundary } from '#base/views/system/ViewErrorBoundary';

export interface ClientModuleHotelViewWidgetViewProps {
    widget: ClientModuleHotelViewWidget;
    width: number;
}

export const ClientModuleHotelViewWidgetView = ({ widget: { key, slot, component: Widget }, width }: ClientModuleHotelViewWidgetViewProps) => (
    <ViewErrorBoundary key={key}>
        <Widget
            slot={slot}
            width={width}
        />
    </ViewErrorBoundary>
);

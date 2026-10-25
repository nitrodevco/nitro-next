/**
 * Not Flash's: what client modules draw in the reception (`hotelView.addLayer`) - each layer at the
 * reception's size, in `moving_objects_container` after the moving objects, so over the background
 * art and under the widgets, the hotel top and the left backdrop. Later layers are drawn over earlier
 * ones; a layer that throws is caught on its own.
 */
import { useClientModulesStore } from '#base/context/client-modules';
import { ViewErrorBoundary } from '#base/views/system/ViewErrorBoundary';

export interface ClientModuleHotelViewLayersViewProps {
    width: number;
    height: number;
}

export const ClientModuleHotelViewLayersView = ({ width, height }: ClientModuleHotelViewLayersViewProps) => {
    const layers = useClientModulesStore(x => x.hotelViewLayers);

    if (!layers.length) return null;

    return (
        <>
            {layers.map(({ key, component: Layer }) => (
                <ViewErrorBoundary key={key}>
                    <Layer
                        width={width}
                        height={height}
                    />
                </ViewErrorBoundary>
            ))}
        </>
    );
};

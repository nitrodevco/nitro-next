/**
 * Mounts `HabboLandingView` while reception is visible. `registerHotelViewHandlers` owns
 * `WidgetContainerLayout.activate` and the retained state across room visits.
 */
import { useIsLandingViewVisible } from '#base/context/system';
import { HotelView } from '#base/views/hotel-view/HotelView';

export const HotelViewComponent = () => {
    const visible = useIsLandingViewVisible();

    if (!visible) return null;

    return <HotelView />;
};

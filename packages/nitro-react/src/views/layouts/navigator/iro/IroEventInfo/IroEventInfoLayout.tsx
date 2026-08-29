import { BoxLayout, Region } from '#base/theme';

import { IroEventInfoLayoutEventInfoWindow, IroEventInfoLayoutEventInfoWindowProps } from './IroEventInfoLayoutEventInfoWindow';

/** Generated from `3052_iro_event_info_xml` (layout "Event info", 195x135) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroEventInfoLayoutProps {
    eventInfoWindow?: IroEventInfoLayoutEventInfoWindowProps;
    layout?: BoxLayout;
}

export const IroEventInfoLayout = ({ eventInfoWindow, layout }: IroEventInfoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 195, height: 135, ...layout }}>
            <IroEventInfoLayoutEventInfoWindow {...eventInfoWindow} />
        </Region>
    );
};

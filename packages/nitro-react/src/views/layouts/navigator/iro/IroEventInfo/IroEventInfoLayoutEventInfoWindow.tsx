import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { IroEventInfoLayoutContentCont, IroEventInfoLayoutContentContProps } from './IroEventInfoLayoutContentCont';

/** Named region `event_info_window` of IroEventInfoLayout - configured through the parent's `eventInfoWindow` prop. */
export interface IroEventInfoLayoutEventInfoWindowProps {
    bgRegion?: ReactNode;
    contentCont?: IroEventInfoLayoutContentContProps;
    layout?: BoxLayout;
    onBgRegion?: () => void;
    srcEventBgContracted?: string;
    srcEventBgOwner?: string;
    srcEventBgVisitor?: string;
}

export const IroEventInfoLayoutEventInfoWindow = ({ bgRegion, contentCont, layout, onBgRegion, srcEventBgContracted, srcEventBgOwner, srcEventBgVisitor }: IroEventInfoLayoutEventInfoWindowProps) => {
    return (
        <Region
            name="event_info_window"
            layout={{ position: 'absolute', right: 0, width: 195, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="event_bg_visitor"
                src={srcEventBgVisitor ?? '${image.library.url}Events/event_bg_visitor.png'}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 135 }}
            />
            <ThemeImage
                name="event_bg_owner"
                src={srcEventBgOwner ?? '${image.library.url}Events/event_bg_owner.png'}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 135 }}
            />
            <ThemeImage
                name="event_bg_contracted"
                src={srcEventBgContracted ?? '${image.library.url}Events/event_bg_contracted.png'}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 25 }}
            />
            <Region
                name="bg_region"
                onPointerTap={onBgRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {bgRegion}
            </Region>
            <IroEventInfoLayoutContentCont {...contentCont} />
        </Region>
    );
};

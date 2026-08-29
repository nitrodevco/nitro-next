import { BoxLayout, Region } from '#base/theme';

import { CameraFilterbuttonLayoutRegion, CameraFilterbuttonLayoutRegionProps } from './CameraFilterbuttonLayoutRegion';

/** Generated from `826_camera_filterbutton_xml` (layout "camera_filterbutton", 62x62) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CameraFilterbuttonLayoutProps {
    layout?: BoxLayout;
    region?: CameraFilterbuttonLayoutRegionProps;
}

export const CameraFilterbuttonLayout = ({ layout, region }: CameraFilterbuttonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 62, height: 62, ...layout }}>
            <CameraFilterbuttonLayoutRegion {...region} />
        </Region>
    );
};

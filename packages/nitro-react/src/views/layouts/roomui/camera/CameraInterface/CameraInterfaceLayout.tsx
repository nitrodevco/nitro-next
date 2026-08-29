import { BoxLayout, Region } from '#base/theme';

import { CameraInterfaceLayoutBgBorder, CameraInterfaceLayoutBgBorderProps } from './CameraInterfaceLayoutBgBorder';

/** Generated from `960_camera_interface_xml` (layout "camera_interface", 340x536) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CameraInterfaceLayoutProps {
    bgBorder?: CameraInterfaceLayoutBgBorderProps;
    layout?: BoxLayout;
}

export const CameraInterfaceLayout = ({ bgBorder, layout }: CameraInterfaceLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 340, height: 536, ...layout }}>
            <CameraInterfaceLayoutBgBorder {...bgBorder} />
        </Region>
    );
};

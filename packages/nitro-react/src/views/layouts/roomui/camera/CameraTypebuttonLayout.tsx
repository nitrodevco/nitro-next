import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `844_camera_typebutton_xml` (layout "camera_typebutton", 95x37) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CameraTypebuttonLayoutProps {
    layout?: BoxLayout;
    onRegion?: () => void;
    srcIcon?: string;
    tintIcon?: string;
}

export const CameraTypebuttonLayout = ({ layout, onRegion, srcIcon, tintIcon }: CameraTypebuttonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 95, height: 37, ...layout }}>
            <Region
                name="region"
                dynamicStyle="brightness_and_shadow_under"
                onPointerTap={onRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 95, top: 0, height: 37 }}
            >
                <Border
                    variant="0"
                    tintColor="#cccccc"
                    layout={{ position: 'absolute', left: 0, width: 95, top: 0, height: 47 }}
                />
                <Border
                    variant="8"
                    name="active_border"
                    layout={{ position: 'absolute', left: 0, width: 95, top: 0, height: 47 }}
                />
                <ThemeImage
                    name="icon"
                    src={srcIcon}
                    tint={tintIcon}
                    layout={{ position: 'absolute', left: 18, width: 60, top: 0, height: 37 }}
                />
            </Region>
        </Region>
    );
};

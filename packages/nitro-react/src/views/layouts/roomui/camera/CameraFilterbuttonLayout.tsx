import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

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

/** Named region `remove_effect_button` of CameraFilterbuttonLayout - configured through the parent's `removeEffectButton` prop. */
export interface CameraFilterbuttonLayoutRemoveEffectButtonProps {
    layout?: BoxLayout;
    onRemoveEffectButton?: () => void;
    visibleRemoveEffectButton?: boolean;
}

export const CameraFilterbuttonLayoutRemoveEffectButton = ({ layout, onRemoveEffectButton, visibleRemoveEffectButton }: CameraFilterbuttonLayoutRemoveEffectButtonProps) => {
    return (
        <Region
            name="remove_effect_button"
            dynamicStyle="brightness_and_shadow_under"
            visible={visibleRemoveEffectButton ?? false}
            onPointerTap={onRemoveEffectButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 43, width: 19, top: 0, height: 19, ...layout }}
        >
            <ThemeImage
                src={layoutImage('camera_cam_close_x.png')}
                layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 19 }}
            />
        </Region>
    );
};

/** Named region `region` of CameraFilterbuttonLayout - configured through the parent's `region` prop. */
export interface CameraFilterbuttonLayoutRegionProps {
    layout?: BoxLayout;
    onRegion?: () => void;
    removeEffectButton?: CameraFilterbuttonLayoutRemoveEffectButtonProps;
    srcActiveIndicator?: string;
    srcContent?: string;
    srcLockIndicator?: string;
    srcOutline?: string;
    srcSelectedIndicator?: string;
}

export const CameraFilterbuttonLayoutRegion = ({ layout, onRegion, removeEffectButton, srcActiveIndicator, srcContent, srcLockIndicator, srcOutline, srcSelectedIndicator }: CameraFilterbuttonLayoutRegionProps) => {
    return (
        <Region
            name="region"
            onPointerTap={onRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 62, ...layout }}
        >
            <ThemeImage
                name="outline"
                src={srcOutline ?? layoutImage('camera_fx_button_outline.png')}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 62 }}
            />
            <ThemeImage
                name="content"
                src={srcContent}
                layout={{ position: 'absolute', left: 3, width: 56, top: 3, height: 56 }}
            />
            <ThemeImage
                name="lock_indicator"
                src={srcLockIndicator ?? layoutImage('camera_locked.png')}
                layout={{ position: 'absolute', left: 2, width: 59, top: 0, height: 60 }}
                visible={false}
            />
            <ThemeImage
                name="active_indicator"
                src={srcActiveIndicator ?? layoutImage('camera_fx_button_active.png')}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 62 }}
                visible={false}
            />
            <ThemeImage
                name="selected_indicator"
                src={srcSelectedIndicator ?? layoutImage('camera_fx_button_selected.png')}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 62 }}
                visible={false}
            />
            <CameraFilterbuttonLayoutRemoveEffectButton {...removeEffectButton} />
        </Region>
    );
};

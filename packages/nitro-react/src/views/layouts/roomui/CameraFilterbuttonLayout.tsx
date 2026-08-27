import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `826_camera_filterbutton_xml` (layout "camera_filterbutton", 62x62) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CameraFilterbuttonLayoutProps {
    layout?: BoxLayout;
    onRegion?: () => void;
    onRemoveEffectButton?: () => void;
    srcActiveIndicator?: string;
    srcContent?: string;
    srcLockIndicator?: string;
    srcOutline?: string;
    srcSelectedIndicator?: string;
    visibleRemoveEffectButton?: boolean;
}

export const CameraFilterbuttonLayout = ({ layout, onRegion, onRemoveEffectButton, srcActiveIndicator, srcContent, srcLockIndicator, srcOutline, srcSelectedIndicator, visibleRemoveEffectButton }: CameraFilterbuttonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 62, height: 62, ...layout }}>
            <Region
                name="region"
                params={17}
                onPointerTap={onRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 62 }}
            >
                <ThemeImage
                    name="outline"
                    params={16}
                    src={srcOutline ?? layoutImage('camera_fx_button_outline.png')}
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 62 }}
                />
                <ThemeImage
                    name="content"
                    params={16}
                    src={srcContent}
                    layout={{ position: 'absolute', left: 3, width: 56, top: 3, height: 56 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 59, top: 0, height: 60 }}
                >
                    <ThemeImage
                        name="lock_indicator"
                        params={16}
                        src={srcLockIndicator ?? layoutImage('camera_locked.png')}
                        layout={{ position: 'absolute', left: 2, width: 59, top: 0, height: 60 }}
                    />
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 62 }}
                >
                    <ThemeImage
                        name="active_indicator"
                        params={16}
                        src={srcActiveIndicator ?? layoutImage('camera_fx_button_active.png')}
                        layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 62 }}
                    />
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 62 }}
                >
                    <ThemeImage
                        name="selected_indicator"
                        params={16}
                        src={srcSelectedIndicator ?? layoutImage('camera_fx_button_selected.png')}
                        layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 62 }}
                    />
                </Region>
                <Region
                    name="remove_effect_button"
                    params={1}
                    dynamicStyle="brightness_and_shadow_under"
                    visible={visibleRemoveEffectButton ?? false}
                    onPointerTap={onRemoveEffectButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 43, width: 19, top: 0, height: 19 }}
                >
                    <ThemeImage
                        tags={[ '#bg' ]}
                        params={16}
                        src={layoutImage('camera_cam_close_x.png')}
                        layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 19 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

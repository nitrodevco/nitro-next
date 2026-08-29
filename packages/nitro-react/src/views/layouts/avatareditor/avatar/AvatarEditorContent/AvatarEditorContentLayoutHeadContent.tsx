import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `head_content` of AvatarEditorContentLayout - configured through the parent's `headContent` prop. */
export interface AvatarEditorContentLayoutHeadContentProps {
    layout?: BoxLayout;
    onTabAccessories?: () => void;
    onTabEyewear?: () => void;
    onTabHair?: () => void;
    onTabHat?: () => void;
    onTabMasks?: () => void;
    srcTabAccessories?: string;
    srcTabEyewear?: string;
    srcTabHair?: string;
    srcTabHat?: string;
    srcTabMasks?: string;
    visibleHeadContent?: boolean;
}

export const AvatarEditorContentLayoutHeadContent = ({ layout, onTabAccessories, onTabEyewear, onTabHair, onTabHat, onTabMasks, srcTabAccessories, srcTabEyewear, srcTabHair, srcTabHat, srcTabMasks, visibleHeadContent }: AvatarEditorContentLayoutHeadContentProps) => {
    return (
        (visibleHeadContent ?? false) && (
            <Region
                name="head_content"
                layout={{ position: 'absolute', left: 20, width: 280, top: 10, height: 35, ...layout }}
            >
                <Region
                    name="tab_hair"
                    onPointerTap={onTabHair}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_hair"
                        src={srcTabHair ?? layoutImage('avatar_editor_tabs_head_hair_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_hat"
                    onPointerTap={onTabHat}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_hat"
                        src={srcTabHat ?? layoutImage('avatar_editor_tabs_head_hats_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_accessories"
                    onPointerTap={onTabAccessories}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 110, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_accessories"
                        src={srcTabAccessories ?? layoutImage('avatar_editor_tabs_head_accessories_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_eyewear"
                    onPointerTap={onTabEyewear}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 162, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_eyewear"
                        src={srcTabEyewear ?? layoutImage('avatar_editor_tabs_head_eyewear_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_masks"
                    onPointerTap={onTabMasks}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 214, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_masks"
                        src={srcTabMasks ?? layoutImage('avatar_editor_tabs_head_face_accessories_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
            </Region>
        )
    );
};

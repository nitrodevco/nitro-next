import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `torso_content` of AvatarEditorContentLayout - configured through the parent's `torsoContent` prop. */
export interface AvatarEditorContentLayoutTorsoContentProps {
    layout?: BoxLayout;
    onTabAccessories?: () => void;
    onTabJacket?: () => void;
    onTabPrints?: () => void;
    onTabShirt?: () => void;
    srcTabAccessories?: string;
    srcTabJacket?: string;
    srcTabPrints?: string;
    srcTabShirt?: string;
    visibleTorsoContent?: boolean;
}

export const AvatarEditorContentLayoutTorsoContent = ({ layout, onTabAccessories, onTabJacket, onTabPrints, onTabShirt, srcTabAccessories, srcTabJacket, srcTabPrints, srcTabShirt, visibleTorsoContent }: AvatarEditorContentLayoutTorsoContentProps) => {
    return (
        (visibleTorsoContent ?? false) && (
            <Region
                name="torso_content"
                layout={{ position: 'absolute', left: 20, width: 210, top: 10, height: 35, ...layout }}
            >
                <Region
                    name="tab_shirt"
                    onPointerTap={onTabShirt}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_shirt"
                        src={srcTabShirt ?? layoutImage('avatar_editor_tabs_top_shirt_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_prints"
                    onPointerTap={onTabPrints}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_prints"
                        src={srcTabPrints ?? layoutImage('avatar_editor_tabs_top_prints_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_jacket"
                    onPointerTap={onTabJacket}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 110, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_jacket"
                        src={srcTabJacket ?? layoutImage('avatar_editor_tabs_top_jacket_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_accessories"
                    onPointerTap={onTabAccessories}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 162, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_accessories"
                        src={srcTabAccessories ?? layoutImage('avatar_editor_tabs_top_accessories_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
            </Region>
        )
    );
};

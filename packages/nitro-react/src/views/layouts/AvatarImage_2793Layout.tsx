import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `2793_avatar_image_xml` (layout "avatar_image", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarImage_2793LayoutProps {
    layout?: BoxLayout;
}

export const AvatarImage_2793Layout = ({ layout }: AvatarImage_2793LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <Region
                params={2196}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            >
                <ThemeImage
                    name="bitmap"
                    params={2192}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
                <Region
                    name="region"
                    params={2193}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
            </Region>
        </Region>
    );
};

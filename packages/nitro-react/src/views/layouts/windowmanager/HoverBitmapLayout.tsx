import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `2129_hover_bitmap_xml` (layout "hoverBitmap", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HoverBitmapLayoutProps {
    layout?: BoxLayout;
}

export const HoverBitmapLayout = ({ layout }: HoverBitmapLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <ThemeImage
                params={2197}
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            />
        </Region>
    );
};

import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1130_static_bitmap_view_xml` (layout "static_bitmap_view", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StaticBitmapViewLayoutProps {
    layout?: BoxLayout;
    srcStaticBitmap?: string;
}

export const StaticBitmapViewLayout = ({ layout, srcStaticBitmap }: StaticBitmapViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <ThemeImage
                name="static_bitmap"
                src={srcStaticBitmap}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            />
        </Region>
    );
};

import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1149_bitmap_wrapper_view_xml` (layout "bitmap_wrapper_view", 212x105) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BitmapWrapperViewLayoutProps {
    layout?: BoxLayout;
}

export const BitmapWrapperViewLayout = ({ layout }: BitmapWrapperViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 212, height: 105, ...layout }}>
            <ThemeImage
                name="bitmap_view"
                params={17}
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 212, top: 0, height: 105 }}
            />
        </Region>
    );
};

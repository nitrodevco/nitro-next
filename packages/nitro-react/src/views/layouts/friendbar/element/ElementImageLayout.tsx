import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `53_element_image_xml` (layout "element_bodytext", 38x38) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementImageLayoutProps {
    layout?: BoxLayout;
    srcImage?: string;
}

export const ElementImageLayout = ({ layout, srcImage }: ElementImageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 38, height: 38, ...layout }}>
            <ThemeImage
                name="image"
                src={srcImage}
                layout={{ position: 'absolute', left: 4, width: 38, top: 3, height: 38 }}
            />
        </Region>
    );
};

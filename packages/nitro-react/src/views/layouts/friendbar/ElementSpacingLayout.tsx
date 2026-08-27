import { BoxLayout, Region } from '#base/theme';

/** Generated from `48_element_spacing_xml` (layout "element_bodytext", 250x10) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementSpacingLayoutProps {
    layout?: BoxLayout;
}

export const ElementSpacingLayout = ({ layout }: ElementSpacingLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 10, ...layout }}>
            <Region
                params={144}
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 10 }}
            />
        </Region>
    );
};

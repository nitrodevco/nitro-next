import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `94_element_link_xml` (layout "element_bodytext", 252x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementLinkLayoutProps {
    layout?: BoxLayout;
}

export const ElementLinkLayout = ({ layout }: ElementLinkLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 252, height: 17, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 252, top: 0, height: 17 }}
            >
                <Region
                    name="link_txt"
                    tags={[ 'COLORABLE' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="Link text ph" />
                </Region>
            </Region>
        </Region>
    );
};

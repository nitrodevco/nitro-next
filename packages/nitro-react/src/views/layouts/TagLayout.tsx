import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `140_tag_xml` (layout "tag", 140x19) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TagLayoutProps {
    layout?: BoxLayout;
}

export const TagLayout = ({ layout }: TagLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 140, height: 19, ...layout }}>
            <Region
                name="tag_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 19 }}
            >
                <Region
                    name="tag_region"
                    params={262161}
                    backgroundColor="#f1a700"
                    layout={{ position: 'absolute', left: 108, width: 32, top: 0, height: 19 }}
                >
                    <Region
                        name="tag_text"
                        params={4194320}
                        layout={{ position: 'absolute', left: 3, width: 25, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="#tag"
                            textStyle="text-style-u-small"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

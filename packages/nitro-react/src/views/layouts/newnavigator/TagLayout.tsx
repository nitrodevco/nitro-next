import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `140_tag_xml` (layout "tag", 140x19) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TagLayoutProps {
    captionTagText?: string;
    layout?: BoxLayout;
    onTagRegion?: () => void;
}

export const TagLayout = ({ captionTagText, layout, onTagRegion }: TagLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 140, height: 19, ...layout }}>
            <Region
                name="tag_container"
                layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 19 }}
            >
                <Region
                    name="tag_region"
                    backgroundColor="#f1a700"
                    onPointerTap={onTagRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 0, width: 32, top: 0, height: 19 }}
                >
                    <Region
                        name="tag_text"
                        layout={{ position: 'absolute', left: 3, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTagText ?? '#tag'}
                            textStyle="text-style-u-small"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

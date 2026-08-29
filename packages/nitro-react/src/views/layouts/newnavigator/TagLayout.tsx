import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `140_tag_xml` (layout "tag", 140x19) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TagLayoutProps {
    layout?: BoxLayout;
    tagContainer?: TagLayoutTagContainerProps;
}

export const TagLayout = ({ layout, tagContainer }: TagLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 140, height: 19, ...layout }}>
            <TagLayoutTagContainer {...tagContainer} />
        </Region>
    );
};

/** Named region `tag_region` of TagLayout - configured through the parent's `tagRegion` prop. */
export interface TagLayoutTagRegionProps {
    captionTagText?: string;
    layout?: BoxLayout;
    onTagRegion?: () => void;
    tags?: string[];
}

export const TagLayoutTagRegion = ({ captionTagText, layout, onTagRegion, tags }: TagLayoutTagRegionProps) => {
    return (
        <Region
            name="tag_region"
            tags={tags}
            backgroundColor="#f1a700"
            onPointerTap={onTagRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 0, width: 32, top: 0, height: 19, ...layout }}
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
    );
};

/** Named region `tag_container` of TagLayout - configured through the parent's `tagContainer` prop. */
export interface TagLayoutTagContainerProps {
    layout?: BoxLayout;
    tagRegion?: TagLayoutTagRegionProps;
    tags?: string[];
}

export const TagLayoutTagContainer = ({ layout, tagRegion, tags }: TagLayoutTagContainerProps) => {
    return (
        <Region
            name="tag_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 19, ...layout }}
        >
            <TagLayoutTagRegion {...tagRegion} />
        </Region>
    );
};

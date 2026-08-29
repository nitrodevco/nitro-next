import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1566_recyclerPrizesWidgetLevelItem_xml` (layout "recyclerPrizesWidgetLevelItem", 348x78) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RecyclerPrizesWidgetLevelItemLayoutProps {
    bg?: RecyclerPrizesWidgetLevelItemLayoutBgProps;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayout = ({ bg, layout }: RecyclerPrizesWidgetLevelItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 348, height: 78, ...layout }}>
            <RecyclerPrizesWidgetLevelItemLayoutBg {...bg} />
        </Region>
    );
};

/** Row template `star_icon` of RecyclerPrizesWidgetLevelItemLayout - pass real rows through its `items…` slot. */
export interface RecyclerPrizesWidgetLevelItemLayoutStarIconItemProps {
    layout?: BoxLayout;
    srcStarIcon?: string;
}

export const RecyclerPrizesWidgetLevelItemLayoutStarIconItem = ({ layout, srcStarIcon }: RecyclerPrizesWidgetLevelItemLayoutStarIconItemProps) => {
    return (
        <ThemeImage
            name="star_icon"
            src={srcStarIcon ?? layoutImage('star_small_gold.png')}
            layout={{ width: 18, height: 17, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `level_title` of RecyclerPrizesWidgetLevelItemLayout - pass real rows through its `items…` slot. */
export interface RecyclerPrizesWidgetLevelItemLayoutLevelTitleItemProps {
    captionLevelTitle?: string;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutLevelTitleItem = ({ captionLevelTitle, layout }: RecyclerPrizesWidgetLevelItemLayoutLevelTitleItemProps) => {
    return (
        <Region
            name="level_title"
            layout={{ width: 28, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionLevelTitle ?? 'Title'} />
        </Region>
    );
};

/** Row template `level_splitter` of RecyclerPrizesWidgetLevelItemLayout - pass real rows through its `items…` slot. */
export interface RecyclerPrizesWidgetLevelItemLayoutLevelSplitterItemProps {
    captionLevelSplitter?: string;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutLevelSplitterItem = ({ captionLevelSplitter, layout }: RecyclerPrizesWidgetLevelItemLayoutLevelSplitterItemProps) => {
    return (
        <Region
            name="level_splitter"
            layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionLevelSplitter ?? ' -'} />
        </Region>
    );
};

/** Row template `level_chances` of RecyclerPrizesWidgetLevelItemLayout - pass real rows through its `items…` slot. */
export interface RecyclerPrizesWidgetLevelItemLayoutLevelChancesItemProps {
    captionLevelChances?: string;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutLevelChancesItem = ({ captionLevelChances, layout }: RecyclerPrizesWidgetLevelItemLayoutLevelChancesItemProps) => {
    return (
        <Region
            name="level_chances"
            layout={{ width: 50, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionLevelChances ?? 'Chances'} />
        </Region>
    );
};

/** Row template `header_bar` of RecyclerPrizesWidgetLevelItemLayout - pass real rows through its `items…` slot. */
export interface RecyclerPrizesWidgetLevelItemLayoutHeaderBarItemProps {
    itemsHeaderBar?: ReactNode;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutHeaderBarItem = ({ itemsHeaderBar, layout }: RecyclerPrizesWidgetLevelItemLayoutHeaderBarItemProps) => {
    return (
        <Region
            name="header_bar"
            layout={{ width: 106, height: 23, flexShrink: 0, minHeight: 23, maxHeight: 23, flexDirection: 'row', ...layout }}
        >
            {itemsHeaderBar ?? (
                <>
                    <RecyclerPrizesWidgetLevelItemLayoutStarIconItem />
                    <RecyclerPrizesWidgetLevelItemLayoutLevelTitleItem />
                    <RecyclerPrizesWidgetLevelItemLayoutLevelSplitterItem />
                    <RecyclerPrizesWidgetLevelItemLayoutLevelChancesItem />
                </>
            )}
        </Region>
    );
};

/** Named region `content` of RecyclerPrizesWidgetLevelItemLayout - configured through the parent's `content` prop. */
export interface RecyclerPrizesWidgetLevelItemLayoutContentProps {
    itemsContent?: ReactNode;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutContent = ({ itemsContent, layout }: RecyclerPrizesWidgetLevelItemLayoutContentProps) => {
    return (
        <Region
            name="content"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 68, flexDirection: 'column', ...layout }}
        >
            {itemsContent ?? (
                <RecyclerPrizesWidgetLevelItemLayoutHeaderBarItem />
            )}
            <Region
                backgroundColor="#000000"
                layout={{ width: 338, height: 1, flexShrink: 0 }}
            />
            <Region
                backgroundColor="#eaeaea"
                layout={{ width: 338, height: 44, flexShrink: 0 }}
            >
                <Region
                    name="itemGrid"
                    backgroundColor="#eaeaea"
                    layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 36, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `bg` of RecyclerPrizesWidgetLevelItemLayout - configured through the parent's `bg` prop. */
export interface RecyclerPrizesWidgetLevelItemLayoutBgProps {
    content?: RecyclerPrizesWidgetLevelItemLayoutContentProps;
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayoutBg = ({ content, layout }: RecyclerPrizesWidgetLevelItemLayoutBgProps) => {
    return (
        <Region
            name="bg"
            layout={{ position: 'absolute', left: 0, width: 348, top: 0, height: 78, ...layout }}
        >
            <Border
                variant="0"
                name="border"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <RecyclerPrizesWidgetLevelItemLayoutContent {...content} />
            </Border>
        </Region>
    );
};

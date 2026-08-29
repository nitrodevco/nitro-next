import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `64_promo_article_xml` (layout "promo_article", 500x118) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PromoArticleLayoutProps {
    layout?: BoxLayout;
    root?: PromoArticleLayoutRootProps;
}

export const PromoArticleLayout = ({ layout, root }: PromoArticleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 500, height: 118, ...layout }}>
            <PromoArticleLayoutRoot {...root} />
        </Region>
    );
};

/** Row template `border_bar` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutBorderBarItemProps {
    layout?: BoxLayout;
    srcBorderBar?: string;
    tags?: string[];
}

export const PromoArticleLayoutBorderBarItem = ({ layout, srcBorderBar, tags }: PromoArticleLayoutBorderBarItemProps) => {
    return (
        <ThemeImage
            name="border_bar"
            tags={tags}
            src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
            layout={{ width: 12, height: 4, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `header_txt` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutHeaderTxtItemProps {
    captionHeaderTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PromoArticleLayoutHeaderTxtItem = ({ captionHeaderTxt, layout, tags }: PromoArticleLayoutHeaderTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header_txt"
            tags={tags}
            layout={{ width: 155, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHeaderTxt ?? t('landing.view.promo.article.header')}
                textStyle="text-style-il-heading-3"
            />
        </Region>
    );
};

/** Row template `hdr_line` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutHdrLineItemProps {
    layout?: BoxLayout;
    srcHdrLine?: string;
    tags?: string[];
}

export const PromoArticleLayoutHdrLineItem = ({ layout, srcHdrLine, tags }: PromoArticleLayoutHdrLineItemProps) => {
    return (
        <ThemeImage
            name="hdr_line"
            tags={tags}
            src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
            layout={{ width: 500, height: 4, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `title` of PromoArticleLayout - configured through the parent's `title` prop. */
export interface PromoArticleLayoutTitleProps {
    itemsTitle?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const PromoArticleLayoutTitle = ({ itemsTitle, layout, tags }: PromoArticleLayoutTitleProps) => {
    return (
        <Region
            name="title"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minWidth: 500, maxWidth: 500, flexDirection: 'row', gap: 4, ...layout }}
        >
            {itemsTitle ?? (
                <>
                    <PromoArticleLayoutBorderBarItem />
                    <PromoArticleLayoutHeaderTxtItem tags={[ 'COLORABLE' ]} />
                    <PromoArticleLayoutHdrLineItem />
                </>
            )}
        </Region>
    );
};

/** Named region `article_navigation` of PromoArticleLayout - configured through the parent's `articleNavigation` prop. */
export interface PromoArticleLayoutArticleNavigationProps {
    layout?: BoxLayout;
    onArticleNavigation?: () => void;
    srcNavigationDisk?: string;
    tags?: string[];
}

export const PromoArticleLayoutArticleNavigation = ({ layout, onArticleNavigation, srcNavigationDisk, tags }: PromoArticleLayoutArticleNavigationProps) => {
    const t = useTranslation();

    return (
        <Region
            name="article_navigation"
            tags={tags}
            tooltip={t('promo.article.widget.tooltip.go.to.article')}
            onPointerTap={onArticleNavigation}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8, ...layout }}
        >
            <ThemeImage
                name="navigation_disk"
                src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
            />
        </Region>
    );
};

/** Named region `article_navigation` of PromoArticleLayout - configured through the parent's `articleNavigation` prop. */
export interface PromoArticleLayoutArticleNavigation2Props {
    layout?: BoxLayout;
    onArticleNavigation?: () => void;
    srcNavigationDisk?: string;
    tags?: string[];
}

export const PromoArticleLayoutArticleNavigation2 = ({ layout, onArticleNavigation, srcNavigationDisk, tags }: PromoArticleLayoutArticleNavigation2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="article_navigation"
            tags={tags}
            tooltip={t('promo.article.widget.tooltip.go.to.article')}
            onPointerTap={onArticleNavigation}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 8, top: 0, height: 8, ...layout }}
        >
            <ThemeImage
                name="navigation_disk"
                src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
            />
        </Region>
    );
};

/** Named region `article_navigation` of PromoArticleLayout - configured through the parent's `articleNavigation` prop. */
export interface PromoArticleLayoutArticleNavigation3Props {
    layout?: BoxLayout;
    onArticleNavigation?: () => void;
    srcNavigationDisk?: string;
    tags?: string[];
}

export const PromoArticleLayoutArticleNavigation3 = ({ layout, onArticleNavigation, srcNavigationDisk, tags }: PromoArticleLayoutArticleNavigation3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="article_navigation"
            tags={tags}
            tooltip={t('promo.article.widget.tooltip.go.to.article')}
            onPointerTap={onArticleNavigation}
            cursor="pointer"
            layout={{ position: 'absolute', left: 20, width: 8, top: 0, height: 8, ...layout }}
        >
            <ThemeImage
                name="navigation_disk"
                src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
            />
        </Region>
    );
};

/** Named region `article_navigation` of PromoArticleLayout - configured through the parent's `articleNavigation` prop. */
export interface PromoArticleLayoutArticleNavigation4Props {
    layout?: BoxLayout;
    onArticleNavigation?: () => void;
    srcNavigationDisk?: string;
    tags?: string[];
}

export const PromoArticleLayoutArticleNavigation4 = ({ layout, onArticleNavigation, srcNavigationDisk, tags }: PromoArticleLayoutArticleNavigation4Props) => {
    const t = useTranslation();

    return (
        <Region
            name="article_navigation"
            tags={tags}
            tooltip={t('promo.article.widget.tooltip.go.to.article')}
            onPointerTap={onArticleNavigation}
            cursor="pointer"
            layout={{ position: 'absolute', left: 30, width: 8, top: 0, height: 8, ...layout }}
        >
            <ThemeImage
                name="navigation_disk"
                src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
            />
        </Region>
    );
};

/** Named region `article_navigation` of PromoArticleLayout - configured through the parent's `articleNavigation` prop. */
export interface PromoArticleLayoutArticleNavigation5Props {
    layout?: BoxLayout;
    onArticleNavigation?: () => void;
    srcNavigationDisk?: string;
    tags?: string[];
}

export const PromoArticleLayoutArticleNavigation5 = ({ layout, onArticleNavigation, srcNavigationDisk, tags }: PromoArticleLayoutArticleNavigation5Props) => {
    const t = useTranslation();

    return (
        <Region
            name="article_navigation"
            tags={tags}
            tooltip={t('promo.article.widget.tooltip.go.to.article')}
            onPointerTap={onArticleNavigation}
            cursor="pointer"
            layout={{ position: 'absolute', left: 40, width: 8, top: 0, height: 8, ...layout }}
        >
            <ThemeImage
                name="navigation_disk"
                src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
            />
        </Region>
    );
};

/** Named region `article_navigation` of PromoArticleLayout - configured through the parent's `articleNavigation` prop. */
export interface PromoArticleLayoutArticleNavigation6Props {
    layout?: BoxLayout;
    onArticleNavigation?: () => void;
    srcNavigationDisk?: string;
    tags?: string[];
}

export const PromoArticleLayoutArticleNavigation6 = ({ layout, onArticleNavigation, srcNavigationDisk, tags }: PromoArticleLayoutArticleNavigation6Props) => {
    const t = useTranslation();

    return (
        <Region
            name="article_navigation"
            tags={tags}
            tooltip={t('promo.article.widget.tooltip.go.to.article')}
            onPointerTap={onArticleNavigation}
            cursor="pointer"
            layout={{ position: 'absolute', left: 50, width: 8, top: 0, height: 8, ...layout }}
        >
            <ThemeImage
                name="navigation_disk"
                src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
            />
        </Region>
    );
};

/** Named region `article_navigation` of PromoArticleLayout - configured through the parent's `articleNavigation` prop. */
export interface PromoArticleLayoutArticleNavigation7Props {
    layout?: BoxLayout;
    onArticleNavigation?: () => void;
    srcNavigationDisk?: string;
    tags?: string[];
}

export const PromoArticleLayoutArticleNavigation7 = ({ layout, onArticleNavigation, srcNavigationDisk, tags }: PromoArticleLayoutArticleNavigation7Props) => {
    const t = useTranslation();

    return (
        <Region
            name="article_navigation"
            tags={tags}
            tooltip={t('promo.article.widget.tooltip.go.to.article')}
            onPointerTap={onArticleNavigation}
            cursor="pointer"
            layout={{ position: 'absolute', left: 60, width: 8, top: 0, height: 8, ...layout }}
        >
            <ThemeImage
                name="navigation_disk"
                src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
            />
        </Region>
    );
};

/** Named region `article_navigation` of PromoArticleLayout - configured through the parent's `articleNavigation` prop. */
export interface PromoArticleLayoutArticleNavigation8Props {
    layout?: BoxLayout;
    onArticleNavigation?: () => void;
    srcNavigationDisk?: string;
    tags?: string[];
}

export const PromoArticleLayoutArticleNavigation8 = ({ layout, onArticleNavigation, srcNavigationDisk, tags }: PromoArticleLayoutArticleNavigation8Props) => {
    const t = useTranslation();

    return (
        <Region
            name="article_navigation"
            tags={tags}
            tooltip={t('promo.article.widget.tooltip.go.to.article')}
            onPointerTap={onArticleNavigation}
            cursor="pointer"
            layout={{ position: 'absolute', left: 70, width: 8, top: 0, height: 8, ...layout }}
        >
            <ThemeImage
                name="navigation_disk"
                src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
            />
        </Region>
    );
};

/** Named region `article_navigation` of PromoArticleLayout - configured through the parent's `articleNavigation` prop. */
export interface PromoArticleLayoutArticleNavigation9Props {
    layout?: BoxLayout;
    onArticleNavigation?: () => void;
    srcNavigationDisk?: string;
    tags?: string[];
}

export const PromoArticleLayoutArticleNavigation9 = ({ layout, onArticleNavigation, srcNavigationDisk, tags }: PromoArticleLayoutArticleNavigation9Props) => {
    const t = useTranslation();

    return (
        <Region
            name="article_navigation"
            tags={tags}
            tooltip={t('promo.article.widget.tooltip.go.to.article')}
            onPointerTap={onArticleNavigation}
            cursor="pointer"
            layout={{ position: 'absolute', left: 80, width: 8, top: 0, height: 8, ...layout }}
        >
            <ThemeImage
                name="navigation_disk"
                src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
            />
        </Region>
    );
};

/** Named region `article_navigation` of PromoArticleLayout - configured through the parent's `articleNavigation` prop. */
export interface PromoArticleLayoutArticleNavigation10Props {
    layout?: BoxLayout;
    onArticleNavigation?: () => void;
    srcNavigationDisk?: string;
    tags?: string[];
}

export const PromoArticleLayoutArticleNavigation10 = ({ layout, onArticleNavigation, srcNavigationDisk, tags }: PromoArticleLayoutArticleNavigation10Props) => {
    const t = useTranslation();

    return (
        <Region
            name="article_navigation"
            tags={tags}
            tooltip={t('promo.article.widget.tooltip.go.to.article')}
            onPointerTap={onArticleNavigation}
            cursor="pointer"
            layout={{ position: 'absolute', left: 90, width: 8, top: 0, height: 8, ...layout }}
        >
            <ThemeImage
                name="navigation_disk"
                src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
            />
        </Region>
    );
};

/** Named region `navigation` of PromoArticleLayout - configured through the parent's `navigation` prop. */
export interface PromoArticleLayoutNavigationProps {
    articleNavigation?: PromoArticleLayoutArticleNavigationProps;
    articleNavigation10?: PromoArticleLayoutArticleNavigation10Props;
    articleNavigation2?: PromoArticleLayoutArticleNavigation2Props;
    articleNavigation3?: PromoArticleLayoutArticleNavigation3Props;
    articleNavigation4?: PromoArticleLayoutArticleNavigation4Props;
    articleNavigation5?: PromoArticleLayoutArticleNavigation5Props;
    articleNavigation6?: PromoArticleLayoutArticleNavigation6Props;
    articleNavigation7?: PromoArticleLayoutArticleNavigation7Props;
    articleNavigation8?: PromoArticleLayoutArticleNavigation8Props;
    articleNavigation9?: PromoArticleLayoutArticleNavigation9Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const PromoArticleLayoutNavigation = ({ articleNavigation, articleNavigation10, articleNavigation2, articleNavigation3, articleNavigation4, articleNavigation5, articleNavigation6, articleNavigation7, articleNavigation8, articleNavigation9, layout, tags }: PromoArticleLayoutNavigationProps) => {
    return (
        <Region
            name="navigation"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 160, top: 23, height: 10, ...layout }}
        >
            <PromoArticleLayoutArticleNavigation {...articleNavigation} />
            <PromoArticleLayoutArticleNavigation2 {...articleNavigation2} />
            <PromoArticleLayoutArticleNavigation3 {...articleNavigation3} />
            <PromoArticleLayoutArticleNavigation4 {...articleNavigation4} />
            <PromoArticleLayoutArticleNavigation5 {...articleNavigation5} />
            <PromoArticleLayoutArticleNavigation6 {...articleNavigation6} />
            <PromoArticleLayoutArticleNavigation7 {...articleNavigation7} />
            <PromoArticleLayoutArticleNavigation8 {...articleNavigation8} />
            <PromoArticleLayoutArticleNavigation9 {...articleNavigation9} />
            <PromoArticleLayoutArticleNavigation10 {...articleNavigation10} />
        </Region>
    );
};

/** Row template `promo_title` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutPromoTitleItemProps {
    captionPromoTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PromoArticleLayoutPromoTitleItem = ({ captionPromoTitle, layout, tags }: PromoArticleLayoutPromoTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="promo_title"
            tags={tags}
            layout={{ width: 330, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPromoTitle ?? t('promo.article.widget.loading')}
                textStyle="text-style-il-heading-title"
                textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
            />
        </Region>
    );
};

/** Row template `promo_text` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutPromoTextItemProps {
    captionPromoText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const PromoArticleLayoutPromoTextItem = ({ captionPromoText, layout, tags }: PromoArticleLayoutPromoTextItemProps) => {
    return (
        <Region
            name="promo_text"
            tags={tags}
            layout={{ width: 330, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPromoText ?? ''}
                textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
            />
        </Region>
    );
};

/** Row template `button` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutButtonItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
    visibleButton?: boolean;
}

export const PromoArticleLayoutButtonItem = ({ layout, onButton, tags, visibleButton }: PromoArticleLayoutButtonItemProps) => {
    return (
        <Region
            visible={visibleButton ?? false}
            layout={{ width: 52, height: 48, flexShrink: 0, maxWidth: 330, ...layout }}
        >
            <Button
                variant="100"
                name="button"
                tags={tags}
                onPointerTap={onButton}
                layout={{ width: '100%', height: '100%' }}
            />
        </Region>
    );
};

/** Named region `content` of PromoArticleLayout - configured through the parent's `content` prop. */
export interface PromoArticleLayoutContentProps {
    itemsContent?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const PromoArticleLayoutContent = ({ itemsContent, layout, tags }: PromoArticleLayoutContentProps) => {
    return (
        <Region
            name="content"
            tags={tags}
            layout={{ position: 'absolute', left: 170, width: 330, top: 0, height: 34, flexDirection: 'column', gap: 6, ...layout }}
        >
            {itemsContent ?? (
                <>
                    <PromoArticleLayoutPromoTitleItem tags={[ 'COLORABLE' ]} />
                    <PromoArticleLayoutPromoTextItem tags={[ 'COLORABLE' ]} />
                    <PromoArticleLayoutButtonItem />
                </>
            )}
        </Region>
    );
};

/** Named region `article` of PromoArticleLayout - configured through the parent's `article` prop. */
export interface PromoArticleLayoutArticleProps {
    content?: PromoArticleLayoutContentProps;
    layout?: BoxLayout;
    srcPromoImage?: string;
    tags?: string[];
}

export const PromoArticleLayoutArticle = ({ content, layout, srcPromoImage, tags }: PromoArticleLayoutArticleProps) => {
    return (
        <Region
            name="article"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 500, top: 17, height: 101, ...layout }}
        >
            <ThemeImage
                name="promo_image"
                src={srcPromoImage}
                layout={{ position: 'absolute', left: 10, width: 150, top: 19, height: 82, maxWidth: 150 }}
            />
            <PromoArticleLayoutContent {...content} />
        </Region>
    );
};

/** Named region `root` of PromoArticleLayout - configured through the parent's `root` prop. */
export interface PromoArticleLayoutRootProps {
    article?: PromoArticleLayoutArticleProps;
    layout?: BoxLayout;
    navigation?: PromoArticleLayoutNavigationProps;
    tags?: string[];
    title?: PromoArticleLayoutTitleProps;
}

export const PromoArticleLayoutRoot = ({ article, layout, navigation, tags, title }: PromoArticleLayoutRootProps) => {
    return (
        <Region
            name="root"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 118, maxWidth: 500, ...layout }}
        >
            <PromoArticleLayoutTitle {...title} />
            <PromoArticleLayoutNavigation {...navigation} />
            <PromoArticleLayoutArticle {...article} />
        </Region>
    );
};

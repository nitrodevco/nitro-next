import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `64_promo_article_xml` (layout "promo_article", 500x118) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PromoArticleLayoutProps {
    itemsContent?: ReactNode;
    itemsTitle?: ReactNode;
    layout?: BoxLayout;
    onArticleNavigation?: () => void;
    onArticleNavigation10?: () => void;
    onArticleNavigation2?: () => void;
    onArticleNavigation3?: () => void;
    onArticleNavigation4?: () => void;
    onArticleNavigation5?: () => void;
    onArticleNavigation6?: () => void;
    onArticleNavigation7?: () => void;
    onArticleNavigation8?: () => void;
    onArticleNavigation9?: () => void;
    srcNavigationDisk?: string;
    srcNavigationDisk10?: string;
    srcNavigationDisk2?: string;
    srcNavigationDisk3?: string;
    srcNavigationDisk4?: string;
    srcNavigationDisk5?: string;
    srcNavigationDisk6?: string;
    srcNavigationDisk7?: string;
    srcNavigationDisk8?: string;
    srcNavigationDisk9?: string;
    srcPromoImage?: string;
}

export const PromoArticleLayout = ({ itemsContent, itemsTitle, layout, onArticleNavigation, onArticleNavigation10, onArticleNavigation2, onArticleNavigation3, onArticleNavigation4, onArticleNavigation5, onArticleNavigation6, onArticleNavigation7, onArticleNavigation8, onArticleNavigation9, srcNavigationDisk, srcNavigationDisk10, srcNavigationDisk2, srcNavigationDisk3, srcNavigationDisk4, srcNavigationDisk5, srcNavigationDisk6, srcNavigationDisk7, srcNavigationDisk8, srcNavigationDisk9, srcPromoImage }: PromoArticleLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 118, ...layout }}>
            <Region
                name="root"
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 118, maxWidth: 500 }}
            >
                <Region
                    name="title"
                    params={147600}
                    layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 18, minWidth: 500, maxWidth: 500, flexDirection: 'row', gap: 4 }}
                >
                    {itemsTitle ?? (
                        <>
                            <PromoArticleLayoutBorderBarItem />
                            <PromoArticleLayoutHeaderTxtItem />
                            <PromoArticleLayoutHdrLineItem />
                        </>
                    )}
                </Region>
                <Region
                    name="navigation"
                    layout={{ position: 'absolute', left: 10, width: 160, top: 23, height: 10 }}
                >
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        onPointerTap={onArticleNavigation}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        onPointerTap={onArticleNavigation2}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 10, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={srcNavigationDisk2 ?? layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        onPointerTap={onArticleNavigation3}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 20, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={srcNavigationDisk3 ?? layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        onPointerTap={onArticleNavigation4}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 30, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={srcNavigationDisk4 ?? layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        onPointerTap={onArticleNavigation5}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 40, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={srcNavigationDisk5 ?? layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        onPointerTap={onArticleNavigation6}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 50, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={srcNavigationDisk6 ?? layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        onPointerTap={onArticleNavigation7}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 60, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={srcNavigationDisk7 ?? layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        onPointerTap={onArticleNavigation8}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 70, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={srcNavigationDisk8 ?? layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        onPointerTap={onArticleNavigation9}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 80, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={srcNavigationDisk9 ?? layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        onPointerTap={onArticleNavigation10}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 90, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={srcNavigationDisk10 ?? layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="article"
                    params={8536080}
                    layout={{ position: 'absolute', left: 0, width: 500, top: 17, height: 101 }}
                >
                    <ThemeImage
                        name="promo_image"
                        params={16}
                        src={srcPromoImage}
                        layout={{ position: 'absolute', left: 10, width: 150, top: 19, height: 82, maxWidth: 150 }}
                    />
                    <Region
                        name="content"
                        params={16}
                        layout={{ position: 'absolute', left: 170, width: 330, top: 0, height: 34, flexDirection: 'column', gap: 6 }}
                    >
                        {itemsContent ?? (
                            <>
                                <PromoArticleLayoutPromoTitleItem />
                                <PromoArticleLayoutPromoTextItem />
                                <PromoArticleLayoutButtonItem />
                            </>
                        )}
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `border_bar` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutBorderBarItemProps {
    layout?: BoxLayout;
    srcBorderBar?: string;
}

export const PromoArticleLayoutBorderBarItem = ({ layout, srcBorderBar }: PromoArticleLayoutBorderBarItemProps) => {
    return (
        <ThemeImage
            name="border_bar"
            params={16}
            src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
            layout={{ width: 12, height: 4, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `header_txt` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutHeaderTxtItemProps {
    captionHeaderTxt?: string;
    layout?: BoxLayout;
}

export const PromoArticleLayoutHeaderTxtItem = ({ captionHeaderTxt, layout }: PromoArticleLayoutHeaderTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header_txt"
            tags={[ 'COLORABLE' ]}
            params={16}
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
}

export const PromoArticleLayoutHdrLineItem = ({ layout, srcHdrLine }: PromoArticleLayoutHdrLineItemProps) => {
    return (
        <ThemeImage
            name="hdr_line"
            params={16}
            src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
            layout={{ width: 500, height: 4, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `promo_title` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutPromoTitleItemProps {
    captionPromoTitle?: string;
    layout?: BoxLayout;
}

export const PromoArticleLayoutPromoTitleItem = ({ captionPromoTitle, layout }: PromoArticleLayoutPromoTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="promo_title"
            tags={[ 'COLORABLE' ]}
            params={16}
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
}

export const PromoArticleLayoutPromoTextItem = ({ captionPromoText, layout }: PromoArticleLayoutPromoTextItemProps) => {
    return (
        <Region
            name="promo_text"
            tags={[ 'COLORABLE' ]}
            params={16}
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
    visibleButton?: boolean;
}

export const PromoArticleLayoutButtonItem = ({ layout, onButton, visibleButton }: PromoArticleLayoutButtonItemProps) => {
    return (
        <Region
            visible={visibleButton ?? false}
            layout={{ width: 52, height: 48, flexShrink: 0, maxWidth: 330, ...layout }}
        >
            <Button
                variant="100"
                name="button"
                params={131073}
                onPointerTap={onButton}
                layout={{ width: '100%', height: '100%' }}
            />
        </Region>
    );
};

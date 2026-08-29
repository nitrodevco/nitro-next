import { BoxLayout, Region } from '#base/theme';

import { PromoArticleLayoutRoot, PromoArticleLayoutRootProps } from './PromoArticleLayoutRoot';

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

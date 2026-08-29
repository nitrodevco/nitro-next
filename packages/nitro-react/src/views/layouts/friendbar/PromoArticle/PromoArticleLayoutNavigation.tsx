import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `navigation` of PromoArticleLayout - configured through the parent's `navigation` prop. */
export interface PromoArticleLayoutNavigationProps {
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
    srcArticleNavigationNavigationDisk?: string;
    srcArticleNavigationNavigationDisk2?: string;
    srcArticleNavigationNavigationDisk3?: string;
    srcArticleNavigationNavigationDisk4?: string;
    srcArticleNavigationNavigationDisk5?: string;
    srcArticleNavigationNavigationDisk6?: string;
    srcArticleNavigationNavigationDisk7?: string;
    srcArticleNavigationNavigationDisk8?: string;
    srcArticleNavigationNavigationDisk9?: string;
    srcNavigationDisk?: string;
}

export const PromoArticleLayoutNavigation = ({ layout, onArticleNavigation, onArticleNavigation10, onArticleNavigation2, onArticleNavigation3, onArticleNavigation4, onArticleNavigation5, onArticleNavigation6, onArticleNavigation7, onArticleNavigation8, onArticleNavigation9, srcArticleNavigationNavigationDisk, srcArticleNavigationNavigationDisk2, srcArticleNavigationNavigationDisk3, srcArticleNavigationNavigationDisk4, srcArticleNavigationNavigationDisk5, srcArticleNavigationNavigationDisk6, srcArticleNavigationNavigationDisk7, srcArticleNavigationNavigationDisk8, srcArticleNavigationNavigationDisk9, srcNavigationDisk }: PromoArticleLayoutNavigationProps) => {
    const t = useTranslation();

    return (
        <Region
            name="navigation"
            layout={{ position: 'absolute', left: 10, width: 160, top: 23, height: 10, ...layout }}
        >
            <Region
                name="article_navigation"
                tooltip={t('promo.article.widget.tooltip.go.to.article')}
                onPointerTap={onArticleNavigation}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
            >
                <ThemeImage
                    name="navigation_disk"
                    src={srcNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                />
            </Region>
            <Region
                name="article_navigation"
                tooltip={t('promo.article.widget.tooltip.go.to.article')}
                onPointerTap={onArticleNavigation2}
                cursor="pointer"
                layout={{ position: 'absolute', left: 10, width: 8, top: 0, height: 8 }}
            >
                <ThemeImage
                    name="navigation_disk"
                    src={srcArticleNavigationNavigationDisk ?? layoutImage('progress_disk_flat_off.png')}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                />
            </Region>
            <Region
                name="article_navigation"
                tooltip={t('promo.article.widget.tooltip.go.to.article')}
                onPointerTap={onArticleNavigation3}
                cursor="pointer"
                layout={{ position: 'absolute', left: 20, width: 8, top: 0, height: 8 }}
            >
                <ThemeImage
                    name="navigation_disk"
                    src={srcArticleNavigationNavigationDisk2 ?? layoutImage('progress_disk_flat_off.png')}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                />
            </Region>
            <Region
                name="article_navigation"
                tooltip={t('promo.article.widget.tooltip.go.to.article')}
                onPointerTap={onArticleNavigation4}
                cursor="pointer"
                layout={{ position: 'absolute', left: 30, width: 8, top: 0, height: 8 }}
            >
                <ThemeImage
                    name="navigation_disk"
                    src={srcArticleNavigationNavigationDisk3 ?? layoutImage('progress_disk_flat_off.png')}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                />
            </Region>
            <Region
                name="article_navigation"
                tooltip={t('promo.article.widget.tooltip.go.to.article')}
                onPointerTap={onArticleNavigation5}
                cursor="pointer"
                layout={{ position: 'absolute', left: 40, width: 8, top: 0, height: 8 }}
            >
                <ThemeImage
                    name="navigation_disk"
                    src={srcArticleNavigationNavigationDisk4 ?? layoutImage('progress_disk_flat_off.png')}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                />
            </Region>
            <Region
                name="article_navigation"
                tooltip={t('promo.article.widget.tooltip.go.to.article')}
                onPointerTap={onArticleNavigation6}
                cursor="pointer"
                layout={{ position: 'absolute', left: 50, width: 8, top: 0, height: 8 }}
            >
                <ThemeImage
                    name="navigation_disk"
                    src={srcArticleNavigationNavigationDisk5 ?? layoutImage('progress_disk_flat_off.png')}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                />
            </Region>
            <Region
                name="article_navigation"
                tooltip={t('promo.article.widget.tooltip.go.to.article')}
                onPointerTap={onArticleNavigation7}
                cursor="pointer"
                layout={{ position: 'absolute', left: 60, width: 8, top: 0, height: 8 }}
            >
                <ThemeImage
                    name="navigation_disk"
                    src={srcArticleNavigationNavigationDisk6 ?? layoutImage('progress_disk_flat_off.png')}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                />
            </Region>
            <Region
                name="article_navigation"
                tooltip={t('promo.article.widget.tooltip.go.to.article')}
                onPointerTap={onArticleNavigation8}
                cursor="pointer"
                layout={{ position: 'absolute', left: 70, width: 8, top: 0, height: 8 }}
            >
                <ThemeImage
                    name="navigation_disk"
                    src={srcArticleNavigationNavigationDisk7 ?? layoutImage('progress_disk_flat_off.png')}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                />
            </Region>
            <Region
                name="article_navigation"
                tooltip={t('promo.article.widget.tooltip.go.to.article')}
                onPointerTap={onArticleNavigation9}
                cursor="pointer"
                layout={{ position: 'absolute', left: 80, width: 8, top: 0, height: 8 }}
            >
                <ThemeImage
                    name="navigation_disk"
                    src={srcArticleNavigationNavigationDisk8 ?? layoutImage('progress_disk_flat_off.png')}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                />
            </Region>
            <Region
                name="article_navigation"
                tooltip={t('promo.article.widget.tooltip.go.to.article')}
                onPointerTap={onArticleNavigation10}
                cursor="pointer"
                layout={{ position: 'absolute', left: 90, width: 8, top: 0, height: 8 }}
            >
                <ThemeImage
                    name="navigation_disk"
                    src={srcArticleNavigationNavigationDisk9 ?? layoutImage('progress_disk_flat_off.png')}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                />
            </Region>
        </Region>
    );
};

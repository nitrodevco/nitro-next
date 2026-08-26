import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `64_promo_article_xml` (layout "promo_article", 500x118) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PromoArticleLayoutProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const PromoArticleLayout = ({ layout, onButton }: PromoArticleLayoutProps) => {
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
                    <ThemeImage
                        name="border_bar"
                        params={16}
                        src={layoutImage('illumina_light_border_top_center.png')}
                        layout={{ width: 12, height: 4, flexShrink: 0 }}
                    />
                    <Region
                        name="header_txt"
                        tags={[ 'COLORABLE' ]}
                        params={16}
                        layout={{ width: 155, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.promo.article.header')}
                            textStyle="text-style-il-heading-3"
                        />
                    </Region>
                    <ThemeImage
                        name="hdr_line"
                        params={16}
                        src={layoutImage('illumina_light_border_top_center.png')}
                        layout={{ width: 500, height: 4, flexShrink: 0 }}
                    />
                </Region>
                <Region
                    name="navigation"
                    layout={{ position: 'absolute', left: 10, width: 160, top: 23, height: 10 }}
                >
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        layout={{ position: 'absolute', left: 10, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        layout={{ position: 'absolute', left: 20, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        layout={{ position: 'absolute', left: 30, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        layout={{ position: 'absolute', left: 40, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        layout={{ position: 'absolute', left: 50, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        layout={{ position: 'absolute', left: 60, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        layout={{ position: 'absolute', left: 70, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        layout={{ position: 'absolute', left: 80, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={layoutImage('progress_disk_flat_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 8 }}
                        />
                    </Region>
                    <Region
                        name="article_navigation"
                        tooltip={t('promo.article.widget.tooltip.go.to.article')}
                        params={17}
                        layout={{ position: 'absolute', left: 90, width: 8, top: 0, height: 8 }}
                    >
                        <ThemeImage
                            name="navigation_disk"
                            params={16}
                            src={layoutImage('progress_disk_flat_off.png')}
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
                        src={undefined}
                        layout={{ position: 'absolute', left: 10, width: 150, top: 19, height: 82, maxWidth: 150 }}
                    />
                    <Region
                        name="content"
                        params={16}
                        layout={{ position: 'absolute', left: 170, width: 330, top: 0, height: 34, flexDirection: 'column', gap: 6 }}
                    >
                        <Region
                            name="promo_title"
                            tags={[ 'COLORABLE' ]}
                            params={16}
                            layout={{ width: 330, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('promo.article.widget.loading')}
                                textStyle="text-style-il-heading-title"
                                textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                            />
                        </Region>
                        <Region
                            name="promo_text"
                            tags={[ 'COLORABLE' ]}
                            params={16}
                            layout={{ width: 330, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        />
                        <Region
                            visible={false}
                            layout={{ width: 52, height: 48, flexShrink: 0, maxWidth: 330 }}
                        >
                            <Button
                                variant="100"
                                name="button"
                                params={131073}
                                onPointerTap={onButton}
                                layout={{ width: '100%', height: '100%' }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

import { CatalogWidgetEnum, getCatalogPageText } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { useCatalogPageImage } from '#base/hooks';
import { Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `guild_forum` page, `layout_guild_forum.xml` (`ctlg_default_3x3`, 360x662): the page's
 * description (`ctlg_description`, an html text that stretches with the window and is cut at its
 * box) beside the forum teaser picture, and anchored to the bottom the price, the picked group's
 * badge, the forum group selector, the warning line (the container's own `warning_text`, which the
 * warning widget draws) and the purchase widget without a gift option. The page's only offer is
 * selected by the first product auto selector, as it has no item grid.
 *
 * The layout's `${catalog_selectproduct}` label is `visible="false"` and nothing shows it, so it is
 * not drawn.
 */
export const CatalogLayoutGuildForumView = ({ page }: CatalogLayoutProps) => {
    const teaserUrl = useCatalogPageImage(page, undefined, 'catalogue/guild_forums_teaser.gif');
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.FIRST_PRODUCT_AUTO_SELECTOR}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            />
            <ThemeText
                name="ctlg_description"
                text={getCatalogPageText(page, 'ctlg_description') ?? t('loremipsum.html')}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 256 }}
                markup
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, width: 260, top: 10, bottom: 124 }}
            />
            <ThemeImage
                src={teaserUrl}
                bitmap={{}}
                layout={{ position: 'absolute', left: 254, width: 106, top: 35, height: 200 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.SIMPLE_PRICE}
                layout={{ position: 'absolute', left: 48, width: 47, bottom: 91, height: 28 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.GUILD_BADGE_VIEW}
                layout={{ position: 'absolute', left: 271, width: 40, bottom: 70, height: 40 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.GUILD_FORUM_SELECTOR}
                layout={{ position: 'absolute', left: 90, width: 180, bottom: 25, height: 85 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.WARNING}
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 30, height: 32, overflow: 'hidden' }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.PURCHASE}
                tags={[ 'NO_GIFT_OPTION' ]}
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
            />
        </Region>
    );
};

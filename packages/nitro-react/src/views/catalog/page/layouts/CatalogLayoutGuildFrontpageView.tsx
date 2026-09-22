import { CatalogWidgetEnum, getCatalogPageImage, getCatalogPageText } from '#base/context/catalog';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `guild_frontpage` page, `layout_guild_frontpage.xml` (`ctlg_guild_frontpage`, 360x460): the
 * page's headline (`ctlg_special_txt`) and description, the group purchase button
 * (`BuyGuildWidget`, whose view is its container's own button) and the page's picture at the
 * bottom (`ctlg_teaserimg_1`, a bitmap the loaded catalogue image is centred in).
 */
export const CatalogLayoutGuildFrontpageView = ({ page }: CatalogLayoutProps) => {
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const teaserImage = getCatalogPageImage(page, 'ctlg_teaserimg_1');
    const t = useTranslation();

    return (
        <Region
            name="ctlg_guild_frontpage"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            {teaserImage && (
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={catalogImageUrl.replace('%name%', teaserImage)}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, width: 359, bottom: 9, height: 163 }}
                />
            )}
            <ThemeText
                name="ctlg_special_txt"
                text={getCatalogPageText(page, 'ctlg_special_txt') ?? t('lorem.title')}
                textStyle="u_headline_medium"
                markup
                verticalAlign="top"
                layout={{ position: 'absolute', left: 15, top: 32 }}
            />
            <ThemeText
                name="ctlg_description"
                text={getCatalogPageText(page, 'ctlg_description') ?? t('lorem.header')}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 331 }}
                markup
                verticalAlign="top"
                layout={{ position: 'absolute', left: 15, width: 335, top: 76 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.BUY_GUILD}
                layout={{ position: 'absolute', left: 49, width: 267, bottom: 184, height: 45 }}
            />
        </Region>
    );
};

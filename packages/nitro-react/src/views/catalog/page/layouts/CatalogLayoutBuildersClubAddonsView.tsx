import { CatalogWidgetEnum, getCatalogPageText } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The Builders Club add-ons page, `layout_builders_club_addons.xml` (`ctlg_builders_club_addons`,
 * 360x508, the Builders Club catalogue's taller page): the page's text in the html
 * `ctlg_description` (`PageLocalization`'s `builders_club_addons` list), the `builderAddonsWidget`
 * list under it, and the two Builders Club pictures (`bc_bottom.png` under the list, `bc_top.png`
 * over it), each at its bitmap's own size (`fit_size_to_contents`). The page clips what reaches past
 * its right edge.
 */
export const CatalogLayoutBuildersClubAddonsView = ({ page }: CatalogLayoutProps) => {
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';

    return (
        <Region
            name="ctlg_builders_club_addons"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, overflow: 'hidden' }}
        >
            <ThemeText
                name="ctlg_description"
                text={getCatalogPageText(page, 'ctlg_description') ?? '<b>Formatted</b> text'}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 272 }}
                markup
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 15, width: 276, top: 28, height: 80 }}
            />
            <ThemeImage
                src={`${imageLibraryUrl}catalogue/bc_bottom.png`}
                bitmap={{ fitSizeToContents: true }}
                layout={{ position: 'absolute', left: 290, top: 316 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.BUILDER_ADDONS}
                layout={{ position: 'absolute', left: 14, width: 300, top: 108, bottom: 20 }}
            />
            <ThemeImage
                src={`${imageLibraryUrl}catalogue/bc_top.png`}
                bitmap={{ fitSizeToContents: true }}
                layout={{ position: 'absolute', left: 249, top: 21 }}
            />
        </Region>
    );
};

import { onCatalogPageLink } from '#base/commands';
import { useCatalogPageImage } from '#base/hooks';
import { Region, ThemeImage } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';

/**
 * The `monkey` page, `layout_monkey.xml` (`ctlg_monkey`, 360x460) - also what the `niko` code
 * builds (the manifest's `layout_niko` ref). Two pictures, the teaser (anchored to both edges, top
 * centred) and the store badge under it (anchored to the bottom), each in a region that
 * `LocalizationCatalogWidget.initLinks` makes clickable: both open the game's store page
 * (`onClickLink`'s `monkey` / `niko` cases, `link.format.monkey` / `link.format.niko`). The page's
 * second and third images replace the two pictures (`ctlg_teaserimg_1`, `ctlg_special_img`). No
 * widgets.
 */
export const CatalogLayoutMonkeyView = ({ page }: CatalogLayoutProps) => {
    const teaserUrl = useCatalogPageImage(page, 'ctlg_teaserimg_1', 'catalogue/catalog_monkey_teaser.gif');
    const specialUrl = useCatalogPageImage(page, 'ctlg_special_img', 'catalogue/catalog_monkey_store2_en.gif');

    return (
        <Region
            name="ctlg_monkey"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <Region
                name="ctlg_teaserimg_1_region"
                onPointerTap={() => onCatalogPageLink(page, 'ctlg_teaserimg_1_region')}
                cursor="pointer"
                layout={{ position: 'absolute', left: 10, width: 339, top: 20, bottom: 96 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={teaserUrl}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'top center' }}
                    layout={{ position: 'absolute', left: 0, width: 339, top: 0, bottom: 0 }}
                />
            </Region>
            <Region
                name="ctlg_special_img_region"
                onPointerTap={() => onCatalogPageLink(page, 'ctlg_special_img_region')}
                cursor="pointer"
                layout={{ position: 'absolute', left: 10, width: 339, bottom: 5, height: 80 }}
            >
                <ThemeImage
                    name="ctlg_special_img"
                    src={specialUrl}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, width: 339, top: 0, height: 80 }}
                />
            </Region>
        </Region>
    );
};

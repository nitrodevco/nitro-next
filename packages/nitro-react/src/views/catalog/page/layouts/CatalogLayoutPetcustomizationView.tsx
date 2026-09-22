import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `petcustomization` page, `layout_petcustomization.xml` (`ctlg_petcustomization`, 360x460):
 * the pet preview (`PetPreviewCatalogWidget`, whose view is its container's own children) over the
 * item grid, which stretches with the window, and the purchase widget at the bottom.
 *
 * The layout's `${catalog_selectproduct}` label is `visible="false"` and nothing shows it, so it is
 * not drawn.
 */
export const CatalogLayoutPetcustomizationView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_petcustomization"
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.ITEM_GRID}
            layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 35 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.PET_PREVIEW}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.PURCHASE}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
        />
    </Region>
);

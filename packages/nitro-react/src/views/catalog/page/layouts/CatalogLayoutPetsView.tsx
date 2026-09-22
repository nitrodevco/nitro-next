import { CatalogWidgetEnum } from '#base/context/catalog';
import { Region } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `pets` page, `layout_pets.xml` (`ctlg_pets`, 360x460): two embedded widgets over each other,
 * `petsWidget` (`PetsCatalogWidget`, the pet types 0-7) and `newPetsWidget` (`NewPetsCatalogWidget`,
 * 8 and up). Only one of them initialises for a page - the other's `init()` fails on the first
 * offer's pet type, and `CatalogPage.removeWidgets` takes it away with the widgets nested in it -
 * so each nests its own add-on badge, colour grid and purchase widget, which the widget draws among
 * its elements (`CatalogWidgetProps.children`).
 *
 * The old pet widget's colour grid container is `blend="0"`: its swatches take clicks but are not
 * seen.
 */
export const CatalogLayoutPetsView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_pets"
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.PETS}
            tags={[ 'EMBEDDED' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.ADDON_BADGE_VIEW}
                layout={{ position: 'absolute', left: 307, width: 40, top: 178, height: 40 }}
            />
            <Region
                alpha={0}
                layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 80 }}
            >
                <CatalogWidgetSlot
                    page={page}
                    name={CatalogWidgetEnum.COLOUR_GRID}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 80 }}
                />
            </Region>
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.PURCHASE}
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 1, height: 30 }}
            />
        </CatalogWidgetSlot>
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.NEW_PETS}
            tags={[ 'EMBEDDED' ]}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.COLOUR_GRID}
                layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 80 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.PURCHASE}
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 1, height: 30 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.ADDON_BADGE_VIEW}
                layout={{ position: 'absolute', left: 13, width: 40, top: 177, height: 40 }}
            />
        </CatalogWidgetSlot>
    </Region>
);

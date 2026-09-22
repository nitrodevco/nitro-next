import { CatalogWidgetEnum } from '#base/context/catalog';
import { useRecyclerStore } from '#base/context/recycler';
import { LayoutImage, Region, ThemeImage } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `recycler` page, `layout_recycler.xml` (`ctlg_recycler`, 360x460, stretched to the page): a
 * `0x21ffffff` fill, the `recycle_machine` (198x257 at 81,58) and the Furnimatic title (258x55 at
 * 51,5), both unstretched and centred in their boxes at their own size, and the `recyclerWidget`
 * container (360x208 at 0,258, tagged `E`). The machine is the window the recycler widget's
 * `RecyclerEngineAnimator` shakes while it runs (`recyclerMachineShake`).
 */
export const CatalogLayoutRecyclerView = ({ page }: CatalogLayoutProps) => {
    const shake = useRecyclerStore(x => x.recyclerMachineShake);

    return (
        <Region
            name="ctlg_recycler"
            backgroundColor="#ffffff"
            backgroundAlpha={0x21 / 255}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <ThemeImage
                name="recycle_machine"
                src={LayoutImage('catalog/recycler_furnimatic_machine.png')}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', fitSizeToContents: true }}
                layout={{ position: 'absolute', left: 81 + shake.x, top: 58 + shake.y }}
            />
            <ThemeImage
                src={LayoutImage('catalog/recycler_furnimatic_title.png')}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', fitSizeToContents: true }}
                layout={{ position: 'absolute', left: 51, top: 5 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.RECYCLER}
                tags={[ 'E' ]}
                layout={{ position: 'absolute', left: 0, width: 360, top: 258, height: 208 }}
            />
        </Region>
    );
};

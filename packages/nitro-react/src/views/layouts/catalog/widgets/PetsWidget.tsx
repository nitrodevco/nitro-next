import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { AddOnBadgeViewWidget, AddOnBadgeViewWidgetProps } from '#base/views/layouts/catalog/widgets/AddOnBadgeViewWidget';
import { ColourGridWidget, ColourGridWidgetProps } from '#base/views/layouts/catalog/widgets/ColourGridWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `petsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutPets_1592Layout); each passes its own placement through `layout`.
 */
/** Named region `petsWidget` of PetsWidget - configured through the parent's `petsWidget` prop. */
export interface PetsWidgetProps extends CatalogWidgetFlags {
    addOnBadgeViewWidget?: AddOnBadgeViewWidgetProps;
    captionCtlgText1?: string;
    captionCtlgText2?: string;
    captionCtlgText3?: string;
    colourGridWidget?: ColourGridWidgetProps;
    layout?: BoxLayout;
    onTypeDropMenu?: () => void;
    purchaseWidget?: PurchaseWidgetProps;
    srcCtlgTeaserimg1?: string;
}

export const PetsWidget = ({ addOnBadgeViewWidget, captionCtlgText1, captionCtlgText2, captionCtlgText3, colourGridWidget, layout, onTypeDropMenu, purchaseWidget, srcCtlgTeaserimg1 }: PetsWidgetProps) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');

    return (
        <Region
            name="petsWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <AddOnBadgeViewWidget
                layout={{ position: 'absolute', left: 307, width: 40, top: 178, height: 40 }}
                {...addOnBadgeViewWidget}
            />
            <ColourGridWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 80 }}
                {...colourGridWidget}
            />
            <Region
                name="ctlg_text_1"
                layout={{ position: 'absolute', left: 10, width: 62, top: 380, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText1 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="ctlg_text_2"
                layout={{ position: 'absolute', left: 10, width: 62, top: 225, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText2 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="ctlg_text_3"
                layout={{ position: 'absolute', left: 10, width: 62, top: 326, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText3 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Dropmenu
                variant="3"
                name="type_drop_menu"
                onPointerTap={onTypeDropMenu}
                layout={{ position: 'absolute', left: 10, width: 340, top: 344, height: 25 }}
            />
            <Border
                variant="4"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 10, width: 340, top: 398, height: 25 }}
            >
                <TextInput
                    value={nameInputTextValue}
                    onChange={setNameInputTextValue}
                    maxLength={15}
                    layout={{ position: 'absolute', left: 4, width: 325, top: 4, height: 17 }}
                />
            </Border>
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 1, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

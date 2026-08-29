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
 * (LayoutPets_1697Layout); each passes its own placement through `layout`.
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
    tintCtlgTeaserimg1?: string;
}

export const PetsWidget = ({ addOnBadgeViewWidget, captionCtlgText1, captionCtlgText2, captionCtlgText3, colourGridWidget, layout, onTypeDropMenu, purchaseWidget, srcCtlgTeaserimg1, tintCtlgTeaserimg1 }: PetsWidgetProps) => {
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
                tint={tintCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 30, height: 127 }}
            />
            <Region
                name="ctlg_text_1"
                layout={{ position: 'absolute', left: 10, width: 62, top: 270, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText1 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="ctlg_text_2"
                layout={{ position: 'absolute', left: 10, width: 62, top: 135, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText2 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="ctlg_text_3"
                layout={{ position: 'absolute', left: 10, width: 62, top: 226, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                layout={{ position: 'absolute', left: 10, width: 340, top: 244, height: 25 }}
            />
            <Border
                variant="4"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 10, width: 340, top: 288, height: 25 }}
            >
                <TextInput
                    value={nameInputTextValue}
                    onChange={setNameInputTextValue}
                    maxLength={15}
                    layout={{ position: 'absolute', left: 4, width: 325, top: 4, height: 17 }}
                />
            </Border>
            <ColourGridWidget
                layout={{ position: 'absolute', left: 7, width: 347, top: 152, height: 73 }}
                {...colourGridWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 345, height: 30 }}
                {...purchaseWidget}
            />
            <AddOnBadgeViewWidget
                layout={{ position: 'absolute', left: 30, width: 40, top: 85, height: 40 }}
                {...addOnBadgeViewWidget}
            />
        </Region>
    );
};

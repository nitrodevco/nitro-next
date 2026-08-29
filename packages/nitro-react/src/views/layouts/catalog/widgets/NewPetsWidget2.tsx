import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { AddOnBadgeViewWidget, AddOnBadgeViewWidgetProps } from '#base/views/layouts/catalog/widgets/AddOnBadgeViewWidget';
import { ColourGridWidget, ColourGridWidgetProps } from '#base/views/layouts/catalog/widgets/ColourGridWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `newPetsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutPets_1592Layout); each passes its own placement through `layout`.
 */
/** Named region `newPetsWidget` of NewPetsWidget2 - configured through the parent's `newPetsWidget` prop. */
export interface NewPetsWidget2Props extends CatalogWidgetFlags {
    addOnBadgeViewWidget?: AddOnBadgeViewWidgetProps;
    captionCtlgText2?: string;
    captionCtlgText3?: string;
    captionPetBreedText?: string;
    colourGridWidget?: ColourGridWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: PurchaseWidgetProps;
    srcCtlgTeaserimg1?: string;
    tintCtlgTeaserimg1?: string;
}

export const NewPetsWidget2 = ({ addOnBadgeViewWidget, captionCtlgText2, captionCtlgText3, captionPetBreedText, colourGridWidget, layout, purchaseWidget, srcCtlgTeaserimg1, tintCtlgTeaserimg1 }: NewPetsWidget2Props) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');

    return (
        <Region
            name="newPetsWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
                tint={tintCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <Region
                name="pet_breed_text"
                layout={{ position: 'absolute', left: 10, width: 74, top: 16, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPetBreedText ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="ctlg_text_3"
                layout={{ position: 'absolute', left: 12, width: 62, top: 326, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText3 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <ColourGridWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 245, height: 80 }}
                {...colourGridWidget}
            />
            <Region
                name="ctlg_text_2"
                layout={{ position: 'absolute', left: 12, width: 62, top: 363, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText2 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Border
                variant="4"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 10, width: 340, top: 385, height: 25 }}
            >
                <TextInput
                    value={nameInputTextValue}
                    onChange={setNameInputTextValue}
                    maxLength={16}
                    layout={{ position: 'absolute', left: 4, width: 325, top: 4, height: 17 }}
                />
            </Border>
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 1, height: 30 }}
                {...purchaseWidget}
            />
            <AddOnBadgeViewWidget
                layout={{ position: 'absolute', left: 13, width: 40, top: 177, height: 40 }}
                {...addOnBadgeViewWidget}
            />
        </Region>
    );
};

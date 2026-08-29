import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { AddOnBadgeViewWidget, AddOnBadgeViewWidgetProps } from '#base/views/layouts/catalog/widgets/AddOnBadgeViewWidget';
import { ColourGridWidget, ColourGridWidgetProps } from '#base/views/layouts/catalog/widgets/ColourGridWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';

/**
 * Catalog widget `newPetsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutPets_1697Layout); each passes its own placement through `layout`.
 */
/** Named region `newPetsWidget` of NewPetsWidget - configured through the parent's `newPetsWidget` prop. */
export interface NewPetsWidgetProps {
    addOnBadgeViewWidget?: AddOnBadgeViewWidgetProps;
    captionCtlgText2?: string;
    captionCtlgText3?: string;
    captionPetBreedText?: string;
    colourGridWidget?: ColourGridWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: PurchaseWidgetProps;
    srcCtlgTeaserimg1?: string;
    tags?: string[];
}

export const NewPetsWidget = ({ addOnBadgeViewWidget, captionCtlgText2, captionCtlgText3, captionPetBreedText, colourGridWidget, layout, purchaseWidget, srcCtlgTeaserimg1, tags }: NewPetsWidgetProps) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');

    return (
        <Region
            name="newPetsWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 30, height: 127 }}
            />
            <Region
                name="pet_breed_text"
                layout={{ position: 'absolute', left: 10, width: 340, top: 136, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPetBreedText ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="ctlg_text_3"
                layout={{ position: 'absolute', left: 12, width: 340, top: 156, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCtlgText3 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <ColourGridWidget
                layout={{ position: 'absolute', left: 5, width: 350, top: 173, height: 70 }}
                {...colourGridWidget}
            />
            <Region
                name="ctlg_text_2"
                layout={{ position: 'absolute', left: 12, width: 339, top: 253, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCtlgText2 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Border
                variant="4"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 10, width: 340, top: 275, height: 25 }}
            >
                <TextInput
                    value={nameInputTextValue}
                    onChange={setNameInputTextValue}
                    maxLength={16}
                    layout={{ position: 'absolute', left: 4, width: 325, top: 4, height: 17 }}
                />
            </Border>
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

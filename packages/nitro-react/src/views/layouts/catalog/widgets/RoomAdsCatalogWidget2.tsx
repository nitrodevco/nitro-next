import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `roomAdsCatalogWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutRoomads_1548Layout); each passes its own placement through `layout`.
 */
/** Named region `price_container` of RoomAdsCatalogWidget2 - configured through the parent's `priceContainer` prop. */
export interface RoomAdsCatalogWidget2PriceContainerProps {
    layout?: BoxLayout;
}

export const RoomAdsCatalogWidget2PriceContainer = ({ layout }: RoomAdsCatalogWidget2PriceContainerProps) => {
    return (
        <Region
            name="price_container"
            layout={{ position: 'absolute', width: 44, bottom: 58, height: 18, ...layout }}
        />
    );
};

/** Named region `roomAdsCatalogWidget` of RoomAdsCatalogWidget2 - configured through the parent's `roomAdsCatalogWidget` prop. */
export interface RoomAdsCatalogWidget2Props extends CatalogWidgetFlags {
    captionCtlgText1?: string;
    layout?: BoxLayout;
    onCategoriesList?: () => void;
    onRoomDropMenu?: () => void;
    priceContainer?: RoomAdsCatalogWidget2PriceContainerProps;
    purchaseWidget?: PurchaseWidgetProps;
}

export const RoomAdsCatalogWidget2 = ({ captionCtlgText1, layout, onCategoriesList, onRoomDropMenu, priceContainer, purchaseWidget }: RoomAdsCatalogWidget2Props) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');
    const [ descInputTextValue, setDescInputTextValue ] = useState('');

    return (
        <Region
            name="roomAdsCatalogWidget"
            layout={{ position: 'absolute', justifyContent: 'center', ...layout }}
        >
            <Region
                name="ctlg_text_1"
                layout={{ position: 'absolute', left: 10, width: 142, top: 14, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText1 ?? t('roomad.catalog_text')}
                    textStyle="text-style-u-headline-small"
                />
            </Region>
            <Dropmenu
                variant="3"
                name="categories_list"
                onPointerTap={onCategoriesList}
                layout={{ position: 'absolute', left: 10, width: 329, top: 44, height: 24 }}
            />
            <Region layout={{ position: 'absolute', left: 10, width: 105, top: 83, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('roomad.catalog_name')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 10, width: 330, top: 102, height: 33 }}
            >
                <TextInput
                    value={nameInputTextValue}
                    onChange={setNameInputTextValue}
                    maxLength={25}
                    layout={{ position: 'absolute', left: 5, width: 318, top: 5, height: 22 }}
                />
            </Border>
            <Region layout={{ position: 'absolute', left: 10, width: 132, top: 149, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('roomad.catalog_description')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 10, width: 330, top: 168, bottom: 148 }}
            >
                <TextInput
                    value={descInputTextValue}
                    onChange={setDescInputTextValue}
                    maxLength={100}
                    multiline
                    layout={{ position: 'absolute', left: 5, right: 5, top: 4, bottom: 6 }}
                />
            </Border>
            <Region layout={{ position: 'absolute', left: 10, width: 130, bottom: 119, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('roomad.catalog_roomname')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Dropmenu
                variant="3"
                name="room_drop_menu"
                onPointerTap={onRoomDropMenu}
                layout={{ position: 'absolute', left: 10, width: 330, bottom: 91, height: 24 }}
            />
            <RoomAdsCatalogWidget2PriceContainer {...priceContainer} />
            <PurchaseWidget
                noGiftOption
                roomInitiatePurchase
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 14, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

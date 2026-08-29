import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';

/**
 * Catalog widget `roomAdsCatalogWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutRoomads_1600Layout); each passes its own placement through `layout`.
 */
/** Named region `price_container` of RoomAdsCatalogWidget2 - configured through the parent's `priceContainer` prop. */
export interface RoomAdsCatalogWidget2PriceContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomAdsCatalogWidget2PriceContainer = ({ layout, tags }: RoomAdsCatalogWidget2PriceContainerProps) => {
    return (
        <Region
            name="price_container"
            tags={tags}
            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 3, height: 18, ...layout }}
        />
    );
};

/** Named region `roomAdsCatalogWidget` of RoomAdsCatalogWidget2 - configured through the parent's `roomAdsCatalogWidget` prop. */
export interface RoomAdsCatalogWidget2Props {
    captionCtlgText1?: string;
    layout?: BoxLayout;
    onRoomDropMenu?: () => void;
    priceContainer?: RoomAdsCatalogWidget2PriceContainerProps;
    purchaseWidget?: PurchaseWidgetProps;
    tags?: string[];
}

export const RoomAdsCatalogWidget2 = ({ captionCtlgText1, layout, onRoomDropMenu, priceContainer, purchaseWidget, tags }: RoomAdsCatalogWidget2Props) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');
    const [ descInputTextValue, setDescInputTextValue ] = useState('');

    return (
        <Region
            name="roomAdsCatalogWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <Region
                name="ctlg_text_1"
                layout={{ position: 'absolute', left: 10, width: 117, top: 70, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText1 ?? t('roomad.catalog_text')}
                    textStyle="text-style-u-italic"
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 10, width: 105, top: 117, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('roomad.catalog_name')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 10, width: 330, top: 137, height: 33 }}
            >
                <TextInput
                    value={nameInputTextValue}
                    onChange={setNameInputTextValue}
                    maxLength={25}
                    layout={{ position: 'absolute', left: 9, width: 291, top: 8, height: 17 }}
                />
            </Border>
            <Region layout={{ position: 'absolute', left: 10, width: 132, top: 173, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('roomad.catalog_description')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 10, width: 330, top: 193, height: 145 }}
            >
                <TextInput
                    value={descInputTextValue}
                    onChange={setDescInputTextValue}
                    maxLength={100}
                    multiline
                    layout={{ position: 'absolute', left: 9, right: 8, top: 8, bottom: 8 }}
                />
            </Border>
            <Region layout={{ position: 'absolute', left: 10, width: 130, top: 346, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('roomad.catalog_roomname')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Dropmenu
                variant="3"
                name="room_drop_menu"
                onPointerTap={onRoomDropMenu}
                layout={{ position: 'absolute', left: 10, width: 330, top: 364, height: 24 }}
            />
            <Border
                variant="0"
                name="totalprice_widget_border"
                layout={{ position: 'absolute', left: 10, width: 131, top: 396, height: 26, justifyContent: 'center' }}
            >
                <RoomAdsCatalogWidget2PriceContainer {...priceContainer} />
            </Border>
            <PurchaseWidget
                tags={[ 'NO_GIFT_OPTION', 'ROOM_INITIATE_PURCHASE' ]}
                layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

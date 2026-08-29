import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1600_layout_roomads_xml` (layout "ctlg_roomads", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRoomads_1600LayoutProps {
    layout?: BoxLayout;
    roomads?: LayoutRoomads_1600LayoutRoomadsProps;
}

export const LayoutRoomads_1600Layout = ({ layout, roomads }: LayoutRoomads_1600LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutRoomads_1600LayoutRoomads {...roomads} />
        </Region>
    );
};

/** Named region `price_container` of LayoutRoomads_1600Layout - configured through the parent's `priceContainer` prop. */
export interface LayoutRoomads_1600LayoutPriceContainerProps {
    layout?: BoxLayout;
}

export const LayoutRoomads_1600LayoutPriceContainer = ({ layout }: LayoutRoomads_1600LayoutPriceContainerProps) => {
    return (
        <Region
            name="price_container"
            params={131280}
            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 3, height: 18, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutRoomads_1600Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutRoomads_1600LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutRoomads_1600LayoutPurchaseWidget = ({ layout }: LayoutRoomads_1600LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            tags={[ 'NO_GIFT_OPTION', 'ROOM_INITIATE_PURCHASE' ]}
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30, ...layout }}
        />
    );
};

/** Named region `roomAdsCatalogWidget` of LayoutRoomads_1600Layout - configured through the parent's `roomAdsCatalogWidget` prop. */
export interface LayoutRoomads_1600LayoutRoomAdsCatalogWidgetProps {
    captionCtlgText1?: string;
    layout?: BoxLayout;
    onRoomDropMenu?: () => void;
    priceContainer?: LayoutRoomads_1600LayoutPriceContainerProps;
    purchaseWidget?: LayoutRoomads_1600LayoutPurchaseWidgetProps;
}

export const LayoutRoomads_1600LayoutRoomAdsCatalogWidget = ({ captionCtlgText1, layout, onRoomDropMenu, priceContainer, purchaseWidget }: LayoutRoomads_1600LayoutRoomAdsCatalogWidgetProps) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');
    const [ descInputTextValue, setDescInputTextValue ] = useState('');

    return (
        <Region
            name="roomAdsCatalogWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_text_1"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 117, top: 70, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText1 ?? t('roomad.catalog_text')}
                    textStyle="text-style-u-italic"
                />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 10, width: 105, top: 117, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('roomad.catalog_name')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Border
                variant="105"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 330, top: 137, height: 33 }}
            >
                <TextInput
                    value={nameInputTextValue}
                    onChange={setNameInputTextValue}
                    maxLength={25}
                    layout={{ position: 'absolute', left: 9, width: 291, top: 8, height: 17 }}
                />
            </Border>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 10, width: 132, top: 173, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('roomad.catalog_description')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Border
                variant="105"
                params={16}
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
            <Region
                params={16}
                layout={{ position: 'absolute', left: 10, width: 130, top: 346, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('roomad.catalog_roomname')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Dropmenu
                variant="3"
                name="room_drop_menu"
                params={17}
                onPointerTap={onRoomDropMenu}
                layout={{ position: 'absolute', left: 10, width: 330, top: 364, height: 24 }}
            />
            <Border
                variant="0"
                name="totalprice_widget_border"
                params={16400}
                layout={{ position: 'absolute', left: 10, width: 131, top: 396, height: 26, justifyContent: 'center' }}
            >
                <LayoutRoomads_1600LayoutPriceContainer {...priceContainer} />
            </Border>
            <LayoutRoomads_1600LayoutPurchaseWidget {...purchaseWidget} />
        </Region>
    );
};

/** Named region `roomads` of LayoutRoomads_1600Layout - configured through the parent's `roomads` prop. */
export interface LayoutRoomads_1600LayoutRoomadsProps {
    captionCtlgPrice1?: string;
    layout?: BoxLayout;
    roomAdsCatalogWidget?: LayoutRoomads_1600LayoutRoomAdsCatalogWidgetProps;
}

export const LayoutRoomads_1600LayoutRoomads = ({ captionCtlgPrice1, layout, roomAdsCatalogWidget }: LayoutRoomads_1600LayoutRoomadsProps) => {
    return (
        <Region
            name="roomads"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_price_1"
                params={16}
                layout={{ position: 'absolute', left: 242, width: 78, top: 402, height: 13, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgPrice1 ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 78 }}
                />
            </Region>
            <LayoutRoomads_1600LayoutRoomAdsCatalogWidget {...roomAdsCatalogWidget} />
        </Region>
    );
};

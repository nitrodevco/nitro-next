import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1600_layout_roomads_xml` (layout "ctlg_roomads", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRoomads_1600LayoutProps {
    captionCtlgPrice1?: string;
    captionCtlgText1?: string;
    layout?: BoxLayout;
    onRoomDropMenu?: () => void;
}

export const LayoutRoomads_1600Layout = ({ captionCtlgPrice1, captionCtlgText1, layout, onRoomDropMenu }: LayoutRoomads_1600LayoutProps) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');
    const [ descInputTextValue, setDescInputTextValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="roomads"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
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
                <Region
                    name="roomAdsCatalogWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
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
                        <Region
                            name="price_container"
                            params={131280}
                            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 3, height: 18 }}
                        />
                    </Border>
                    <Region
                        name="purchaseWidget"
                        tags={[ 'NO_GIFT_OPTION', 'ROOM_INITIATE_PURCHASE' ]}
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

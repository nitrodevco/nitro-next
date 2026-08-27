import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1548_layout_roomads_xml` (layout "ctlg_roomads", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRoomads_1548LayoutProps {
    captionCtlgPrice1?: string;
    captionCtlgText1?: string;
    layout?: BoxLayout;
    onCategoriesList?: () => void;
    onRoomDropMenu?: () => void;
}

export const LayoutRoomads_1548Layout = ({ captionCtlgPrice1, captionCtlgText1, layout, onCategoriesList, onRoomDropMenu }: LayoutRoomads_1548LayoutProps) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');
    const [ descInputTextValue, setDescInputTextValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="roomads"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <Region
                    name="ctlg_price_1"
                    params={16}
                    layout={{ position: 'absolute', left: 242, width: 78, top: 395, height: 13, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgPrice1 ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 78 }}
                    />
                </Region>
                <Region
                    name="roomAdsCatalogWidget"
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                >
                    <Region
                        name="ctlg_text_1"
                        params={16}
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
                        params={17}
                        onPointerTap={onCategoriesList}
                        layout={{ position: 'absolute', left: 10, width: 329, top: 44, height: 24 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 105, top: 83, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('roomad.catalog_name')}
                            textStyle="text-style-u-small"
                        />
                    </Region>
                    <Border
                        variant="105"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 330, top: 102, height: 33 }}
                    >
                        <TextInput
                            value={nameInputTextValue}
                            onChange={setNameInputTextValue}
                            maxLength={25}
                            layout={{ position: 'absolute', left: 5, width: 318, top: 5, height: 22 }}
                        />
                    </Border>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 132, top: 149, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('roomad.catalog_description')}
                            textStyle="text-style-u-small"
                        />
                    </Region>
                    <Border
                        variant="105"
                        params={2064}
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
                    <Region
                        params={1040}
                        layout={{ position: 'absolute', left: 10, width: 130, bottom: 119, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('roomad.catalog_roomname')}
                            textStyle="text-style-u-small"
                        />
                    </Region>
                    <Dropmenu
                        variant="3"
                        name="room_drop_menu"
                        params={1041}
                        onPointerTap={onRoomDropMenu}
                        layout={{ position: 'absolute', left: 10, width: 330, bottom: 91, height: 24 }}
                    />
                    <Region
                        name="price_container"
                        params={148688}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -22, width: 44, bottom: 58, height: 18 }}
                    />
                    <Region
                        name="purchaseWidget"
                        tags={[ 'NO_GIFT_OPTION', 'ROOM_INITIATE_PURCHASE' ]}
                        params={1040}
                        layout={{ position: 'absolute', left: 0, width: 360, bottom: 14, height: 30 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

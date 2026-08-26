import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1697_layout_pets_xml` (layout "ctlg_pets", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPets_1697LayoutProps {
    layout?: BoxLayout;
    onTypeDropMenu?: () => void;
}

export const LayoutPets_1697Layout = ({ layout, onTypeDropMenu }: LayoutPets_1697LayoutProps) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');
    const [ nameInputTextValue2, setNameInputTextValue2 ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_pets"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="petsWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 359, top: 75, height: 377 }}
                >
                    <ThemeImage
                        name="ctlg_teaserimg_1"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 30, height: 127 }}
                    />
                    <Region
                        name="ctlg_text_1"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 62, top: 270, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('lorem.title')}
                            textStyle="text-style-u-small"
                        />
                    </Region>
                    <Region
                        name="ctlg_text_2"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 62, top: 135, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('lorem.title')}
                            textStyle="text-style-u-small"
                        />
                    </Region>
                    <Region
                        name="ctlg_text_3"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 62, top: 226, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('lorem.title')}
                            textStyle="text-style-u-small"
                        />
                    </Region>
                    <Dropmenu
                        variant="3"
                        name="type_drop_menu"
                        params={17}
                        onPointerTap={onTypeDropMenu}
                        layout={{ position: 'absolute', left: 10, width: 340, top: 244, height: 25 }}
                    />
                    <Border
                        variant="4"
                        params={16}
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
                    <Region
                        name="colourGridWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 7, width: 347, top: 152, height: 73 }}
                    />
                    <Region
                        name="purchaseWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 345, height: 30 }}
                    />
                    <Region
                        name="addOnBadgeViewWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 40, top: 85, height: 40 }}
                    />
                </Region>
                <Region
                    name="newPetsWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 359, top: 75, height: 375 }}
                >
                    <ThemeImage
                        name="ctlg_teaserimg_1"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 30, height: 127 }}
                    />
                    <Region
                        name="pet_breed_text"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 340, top: 136, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('lorem.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="ctlg_text_3"
                        params={16}
                        layout={{ position: 'absolute', left: 12, width: 340, top: 156, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('lorem.title')}
                            textStyle="text-style-u-small"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="colourGridWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 5, width: 350, top: 173, height: 70 }}
                    />
                    <Region
                        name="ctlg_text_2"
                        params={16}
                        layout={{ position: 'absolute', left: 12, width: 339, top: 253, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('lorem.title')}
                            textStyle="text-style-u-small"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Border
                        variant="4"
                        params={16}
                        tintColor="#cccccc"
                        layout={{ position: 'absolute', left: 10, width: 340, top: 275, height: 25 }}
                    >
                        <TextInput
                            value={nameInputTextValue2}
                            onChange={setNameInputTextValue2}
                            maxLength={16}
                            layout={{ position: 'absolute', left: 4, width: 325, top: 4, height: 17 }}
                        />
                    </Border>
                    <Region
                        name="purchaseWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 345, height: 30 }}
                    />
                    <Region
                        name="addOnBadgeViewWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 40, top: 85, height: 40 }}
                    />
                </Region>
                <Region
                    name="ctlg_price_1"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 267, width: 78, top: 426, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text="0"
                        textStyle="text-style-u-small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 78, align: 'right' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

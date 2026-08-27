import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1592_layout_pets_xml` (layout "ctlg_pets", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPets_1592LayoutProps {
    captionCtlgText1?: string;
    captionCtlgText2?: string;
    captionCtlgText22?: string;
    captionCtlgText3?: string;
    captionCtlgText32?: string;
    captionPetBreedText?: string;
    layout?: BoxLayout;
    onTypeDropMenu?: () => void;
    srcCtlgTeaserimg1?: string;
    srcCtlgTeaserimg12?: string;
}

export const LayoutPets_1592Layout = ({ captionCtlgText1, captionCtlgText2, captionCtlgText22, captionCtlgText3, captionCtlgText32, captionPetBreedText, layout, onTypeDropMenu, srcCtlgTeaserimg1, srcCtlgTeaserimg12 }: LayoutPets_1592LayoutProps) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');
    const [ nameInputTextValue2, setNameInputTextValue2 ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_pets"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <Region
                    name="petsWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                >
                    <ThemeImage
                        name="ctlg_teaserimg_1"
                        params={16}
                        src={srcCtlgTeaserimg1}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                    />
                    <Region
                        name="addOnBadgeViewWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 307, width: 40, top: 178, height: 40 }}
                    />
                    <Region
                        name="colourGridWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 80 }}
                    />
                    <Region
                        name="ctlg_text_1"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 62, top: 380, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCtlgText1 ?? t('lorem.title')}
                            textStyle="text-style-u-small"
                        />
                    </Region>
                    <Region
                        name="ctlg_text_2"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 62, top: 225, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCtlgText2 ?? t('lorem.title')}
                            textStyle="text-style-u-small"
                        />
                    </Region>
                    <Region
                        name="ctlg_text_3"
                        params={16}
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
                        params={17}
                        onPointerTap={onTypeDropMenu}
                        layout={{ position: 'absolute', left: 10, width: 340, top: 344, height: 25 }}
                    />
                    <Border
                        variant="4"
                        params={16}
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
                    <Region
                        name="purchaseWidget"
                        params={1040}
                        layout={{ position: 'absolute', left: 0, width: 360, bottom: 1, height: 30 }}
                    />
                </Region>
                <Region
                    name="newPetsWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                >
                    <ThemeImage
                        name="ctlg_teaserimg_1"
                        params={16}
                        src={srcCtlgTeaserimg12}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                    />
                    <Region
                        name="pet_breed_text"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 74, top: 16, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPetBreedText ?? t('lorem.title')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <Region
                        name="ctlg_text_3"
                        params={16}
                        layout={{ position: 'absolute', left: 12, width: 62, top: 326, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCtlgText32 ?? t('lorem.title')}
                            textStyle="text-style-u-small"
                        />
                    </Region>
                    <Region
                        name="colourGridWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 80 }}
                    />
                    <Region
                        name="ctlg_text_2"
                        params={16}
                        layout={{ position: 'absolute', left: 12, width: 62, top: 363, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCtlgText22 ?? t('lorem.title')}
                            textStyle="text-style-u-small"
                        />
                    </Region>
                    <Border
                        variant="4"
                        params={16}
                        tintColor="#cccccc"
                        layout={{ position: 'absolute', left: 10, width: 340, top: 385, height: 25 }}
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
                        params={1040}
                        layout={{ position: 'absolute', left: 0, width: 360, bottom: 1, height: 30 }}
                    />
                    <Region
                        name="addOnBadgeViewWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 13, width: 40, top: 177, height: 40 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

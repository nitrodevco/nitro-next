import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1105_petpackage_new_xml` (layout "petpackage_new", 475x250) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetpackageNewLayoutProps {
    captionCancel?: string;
    captionPetpackageHeaderDescription?: string;
    captionPetpackageHeaderTitle?: string;
    layout?: BoxLayout;
    onCancel?: () => void;
    onClose?: () => void;
    onPickName?: () => void;
    petpackageHeaderBackgroundBody?: ReactNode;
    srcPetpackageHeaderIcon?: string;
}

export const PetpackageNewLayout = ({ captionCancel, captionPetpackageHeaderDescription, captionPetpackageHeaderTitle, layout, onCancel, onClose, onPickName, petpackageHeaderBackgroundBody, srcPetpackageHeaderIcon }: PetpackageNewLayoutProps) => {
    const t = useTranslation();
    const [ inputValue, setInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="petpackage_main_container"
            name="petpackage_main_container"
            caption={t('widgets.petpackage.name.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 475, height: 250, minWidth: 475, minHeight: 250, ...layout }}
        >
            <Region
                name="petpackage.header.background.border"
                backgroundColor="#376275"
                layout={{ position: 'absolute', left: 1, right: -11, top: 0, height: 100 }}
            >
                <Region
                    name="petpackage.header.background.body"
                    backgroundColor="#0e3f52"
                    layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 95 }}
                >
                    {petpackageHeaderBackgroundBody}
                </Region>
                <ThemeImage
                    name="petpackage.header.icon"
                    src={srcPetpackageHeaderIcon ?? '${image.library.url}client_static/petpackage_box.png'}
                    layout={{ position: 'absolute', left: 3, width: 85, top: 5, height: 93 }}
                />
                <Region
                    name="petpackage.header"
                    layout={{ position: 'absolute', left: 0, width: 475, top: 0, height: 90 }}
                >
                    <Region
                        name="petpackage.header.title"
                        layout={{ position: 'absolute', left: 95, width: 280, top: 11, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPetpackageHeaderTitle ?? t('petpackage.header.title')}
                            textStyle="text-style-u-headline-big"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="petpackage.header.description"
                        layout={{ position: 'absolute', left: 95, width: 354, top: 41, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPetpackageHeaderDescription ?? t('widgets.petpackage.name.select')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 354 }}
                        />
                    </Region>
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 475, top: 90, height: 124 }}>
                <Border
                    variant="0"
                    name="input_border"
                    layout={{ position: 'absolute', left: 17, width: 417, top: 25, height: 34 }}
                >
                    <TextInput
                        value={inputValue}
                        onChange={setInputValue}
                        maxLength={15}
                        textColor="#888888"
                        layout={{ position: 'absolute', left: 7, width: 380, top: 6, height: 17 }}
                    />
                    <ThemeImage
                        src={layoutImage('common_small_pen.png')}
                        layout={{ position: 'absolute', left: 393, width: 17, top: 8, height: 18 }}
                    />
                </Border>
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 64, height: 51 }}>
                    <Region
                        name="cancel"
                        onPointerTap={onCancel}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 107, width: 101, bottom: 8, height: 32, justifyContent: 'center' }}
                    >
                        <Region
                            name="cancel"
                            layout={{ position: 'absolute', width: 83, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCancel ?? t('generic.cancel')}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="pick_name"
                        tintColor="#00aa00"
                        onPointerTap={onPickName}
                        layout={{ position: 'absolute', left: 239, width: 195, bottom: 8, height: 33, minWidth: 130 }}
                    >
                        {t('widgets.petpackage.name.pick')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};

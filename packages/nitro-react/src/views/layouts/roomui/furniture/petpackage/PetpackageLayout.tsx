import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `969_petpackage_xml` (layout "open_petpackage", 280x160) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetpackageLayoutProps {
    captionCancel?: string;
    captionInfoText?: string;
    layout?: BoxLayout;
    onCancel?: () => void;
    onPickName?: () => void;
    srcPetImage?: string;
    tintPetImage?: string;
}

export const PetpackageLayout = ({ captionCancel, captionInfoText, layout, onCancel, onPickName, srcPetImage, tintPetImage }: PetpackageLayoutProps) => {
    const t = useTranslation();
    const [ inputValue, setInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 280, height: 160, ...layout }}>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 267, top: 0, height: 128 }}
            >
                <Border
                    variant="0"
                    name="input_border"
                    layout={{ position: 'absolute', right: 9, width: 175, alignSelf: 'center', marginTop: -2.5, marginBottom: 2.5, height: 25 }}
                >
                    <TextInput
                        value={inputValue}
                        onChange={setInputValue}
                        maxLength={15}
                        layout={{ position: 'absolute', left: 7, right: 8, top: 4, bottom: 4 }}
                    />
                </Border>
                <ThemeText
                    text={captionInfoText ?? t('widgets.petpackage.name.select')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 174 }}
                    name="info_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 9, width: 174, top: 16, height: 30 }}
                />
                <ButtonThick
                    variant="3"
                    name="pick_name"
                    onPointerTap={onPickName}
                    layout={{ position: 'absolute', left: 131, width: 175, bottom: 9, height: 28, minWidth: 125, maxWidth: 175 }}
                >
                    {t('widgets.petpackage.name.pick')}
                </ButtonThick>
                <Region
                    name="cancel"
                    onPointerTap={onCancel}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 10, width: 68, bottom: 9, height: 29 }}
                >
                    <ThemeText
                        text={captionCancel ?? t('generic.cancel')}
                        textOptions={{ align: 'center' }}
                        name="cancel"
                        layout={{ position: 'absolute', left: 1, right: 3, top: 6, bottom: 6 }}
                    />
                </Region>
                <Border
                    variant="0"
                    name="pet_img_bg_box"
                    tintColor="#f0f0f0"
                    layout={{ position: 'absolute', left: 11, width: 64, top: 11, height: 64, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="pet_image"
                        src={srcPetImage}
                        tint={tintPetImage}
                        layout={{ position: 'absolute', width: 60, alignSelf: 'center', height: 60, minWidth: 60, maxWidth: 60, minHeight: 60, maxHeight: 60 }}
                    />
                </Border>
            </Border>
        </Region>
    );
};

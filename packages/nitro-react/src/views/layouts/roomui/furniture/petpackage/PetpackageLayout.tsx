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
}

export const PetpackageLayout = ({ captionCancel, captionInfoText, layout, onCancel, onPickName, srcPetImage }: PetpackageLayoutProps) => {
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
                    params={16}
                    layout={{ position: 'absolute', left: 83, width: 175, top: 49, height: 25 }}
                >
                    <TextInput
                        value={inputValue}
                        onChange={setInputValue}
                        maxLength={15}
                        layout={{ position: 'absolute', left: 7, width: 160, top: 4, height: 17 }}
                    />
                </Border>
                <Region
                    name="info_text"
                    params={16}
                    layout={{ position: 'absolute', left: 84, width: 174, top: 16, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoText ?? t('widgets.petpackage.name.select')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 174 }}
                    />
                </Region>
                <ButtonThick
                    variant="3"
                    name="pick_name"
                    params={131089}
                    onPointerTap={onPickName}
                    layout={{ position: 'absolute', left: 131, width: 175, top: 91, height: 28, minWidth: 125, maxWidth: 175 }}
                >
                    {t('widgets.petpackage.name.pick')}
                </ButtonThick>
                <Region
                    name="cancel"
                    params={17}
                    onPointerTap={onCancel}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 10, width: 68, top: 90, height: 29 }}
                >
                    <Region
                        name="cancel"
                        params={16}
                        layout={{ position: 'absolute', left: 1, width: 64, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionCancel ?? t('generic.cancel')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
                <Border
                    variant="0"
                    name="pet_img_bg_box"
                    params={16}
                    tintColor="#f0f0f0"
                    layout={{ position: 'absolute', left: 11, width: 64, top: 11, height: 64, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="pet_image"
                        params={3932176}
                        src={srcPetImage}
                        layout={{ position: 'absolute', width: 60, alignSelf: 'center', height: 60, minWidth: 60, maxWidth: 60, minHeight: 60, maxHeight: 60 }}
                    />
                </Border>
            </Border>
        </Region>
    );
};

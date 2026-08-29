import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `969_petpackage_xml` (layout "open_petpackage", 280x160) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetpackageLayoutProps {
    cancel?: PetpackageLayoutCancelProps;
    captionInfoText?: string;
    layout?: BoxLayout;
    onPickName?: () => void;
    srcPetImage?: string;
}

export const PetpackageLayout = ({ cancel, captionInfoText, layout, onPickName, srcPetImage }: PetpackageLayoutProps) => {
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
                    onPointerTap={onPickName}
                    layout={{ position: 'absolute', left: 131, width: 175, top: 91, height: 28, minWidth: 125, maxWidth: 175 }}
                >
                    {t('widgets.petpackage.name.pick')}
                </ButtonThick>
                <PetpackageLayoutCancel {...cancel} />
                <Border
                    variant="0"
                    name="pet_img_bg_box"
                    tintColor="#f0f0f0"
                    layout={{ position: 'absolute', left: 11, width: 64, top: 11, height: 64, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="pet_image"
                        src={srcPetImage}
                        layout={{ position: 'absolute', width: 60, alignSelf: 'center', height: 60, minWidth: 60, maxWidth: 60, minHeight: 60, maxHeight: 60 }}
                    />
                </Border>
            </Border>
        </Region>
    );
};

/** Named region `cancel` of PetpackageLayout - configured through the parent's `cancel` prop. */
export interface PetpackageLayoutCancelProps {
    captionCancel?: string;
    layout?: BoxLayout;
    onCancel?: () => void;
}

export const PetpackageLayoutCancel = ({ captionCancel, layout, onCancel }: PetpackageLayoutCancelProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel"
            onPointerTap={onCancel}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 68, top: 90, height: 29, ...layout }}
        >
            <Region
                name="cancel"
                layout={{ position: 'absolute', left: 1, width: 64, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCancel ?? t('generic.cancel')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

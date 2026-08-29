import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Icon, Region, TextInput, ThemeImage } from '#base/theme';

/** Generated from `962_mannequin_controller_main_xml` (layout "mannequin_owner_main", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MannequinControllerMainLayoutProps {
    layout?: BoxLayout;
    onConfigureButton?: () => void;
    onWearButton?: () => void;
    srcPreviewImage?: string;
    srcWriteDeco?: string;
    tintPreviewImage?: string;
    tintWriteDeco?: string;
}

export const MannequinControllerMainLayout = ({ layout, onConfigureButton, onWearButton, srcPreviewImage, srcWriteDeco, tintPreviewImage, tintWriteDeco }: MannequinControllerMainLayoutProps) => {
    const t = useTranslation();
    const [ outfitNameSetValue, setOutfitNameSetValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 386, top: 0, height: 180 }}>
                <TextInput
                    value={outfitNameSetValue}
                    onChange={setOutfitNameSetValue}
                    maxLength={30}
                    layout={{ position: 'absolute', left: 133, width: 190, top: 25, height: 21 }}
                />
                <ThemeImage
                    name="write_deco"
                    src={srcWriteDeco}
                    tint={tintWriteDeco}
                    layout={{ position: 'absolute', left: 330, width: 17, top: 27, height: 18 }}
                />
                <ButtonThick
                    variant="3"
                    name="configure_button"
                    onPointerTap={onConfigureButton}
                    layout={{ position: 'absolute', left: 133, width: 219, top: 58, height: 28, minWidth: 219 }}
                >
                    {t('mannequin.widget.style')}
                </ButtonThick>
                <Button
                    variant="3"
                    name="wear_button"
                    onPointerTap={onWearButton}
                    layout={{ position: 'absolute', left: 133, width: 219, top: 98, height: 28, minWidth: 219 }}
                >
                    {t('mannequin.widget.wear')}
                </Button>
                <ThemeImage
                    name="preview_image"
                    src={srcPreviewImage}
                    tint={tintPreviewImage}
                    layout={{ position: 'absolute', left: 20, width: 83, top: 10, height: 130 }}
                />
                <Icon
                    variant="0"
                    name="club_icon"
                    layout={{ position: 'absolute', left: 80, width: 43, top: 110, height: 29 }}
                />
            </Region>
        </Region>
    );
};

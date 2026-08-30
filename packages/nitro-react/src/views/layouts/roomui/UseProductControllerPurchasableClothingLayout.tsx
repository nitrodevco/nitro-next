import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1011_use_product_controller_purchasable_clothing_xml` (layout "use_product_purchasable_clothing", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerPurchasableClothingLayoutProps {
    avatarPreview?: ReactNode;
    cancelText?: ReactNode;
    captionDescription?: string;
    captionInfo?: string;
    layout?: BoxLayout;
    onCancelText?: () => void;
    onSaveButton?: () => void;
}

export const UseProductControllerPurchasableClothingLayout = ({ avatarPreview, cancelText, captionDescription, captionInfo, layout, onCancelText, onSaveButton }: UseProductControllerPurchasableClothingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
                <ButtonThick
                    variant="3"
                    name="save_button"
                    onPointerTap={onSaveButton}
                    layout={{ position: 'absolute', right: 11, width: 145, top: 112, height: 28, minWidth: 130, maxWidth: 145 }}
                >
                    {t('useproduct.widget.bind_clothing')}
                </ButtonThick>
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_preview"
                    layout={{ position: 'absolute', left: 10, width: 90, top: 10, height: 130 }}
                >
                    {avatarPreview}
                </WidgetSlot>
                <ThemeText
                    text={captionDescription ?? t('useproduct.widget.text.bind_clothing')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    name="description"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 140, width: 200, top: 15, height: 61, minWidth: 200, maxWidth: 200 }}
                />
                <Region
                    name="cancel_text"
                    onPointerTap={onCancelText}
                    cursor="pointer"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 65, top: 118, height: 25 }}
                >
                    {cancelText}
                </Region>
                <ThemeText
                    text={t('useproduct.widget.cancel')}
                    layout={{ position: 'absolute', marginLeft: 2, marginRight: -2, width: 70, top: 120, height: 25 }}
                />
                <ThemeText
                    text={captionInfo ?? t('useproduct.widget.info.bind_clothing')}
                    textStyle="text-style-u-italic"
                    textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    name="info"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 140, width: 200, top: 60, height: 40, minWidth: 200, maxWidth: 200 }}
                />
            </Region>
        </Region>
    );
};

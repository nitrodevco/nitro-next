import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1011_use_product_controller_purchasable_clothing_xml` (layout "use_product_purchasable_clothing", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerPurchasableClothingLayoutProps {
    captionDescription?: string;
    captionInfo?: string;
    layout?: BoxLayout;
    onCancelText?: () => void;
    onSaveButton?: () => void;
}

export const UseProductControllerPurchasableClothingLayout = ({ captionDescription, captionInfo, layout, onCancelText, onSaveButton }: UseProductControllerPurchasableClothingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 386, top: 0, height: 180 }}
            >
                <ButtonThick
                    variant="3"
                    name="save_button"
                    params={131089}
                    onPointerTap={onSaveButton}
                    layout={{ position: 'absolute', left: 230, width: 145, top: 112, height: 28, minWidth: 130, maxWidth: 145 }}
                >
                    {t('useproduct.widget.bind_clothing')}
                </ButtonThick>
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_preview"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 90, top: 10, height: 130 }}
                />
                <Region
                    name="description"
                    params={16}
                    layout={{ position: 'absolute', left: 140, width: 200, top: 15, height: 61, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? t('useproduct.widget.text.bind_clothing')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    />
                </Region>
                <Region
                    name="cancel_text"
                    params={17}
                    onPointerTap={onCancelText}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 160, width: 65, top: 118, height: 25 }}
                />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 160, width: 70, top: 120, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={t('useproduct.widget.cancel')} />
                </Region>
                <Region
                    name="info"
                    params={16}
                    layout={{ position: 'absolute', left: 140, width: 200, top: 60, height: 40, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfo ?? t('useproduct.widget.info.bind_clothing')}
                        textStyle="text-style-u-italic"
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

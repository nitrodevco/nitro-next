import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { PetPreviewWidget, PetPreviewWidgetProps } from '#base/views/layouts/catalog/widgets/PetPreviewWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';

/** Named region `ctlg_petcustomization` of LayoutPetcustomization_1656Layout - configured through the parent's `ctlgPetcustomization` prop. */
export interface LayoutPetcustomization_1656LayoutCtlgPetcustomizationProps {
    captionCtlgSelectproduct?: string;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    petPreviewWidget?: PetPreviewWidgetProps;
    purchaseWidget?: PurchaseWidgetProps;
    visibleCtlgSelectproduct?: boolean;
}

export const LayoutPetcustomization_1656LayoutCtlgPetcustomization = ({ captionCtlgSelectproduct, itemGridWidget, layout, petPreviewWidget, purchaseWidget, visibleCtlgSelectproduct }: LayoutPetcustomization_1656LayoutCtlgPetcustomizationProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_petcustomization"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            {(visibleCtlgSelectproduct ?? false) && (
                <Region
                    name="ctlg_selectproduct"
                    layout={{ position: 'absolute', left: 8, width: 107, top: 133, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
            )}
            <ItemGridWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 245, bottom: 35 }}
                {...itemGridWidget}
            />
            <PetPreviewWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 240 }}
                {...petPreviewWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

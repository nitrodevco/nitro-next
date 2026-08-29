import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { PetPreviewWidget, PetPreviewWidgetProps } from '#base/views/layouts/catalog/widgets/PetPreviewWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';

/** Named region `ctlg_petcustomization` of LayoutPetcustomization_1713Layout - configured through the parent's `ctlgPetcustomization` prop. */
export interface LayoutPetcustomization_1713LayoutCtlgPetcustomizationProps {
    captionCtlgSelectproduct?: string;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    petPreviewWidget?: PetPreviewWidgetProps;
    purchaseWidget?: PurchaseWidgetProps;
}

export const LayoutPetcustomization_1713LayoutCtlgPetcustomization = ({ captionCtlgSelectproduct, itemGridWidget, layout, petPreviewWidget, purchaseWidget }: LayoutPetcustomization_1713LayoutCtlgPetcustomizationProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_petcustomization"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
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
            <ItemGridWidget
                layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 275 }}
                {...itemGridWidget}
            />
            <PetPreviewWidget
                layout={{ position: 'absolute', left: 180, width: 175, top: 150, height: 275 }}
                {...petPreviewWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

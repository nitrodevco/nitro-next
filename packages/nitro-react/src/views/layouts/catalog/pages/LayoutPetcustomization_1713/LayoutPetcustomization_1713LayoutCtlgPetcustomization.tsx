import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { PetPreviewWidget2, PetPreviewWidget2Props } from '#base/views/layouts/catalog/widgets/PetPreviewWidget2';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';

/** Named region `ctlg_petcustomization` of LayoutPetcustomization_1713Layout - configured through the parent's `ctlgPetcustomization` prop. */
export interface LayoutPetcustomization_1713LayoutCtlgPetcustomizationProps {
    captionCtlgSelectproduct?: string;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    petPreviewWidget?: PetPreviewWidget2Props;
    purchaseWidget?: PurchaseWidgetProps;
}

export const LayoutPetcustomization_1713LayoutCtlgPetcustomization = ({ captionCtlgSelectproduct, itemGridWidget, layout, petPreviewWidget, purchaseWidget }: LayoutPetcustomization_1713LayoutCtlgPetcustomizationProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_petcustomization"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeText
                text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                textStyle="text-style-u-small"
                textOptions={{ fill: '#666666' }}
                name="ctlg_selectproduct"
                layout={{ position: 'absolute', left: 8, width: 107, top: 133, height: 15 }}
            />
            <ItemGridWidget
                layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 275 }}
                {...itemGridWidget}
            />
            <PetPreviewWidget2
                layout={{ position: 'absolute', right: 5, width: 175, top: 150, height: 275 }}
                {...petPreviewWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

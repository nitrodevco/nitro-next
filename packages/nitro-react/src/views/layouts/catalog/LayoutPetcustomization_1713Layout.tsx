import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { PetPreviewWidget2, PetPreviewWidget2Props } from '#base/views/layouts/catalog/widgets/PetPreviewWidget2';
import { PurchaseWidget2, PurchaseWidget2Props } from '#base/views/layouts/catalog/widgets/PurchaseWidget2';

/** Generated from `1713_layout_petcustomization_xml` (layout "ctlg_petcustomization", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPetcustomization_1713LayoutProps {
    ctlgPetcustomization?: LayoutPetcustomization_1713LayoutCtlgPetcustomizationProps;
    layout?: BoxLayout;
}

export const LayoutPetcustomization_1713Layout = ({ ctlgPetcustomization, layout }: LayoutPetcustomization_1713LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutPetcustomization_1713LayoutCtlgPetcustomization {...ctlgPetcustomization} />
        </Region>
    );
};

/** Named region `ctlg_petcustomization` of LayoutPetcustomization_1713Layout - configured through the parent's `ctlgPetcustomization` prop. */
export interface LayoutPetcustomization_1713LayoutCtlgPetcustomizationProps {
    captionCtlgSelectproduct?: string;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    petPreviewWidget?: PetPreviewWidget2Props;
    purchaseWidget?: PurchaseWidget2Props;
}

export const LayoutPetcustomization_1713LayoutCtlgPetcustomization = ({ captionCtlgSelectproduct, itemGridWidget, layout, petPreviewWidget, purchaseWidget }: LayoutPetcustomization_1713LayoutCtlgPetcustomizationProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_petcustomization"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                params={16}
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
            <PetPreviewWidget2
                layout={{ position: 'absolute', left: 180, width: 175, top: 150, height: 275 }}
                {...petPreviewWidget}
            />
            <PurchaseWidget2
                layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

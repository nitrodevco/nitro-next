import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { PetPreviewWidget2, PetPreviewWidget2Props } from '#base/views/layouts/catalog/widgets/PetPreviewWidget2';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';

/** Generated from `1656_layout_petcustomization_xml` (layout "ctlg_petcustomization", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPetcustomization_1656LayoutProps {
    ctlgPetcustomization?: LayoutPetcustomization_1656LayoutCtlgPetcustomizationProps;
    layout?: BoxLayout;
}

export const LayoutPetcustomization_1656Layout = ({ ctlgPetcustomization, layout }: LayoutPetcustomization_1656LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutPetcustomization_1656LayoutCtlgPetcustomization {...ctlgPetcustomization} />
        </Region>
    );
};

/** Named region `ctlg_petcustomization` of LayoutPetcustomization_1656Layout - configured through the parent's `ctlgPetcustomization` prop. */
export interface LayoutPetcustomization_1656LayoutCtlgPetcustomizationProps {
    captionCtlgSelectproduct?: string;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    petPreviewWidget?: PetPreviewWidget2Props;
    purchaseWidget?: PurchaseWidgetProps;
    tags?: string[];
}

export const LayoutPetcustomization_1656LayoutCtlgPetcustomization = ({ captionCtlgSelectproduct, itemGridWidget, layout, petPreviewWidget, purchaseWidget, tags }: LayoutPetcustomization_1656LayoutCtlgPetcustomizationProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_petcustomization"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                visible={false}
                layout={{ position: 'absolute', left: 8, width: 107, top: 133, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <ItemGridWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 35 }}
                {...itemGridWidget}
            />
            <PetPreviewWidget2
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                {...petPreviewWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

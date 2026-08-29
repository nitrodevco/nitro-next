import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

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

/** Named region `itemGridWidget` of LayoutPetcustomization_1656Layout - configured through the parent's `itemGridWidget` prop. */
export interface LayoutPetcustomization_1656LayoutItemGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutPetcustomization_1656LayoutItemGridWidget = ({ layout }: LayoutPetcustomization_1656LayoutItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 35, ...layout }}
        />
    );
};

/** Named region `petPreviewWidget` of LayoutPetcustomization_1656Layout - configured through the parent's `petPreviewWidget` prop. */
export interface LayoutPetcustomization_1656LayoutPetPreviewWidgetProps {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
    visiblePetPreviewBackground?: boolean;
}

export const LayoutPetcustomization_1656LayoutPetPreviewWidget = ({ captionCtlgDescription, captionCtlgProductName, layout, srcCtlgTeaserimg1, visiblePetPreviewBackground }: LayoutPetcustomization_1656LayoutPetPreviewWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="petPreviewWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240, ...layout }}
        >
            <Region
                visible={visiblePetPreviewBackground ?? false}
                layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 275 }}
            >
                <Border
                    variant="4"
                    name="petPreviewBackground"
                    params={16}
                    tintColor="#cccccc"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <Region
                name="ctlg_product_name"
                params={16}
                layout={{ position: 'absolute', left: 8, width: 74, top: 12, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgProductName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="ctlg_description"
                params={16}
                layout={{ position: 'absolute', left: 8, width: 162, top: 31, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.title')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 162 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `purchaseWidget` of LayoutPetcustomization_1656Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutPetcustomization_1656LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutPetcustomization_1656LayoutPurchaseWidget = ({ layout }: LayoutPetcustomization_1656LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30, ...layout }}
        />
    );
};

/** Named region `ctlg_petcustomization` of LayoutPetcustomization_1656Layout - configured through the parent's `ctlgPetcustomization` prop. */
export interface LayoutPetcustomization_1656LayoutCtlgPetcustomizationProps {
    captionCtlgSelectproduct?: string;
    itemGridWidget?: LayoutPetcustomization_1656LayoutItemGridWidgetProps;
    layout?: BoxLayout;
    petPreviewWidget?: LayoutPetcustomization_1656LayoutPetPreviewWidgetProps;
    purchaseWidget?: LayoutPetcustomization_1656LayoutPurchaseWidgetProps;
}

export const LayoutPetcustomization_1656LayoutCtlgPetcustomization = ({ captionCtlgSelectproduct, itemGridWidget, layout, petPreviewWidget, purchaseWidget }: LayoutPetcustomization_1656LayoutCtlgPetcustomizationProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_petcustomization"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 8, width: 107, top: 133, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <LayoutPetcustomization_1656LayoutItemGridWidget {...itemGridWidget} />
            <LayoutPetcustomization_1656LayoutPetPreviewWidget {...petPreviewWidget} />
            <LayoutPetcustomization_1656LayoutPurchaseWidget {...purchaseWidget} />
        </Region>
    );
};

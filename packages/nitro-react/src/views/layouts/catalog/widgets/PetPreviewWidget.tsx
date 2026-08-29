import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `petPreviewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutPetcustomization_1656Layout); each passes its own placement through `layout`.
 */
/** Named region `petPreviewWidget` of PetPreviewWidget - configured through the parent's `petPreviewWidget` prop. */
export interface PetPreviewWidgetProps extends CatalogWidgetFlags {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
    visiblePetPreviewBackground?: boolean;
}

export const PetPreviewWidget = ({ captionCtlgDescription, captionCtlgProductName, layout, srcCtlgTeaserimg1, visiblePetPreviewBackground }: PetPreviewWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="petPreviewWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Border
                variant="4"
                name="petPreviewBackground"
                tintColor="#cccccc"
                visible={visiblePetPreviewBackground ?? false}
                layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 275 }}
            />
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <Region
                name="ctlg_product_name"
                layout={{ position: 'absolute', left: 8, width: 74, top: 12, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgProductName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="ctlg_description"
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

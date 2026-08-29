import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `petPreviewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (PetPreviewWidgetLayout); each passes its own placement through `layout`.
 */
/** Named region `petPreviewWidget` of PetPreviewWidget2 - configured through the parent's `petPreviewWidget` prop. */
export interface PetPreviewWidget2Props extends CatalogWidgetFlags {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const PetPreviewWidget2 = ({ captionCtlgDescription, captionCtlgProductName, layout, srcCtlgTeaserimg1 }: PetPreviewWidget2Props) => {
    return (
        <Region
            name="petPreviewWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 162 }}
            />
            <Region
                name="ctlg_product_name"
                layout={{ position: 'absolute', left: 0, width: 71, top: 156, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgProductName ?? 'lorem ipsum'}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="ctlg_description"
                layout={{ position: 'absolute', left: -2, width: 162, top: 173, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? 'lorem ipsum'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 162 }}
                />
            </Region>
        </Region>
    );
};

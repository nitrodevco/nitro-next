import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `specialInfoWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (SpecialInfoWidgetLayout); each passes its own placement through `layout`.
 */
/** Named region `specialInfoWidget` of SpecialInfoWidget2 - configured through the parent's `specialInfoWidget` prop. */
export interface SpecialInfoWidget2Props extends CatalogWidgetFlags {
    captionCtlgSpecialTxt?: string;
    layout?: BoxLayout;
    srcCtlgSpecialImg?: string;
    tintCtlgSpecialImg?: string;
}

export const SpecialInfoWidget2 = ({ captionCtlgSpecialTxt, layout, srcCtlgSpecialImg, tintCtlgSpecialImg }: SpecialInfoWidget2Props) => {
    return (
        <Region
            name="specialInfoWidget"
            layout={{ position: 'absolute', justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="ctlg_special_img"
                src={srcCtlgSpecialImg}
                tint={tintCtlgSpecialImg}
                layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 73 }}
            />
            <ThemeText
                text={captionCtlgSpecialTxt ?? 'lorem ipsum'}
                textOptions={{ fill: '#333333', wordWrap: true, wordWrapWidth: 139, align: 'center' }}
                name="ctlg_special_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 139, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 16 }}
            />
        </Region>
    );
};

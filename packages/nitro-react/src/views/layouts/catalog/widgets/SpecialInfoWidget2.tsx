import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/**
 * Catalog widget `specialInfoWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (SpecialInfoWidgetLayout); each passes its own placement through `layout`.
 */
/** Named region `specialInfoWidget` of SpecialInfoWidget2 - configured through the parent's `specialInfoWidget` prop. */
export interface SpecialInfoWidget2Props {
    captionCtlgSpecialTxt?: string;
    layout?: BoxLayout;
    srcCtlgSpecialImg?: string;
}

export const SpecialInfoWidget2 = ({ captionCtlgSpecialTxt, layout, srcCtlgSpecialImg }: SpecialInfoWidget2Props) => {
    return (
        <Region
            name="specialInfoWidget"
            params={16}
            layout={{ position: 'absolute', justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="ctlg_special_img"
                params={16}
                src={srcCtlgSpecialImg}
                layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 73 }}
            />
            <Region
                name="ctlg_special_txt"
                params={3935440}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 139, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCtlgSpecialTxt ?? 'lorem ipsum'}
                    textOptions={{ fill: '#333333', wordWrap: true, wordWrapWidth: 139, align: 'center' }}
                />
            </Region>
        </Region>
    );
};

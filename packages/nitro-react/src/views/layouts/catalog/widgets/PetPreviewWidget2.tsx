import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/**
 * Catalog widget `petPreviewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutPetcustomization_1713Layout); each passes its own placement through `layout`.
 */
/** Named region `petPreviewWidget` of PetPreviewWidget2 - configured through the parent's `petPreviewWidget` prop. */
export interface PetPreviewWidget2Props {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
    visiblePetPreviewBackground?: boolean;
}

export const PetPreviewWidget2 = ({ captionCtlgDescription, captionCtlgProductName, layout, srcCtlgTeaserimg1, visiblePetPreviewBackground }: PetPreviewWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="petPreviewWidget"
            params={16}
            layout={{ position: 'absolute', ...layout }}
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
                layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 275 }}
            />
            <Region
                name="ctlg_product_name"
                params={16}
                layout={{ position: 'absolute', left: 8, width: 74, top: 172, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgProductName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="ctlg_description"
                params={16}
                layout={{ position: 'absolute', left: 8, width: 162, top: 189, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.title')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 162 }}
                />
            </Region>
        </Region>
    );
};

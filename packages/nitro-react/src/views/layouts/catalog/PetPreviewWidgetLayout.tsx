import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1573_petPreviewWidget_xml` (layout "petPreviewWidget", 158x207) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetPreviewWidgetLayoutProps {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const PetPreviewWidgetLayout = ({ captionCtlgDescription, captionCtlgProductName, layout, srcCtlgTeaserimg1 }: PetPreviewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 158, height: 207, ...layout }}>
            <Region
                name="petPreviewWidget"
                params={16}
                layout={{ position: 'absolute', left: 174, width: 158, top: 154, height: 207 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    params={16}
                    src={srcCtlgTeaserimg1}
                    layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 162 }}
                />
                <Region
                    name="ctlg_product_name"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 71, top: 156, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgProductName ?? 'lorem ipsum'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="ctlg_description"
                    params={16}
                    layout={{ position: 'absolute', left: -2, width: 162, top: 173, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgDescription ?? 'lorem ipsum'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 162 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

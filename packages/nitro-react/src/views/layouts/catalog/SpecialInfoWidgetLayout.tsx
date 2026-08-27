import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1618_specialInfoWidget_xml` (layout "specialInfoWidget", 142x73) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpecialInfoWidgetLayoutProps {
    captionCtlgSpecialTxt?: string;
    layout?: BoxLayout;
    srcCtlgSpecialImg?: string;
}

export const SpecialInfoWidgetLayout = ({ captionCtlgSpecialTxt, layout, srcCtlgSpecialImg }: SpecialInfoWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 142, height: 73, ...layout }}>
            <Region
                name="specialInfoWidget"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 73 }}
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
                    layout={{ position: 'absolute', left: '50%', marginLeft: -69, width: 139, top: '50%', marginTop: -8.5, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionCtlgSpecialTxt ?? 'lorem ipsum'}
                        textOptions={{ fill: '#333333', wordWrap: true, wordWrapWidth: 139, align: 'center' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

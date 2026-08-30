import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { RedeemItemCodeWidget, RedeemItemCodeWidgetProps } from '#base/views/layouts/catalog/widgets/RedeemItemCodeWidget';

/** Named region `ctlg_frontpage4` of LayoutFrontpage_1554Layout - configured through the parent's `ctlgFrontpage4` prop. */
export interface LayoutFrontpage_1554LayoutCtlgFrontpage4Props {
    captionCtlgTxt1?: string;
    captionCtlgTxt2?: string;
    layout?: BoxLayout;
    redeemItemCodeWidget?: RedeemItemCodeWidgetProps;
    srcCtlgTeaserimg1?: string;
}

export const LayoutFrontpage_1554LayoutCtlgFrontpage4 = ({ captionCtlgTxt1, captionCtlgTxt2, layout, redeemItemCodeWidget, srcCtlgTeaserimg1 }: LayoutFrontpage_1554LayoutCtlgFrontpage4Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_frontpage4"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/frontpage_teaser.gif'}
                layout={{ position: 'absolute', left: 246, width: 103, top: 64, height: 324 }}
            />
            <ThemeText
                text={captionCtlgTxt1 ?? t('loremipsum.html')}
                textOptions={{ wordWrap: true, wordWrapWidth: 225 }}
                name="ctlg_txt1"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 15, width: 225, top: 70, height: 320 }}
            />
            <Border
                variant="2"
                name="bgBorder"
                tintColor="#51bbee"
                layout={{ position: 'absolute', left: 8, width: 345, top: 397, height: 61 }}
            >
                <ThemeText
                    text={captionCtlgTxt2 ?? t('lorem.title')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 272 }}
                    name="ctlg_txt2"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 272, top: 6, height: 17 }}
                />
                <RedeemItemCodeWidget
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 34 }}
                    {...redeemItemCodeWidget}
                />
            </Border>
        </Region>
    );
};

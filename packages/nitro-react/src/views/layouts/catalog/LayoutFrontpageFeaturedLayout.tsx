import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';
import { FeaturedItemsWidget, FeaturedItemsWidgetProps } from '#base/views/layouts/catalog/widgets/FeaturedItemsWidget';
import { RedeemItemCodeWidget, RedeemItemCodeWidgetProps } from '#base/views/layouts/catalog/widgets/RedeemItemCodeWidget';

/** Generated from `1660_layout_frontpage_featured_xml` (layout "layout_frontpage_featured", 552x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutFrontpageFeaturedLayoutProps {
    ctlgFrontpage5?: LayoutFrontpageFeaturedLayoutCtlgFrontpage5Props;
    layout?: BoxLayout;
}

export const LayoutFrontpageFeaturedLayout = ({ ctlgFrontpage5, layout }: LayoutFrontpageFeaturedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 552, height: 460, ...layout }}>
            <LayoutFrontpageFeaturedLayoutCtlgFrontpage5 {...ctlgFrontpage5} />
        </Region>
    );
};

/** Named region `ctlg_frontpage5` of LayoutFrontpageFeaturedLayout - configured through the parent's `ctlgFrontpage5` prop. */
export interface LayoutFrontpageFeaturedLayoutCtlgFrontpage5Props {
    captionCtlgTxt2?: string;
    featuredItemsWidget?: FeaturedItemsWidgetProps;
    layout?: BoxLayout;
    redeemItemCodeWidget?: RedeemItemCodeWidgetProps;
}

export const LayoutFrontpageFeaturedLayoutCtlgFrontpage5 = ({ captionCtlgTxt2, featuredItemsWidget, layout, redeemItemCodeWidget }: LayoutFrontpageFeaturedLayoutCtlgFrontpage5Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_frontpage5"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 552, top: 0, height: 460, ...layout }}
        >
            <FeaturedItemsWidget
                layout={{ position: 'absolute', left: 0, width: 552, top: 0, height: 460 }}
                {...featuredItemsWidget}
            />
            <Border
                variant="2"
                name="bgBorder"
                params={1040}
                tintColor="#51bbee"
                layout={{ position: 'absolute', left: 200, width: 345, bottom: 0, height: 61 }}
            >
                <Region
                    name="ctlg_txt2"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 272, top: 6, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgTxt2 ?? t('lorem.title')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 272 }}
                    />
                </Region>
                <RedeemItemCodeWidget
                    layout={{ position: 'absolute', left: 0, width: 345, top: 20, height: 34 }}
                    {...redeemItemCodeWidget}
                />
            </Border>
        </Region>
    );
};

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { RecyclerPrizesWidget2, RecyclerPrizesWidget2Props } from '#base/views/layouts/catalog/widgets/RecyclerPrizesWidget2';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';

/** Generated from `1537_layout_recycler_prizes_xml` (layout "ctlg_recycler_prizes", 360x659) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecyclerPrizes_1537LayoutProps {
    ctlgDefault3x3?: LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1537Layout = ({ ctlgDefault3x3, layout }: LayoutRecyclerPrizes_1537LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 659, ...layout }}>
            <LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};

/** Named region `ctlg_default_3x3` of LayoutRecyclerPrizes_1537Layout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props {
    captionCtlgSelectproduct?: string;
    layout?: BoxLayout;
    recyclerPrizesWidget?: RecyclerPrizesWidget2Props;
    specialInfoWidget?: SpecialInfoWidgetProps;
    tags?: string[];
}

export const LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3 = ({ captionCtlgSelectproduct, layout, recyclerPrizesWidget, specialInfoWidget, tags }: LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 128, top: 133, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <SpecialInfoWidget
                layout={{ position: 'absolute', left: 100, width: 142, top: 46, height: 73 }}
                {...specialInfoWidget}
            />
            <RecyclerPrizesWidget2
                tags={[ 'WIDE' ]}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                {...recyclerPrizesWidget}
            />
        </Region>
    );
};

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { RecyclerPrizesWidget, RecyclerPrizesWidgetProps } from '#base/views/layouts/catalog/widgets/RecyclerPrizesWidget';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';

/** Generated from `1543_layout_recycler_prizes_xml` (layout "ctlg_recycler_prizes", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecyclerPrizes_1543LayoutProps {
    ctlgDefault3x3?: LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1543Layout = ({ ctlgDefault3x3, layout }: LayoutRecyclerPrizes_1543LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};

/** Named region `ctlg_default_3x3` of LayoutRecyclerPrizes_1543Layout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3Props {
    captionCtlgSelectproduct?: string;
    layout?: BoxLayout;
    recyclerPrizesWidget?: RecyclerPrizesWidgetProps;
    specialInfoWidget?: SpecialInfoWidgetProps;
    tags?: string[];
}

export const LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3 = ({ captionCtlgSelectproduct, layout, recyclerPrizesWidget, specialInfoWidget, tags }: LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                layout={{ position: 'absolute', left: 2, width: 128, top: 133, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <SpecialInfoWidget
                layout={{ position: 'absolute', left: 180, width: 142, top: 116, height: 73 }}
                {...specialInfoWidget}
            />
            <RecyclerPrizesWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 146, height: 314 }}
                {...recyclerPrizesWidget}
            />
        </Region>
    );
};

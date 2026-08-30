import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { RecyclerPrizesWidget, RecyclerPrizesWidgetProps } from '#base/views/layouts/catalog/widgets/RecyclerPrizesWidget';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';

/** Named region `ctlg_default_3x3` of LayoutRecyclerPrizes_1537Layout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props {
    captionCtlgSelectproduct?: string;
    layout?: BoxLayout;
    recyclerPrizesWidget?: RecyclerPrizesWidgetProps;
    specialInfoWidget?: SpecialInfoWidgetProps;
    visibleCtlgSelectproduct?: boolean;
}

export const LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3 = ({ captionCtlgSelectproduct, layout, recyclerPrizesWidget, specialInfoWidget, visibleCtlgSelectproduct }: LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            {(visibleCtlgSelectproduct ?? false) && (
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                    name="ctlg_selectproduct"
                    layout={{ position: 'absolute', left: 2, width: 128, top: 133, height: 13 }}
                />
            )}
            <SpecialInfoWidget
                layout={{ position: 'absolute', left: 100, width: 142, top: 46, height: 73 }}
                {...specialInfoWidget}
            />
            <RecyclerPrizesWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...recyclerPrizesWidget}
            />
        </Region>
    );
};

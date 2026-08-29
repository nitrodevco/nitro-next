import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { RecyclerPrizesWidget2, RecyclerPrizesWidget2Props } from '#base/views/layouts/catalog/widgets/RecyclerPrizesWidget2';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';

/** Named region `ctlg_default_3x3` of LayoutRecyclerPrizes_1537Layout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props {
    captionCtlgSelectproduct?: string;
    layout?: BoxLayout;
    recyclerPrizesWidget?: RecyclerPrizesWidget2Props;
    specialInfoWidget?: SpecialInfoWidgetProps;
    visibleCtlgSelectproduct?: boolean;
}

export const LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3 = ({ captionCtlgSelectproduct, layout, recyclerPrizesWidget, specialInfoWidget, visibleCtlgSelectproduct }: LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            {(visibleCtlgSelectproduct ?? false) && (
                <Region
                    name="ctlg_selectproduct"
                    layout={{ position: 'absolute', left: 2, width: 128, top: 133, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                        textStyle="text-style-u-small"
                    />
                </Region>
            )}
            <SpecialInfoWidget
                layout={{ position: 'absolute', left: 100, width: 142, top: 46, height: 73 }}
                {...specialInfoWidget}
            />
            <RecyclerPrizesWidget2
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                {...recyclerPrizesWidget}
            />
        </Region>
    );
};

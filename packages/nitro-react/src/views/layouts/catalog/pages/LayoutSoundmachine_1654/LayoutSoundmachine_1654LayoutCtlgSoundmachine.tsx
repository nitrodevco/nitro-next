import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SongDiskProductViewWidget, SongDiskProductViewWidgetProps } from '#base/views/layouts/catalog/widgets/SongDiskProductViewWidget';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';

/** Named region `ctlg_soundmachine` of LayoutSoundmachine_1654Layout - configured through the parent's `ctlgSoundmachine` prop. */
export interface LayoutSoundmachine_1654LayoutCtlgSoundmachineProps {
    captionCtlgSelectproduct?: string;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: PurchaseWidgetProps;
    songDiskProductViewWidget?: SongDiskProductViewWidgetProps;
    specialInfoWidget?: SpecialInfoWidgetProps;
}

export const LayoutSoundmachine_1654LayoutCtlgSoundmachine = ({ captionCtlgSelectproduct, itemGridWidget, layout, purchaseWidget, songDiskProductViewWidget, specialInfoWidget }: LayoutSoundmachine_1654LayoutCtlgSoundmachineProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_soundmachine"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeText
                text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                textStyle="text-style-u-small"
                textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                name="ctlg_selectproduct"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 6, width: 130, top: 130, height: 15 }}
            />
            <ItemGridWidget
                layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 275 }}
                {...itemGridWidget}
            />
            <SongDiskProductViewWidget
                layout={{ position: 'absolute', right: 5, width: 175, top: 154, height: 274 }}
                {...songDiskProductViewWidget}
            />
            <SpecialInfoWidget
                layout={{ position: 'absolute', left: 180, width: 142, top: 118, height: 73 }}
                {...specialInfoWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SongDiskProductViewWidget2, SongDiskProductViewWidget2Props } from '#base/views/layouts/catalog/widgets/SongDiskProductViewWidget2';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';

/** Generated from `1627_layout_soundmachine_xml` (layout "ctlg_soundmachine", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSoundmachine_1627LayoutProps {
    ctlgSoundmachine?: LayoutSoundmachine_1627LayoutCtlgSoundmachineProps;
    layout?: BoxLayout;
}

export const LayoutSoundmachine_1627Layout = ({ ctlgSoundmachine, layout }: LayoutSoundmachine_1627LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSoundmachine_1627LayoutCtlgSoundmachine {...ctlgSoundmachine} />
        </Region>
    );
};

/** Named region `ctlg_soundmachine` of LayoutSoundmachine_1627Layout - configured through the parent's `ctlgSoundmachine` prop. */
export interface LayoutSoundmachine_1627LayoutCtlgSoundmachineProps {
    captionCtlgSelectproduct?: string;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: PurchaseWidgetProps;
    songDiskProductViewWidget?: SongDiskProductViewWidget2Props;
    specialInfoWidget?: SpecialInfoWidgetProps;
    tags?: string[];
}

export const LayoutSoundmachine_1627LayoutCtlgSoundmachine = ({ captionCtlgSelectproduct, itemGridWidget, layout, purchaseWidget, songDiskProductViewWidget, specialInfoWidget, tags }: LayoutSoundmachine_1627LayoutCtlgSoundmachineProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_soundmachine"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                visible={false}
                layout={{ position: 'absolute', left: 6, width: 130, top: 130, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                />
            </Region>
            <ItemGridWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 35 }}
                {...itemGridWidget}
            />
            <SongDiskProductViewWidget2
                tags={[ 'EMBEDDED' ]}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                {...songDiskProductViewWidget}
            />
            <SpecialInfoWidget
                layout={{ position: 'absolute', left: 110, width: 142, top: 28, height: 73 }}
                {...specialInfoWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

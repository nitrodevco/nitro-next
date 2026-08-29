import { BoxLayout, Region, ThemeText } from '#base/theme';
import { NewPetsWidget, NewPetsWidgetProps } from '#base/views/layouts/catalog/widgets/NewPetsWidget';
import { PetsWidget2, PetsWidget2Props } from '#base/views/layouts/catalog/widgets/PetsWidget2';

/** Generated from `1697_layout_pets_xml` (layout "ctlg_pets", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPets_1697LayoutProps {
    ctlgPets?: LayoutPets_1697LayoutCtlgPetsProps;
    layout?: BoxLayout;
}

export const LayoutPets_1697Layout = ({ ctlgPets, layout }: LayoutPets_1697LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutPets_1697LayoutCtlgPets {...ctlgPets} />
        </Region>
    );
};

/** Named region `ctlg_pets` of LayoutPets_1697Layout - configured through the parent's `ctlgPets` prop. */
export interface LayoutPets_1697LayoutCtlgPetsProps {
    captionCtlgPrice1?: string;
    layout?: BoxLayout;
    newPetsWidget?: NewPetsWidgetProps;
    petsWidget?: PetsWidget2Props;
    tags?: string[];
}

export const LayoutPets_1697LayoutCtlgPets = ({ captionCtlgPrice1, layout, newPetsWidget, petsWidget, tags }: LayoutPets_1697LayoutCtlgPetsProps) => {
    return (
        <Region
            name="ctlg_pets"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <PetsWidget2
                layout={{ position: 'absolute', left: 0, width: 359, top: 75, height: 377 }}
                {...petsWidget}
            />
            <NewPetsWidget
                layout={{ position: 'absolute', left: 0, width: 359, top: 75, height: 375 }}
                {...newPetsWidget}
            />
            <Region
                name="ctlg_price_1"
                visible={false}
                layout={{ position: 'absolute', left: 267, width: 78, top: 426, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionCtlgPrice1 ?? '0'}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 78, align: 'right' }}
                />
            </Region>
        </Region>
    );
};

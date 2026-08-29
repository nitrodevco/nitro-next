import { BoxLayout, Region, ThemeText } from '#base/theme';
import { NewPetsWidget, NewPetsWidgetProps } from '#base/views/layouts/catalog/widgets/NewPetsWidget';
import { PetsWidget, PetsWidgetProps } from '#base/views/layouts/catalog/widgets/PetsWidget';

/** Named region `ctlg_pets` of LayoutPets_1697Layout - configured through the parent's `ctlgPets` prop. */
export interface LayoutPets_1697LayoutCtlgPetsProps {
    captionCtlgPrice1?: string;
    layout?: BoxLayout;
    newPetsWidget?: NewPetsWidgetProps;
    petsWidget?: PetsWidgetProps;
    visibleCtlgPrice1?: boolean;
}

export const LayoutPets_1697LayoutCtlgPets = ({ captionCtlgPrice1, layout, newPetsWidget, petsWidget, visibleCtlgPrice1 }: LayoutPets_1697LayoutCtlgPetsProps) => {
    return (
        <Region
            name="ctlg_pets"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <PetsWidget
                layout={{ position: 'absolute', left: 0, width: 359, top: 75, height: 377 }}
                {...petsWidget}
            />
            <NewPetsWidget
                layout={{ position: 'absolute', left: 0, width: 359, top: 75, height: 375 }}
                {...newPetsWidget}
            />
            {(visibleCtlgPrice1 ?? false) && (
                <Region
                    name="ctlg_price_1"
                    layout={{ position: 'absolute', left: 267, width: 78, top: 426, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionCtlgPrice1 ?? '0'}
                        textStyle="text-style-u-small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 78, align: 'right' }}
                    />
                </Region>
            )}
        </Region>
    );
};

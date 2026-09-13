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
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <PetsWidget
                layout={{ position: 'absolute', left: 0, right: 1, bottom: 8, height: 377 }}
                {...petsWidget}
            />
            <NewPetsWidget
                layout={{ position: 'absolute', left: 0, right: 1, bottom: 10, height: 375 }}
                {...newPetsWidget}
            />
            {(visibleCtlgPrice1 ?? false) && (
                <ThemeText
                    text={captionCtlgPrice1 ?? '0'}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 78, align: 'right' }}
                    name="ctlg_price_1"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 267, width: 78, top: 426, height: 15 }}
                />
            )}
        </Region>
    );
};

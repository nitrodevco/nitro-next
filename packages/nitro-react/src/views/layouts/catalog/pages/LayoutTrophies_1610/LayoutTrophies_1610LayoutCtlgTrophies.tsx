import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';
import { ColourGridWidget, ColourGridWidgetProps } from '#base/views/layouts/catalog/widgets/ColourGridWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { TextInputWidget, TextInputWidgetProps } from '#base/views/layouts/catalog/widgets/TextInputWidget';
import { TrophyWidget3, TrophyWidget3Props } from '#base/views/layouts/catalog/widgets/TrophyWidget3';

/** Named region `ctlg_trophies` of LayoutTrophies_1610Layout - configured through the parent's `ctlgTrophies` prop. */
export interface LayoutTrophies_1610LayoutCtlgTrophiesProps {
    captionTrophyDescription?: string;
    captionTrophyEnscription?: string;
    colourGridWidget?: ColourGridWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: PurchaseWidgetProps;
    textInputWidget?: TextInputWidgetProps;
    trophyWidget?: TrophyWidget3Props;
}

export const LayoutTrophies_1610LayoutCtlgTrophies = ({ captionTrophyDescription, captionTrophyEnscription, colourGridWidget, layout, purchaseWidget, textInputWidget, trophyWidget }: LayoutTrophies_1610LayoutCtlgTrophiesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_trophies"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeText
                text={captionTrophyDescription ?? t('loremipsum.html')}
                textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                name="trophy.description"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 190 }}
            />
            <TrophyWidget3
                layout={{ position: 'absolute', left: 0, right: 0, top: 145, height: 135 }}
                {...trophyWidget}
            />
            <ColourGridWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 285, height: 40 }}
                {...colourGridWidget}
            />
            <ThemeText
                text={captionTrophyEnscription ?? t('lorem.title')}
                textStyle="text-style-u-small"
                textOptions={{ wordWrap: true, wordWrapWidth: 355 }}
                name="trophy.enscription"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 6, width: 355, top: 326, height: 15 }}
            />
            <Border
                variant="5"
                layout={{ position: 'absolute', left: 0, right: 0, top: 340, bottom: 37 }}
            >
                <TextInputWidget
                    layout={{ position: 'absolute', left: 6, right: 5, top: 7, bottom: 6 }}
                    {...textInputWidget}
                />
            </Border>
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';
import { ColourGridWidget, ColourGridWidgetProps } from '#base/views/layouts/catalog/widgets/ColourGridWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { TextInputWidget, TextInputWidgetProps } from '#base/views/layouts/catalog/widgets/TextInputWidget';
import { TrophyWidget, TrophyWidgetProps } from '#base/views/layouts/catalog/widgets/TrophyWidget';

/** Named region `ctlg_trophies` of LayoutTrophies_1695Layout - configured through the parent's `ctlgTrophies` prop. */
export interface LayoutTrophies_1695LayoutCtlgTrophiesProps {
    captionTrophyDescription?: string;
    captionTrophyEnscription?: string;
    colourGridWidget?: ColourGridWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: PurchaseWidgetProps;
    textInputWidget?: TextInputWidgetProps;
    trophyWidget?: TrophyWidgetProps;
}

export const LayoutTrophies_1695LayoutCtlgTrophies = ({ captionTrophyDescription, captionTrophyEnscription, colourGridWidget, layout, purchaseWidget, textInputWidget, trophyWidget }: LayoutTrophies_1695LayoutCtlgTrophiesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_trophies"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="trophy.description"
                layout={{ position: 'absolute', left: 0, right: 0, top: 70, height: 135, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrophyDescription ?? t('loremipsum.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                />
            </Region>
            <TrophyWidget
                layout={{ position: 'absolute', left: 0, right: 0, alignSelf: 'center', marginTop: -1.5, marginBottom: 1.5, height: 127 }}
                {...trophyWidget}
            />
            <ColourGridWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 295, height: 40 }}
                {...colourGridWidget}
            />
            <Region
                name="trophy.enscription"
                layout={{ position: 'absolute', left: 3, right: 1, top: 339, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrophyEnscription ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 356 }}
                />
            </Region>
            <Border
                variant="5"
                layout={{ position: 'absolute', left: 0, right: 0, top: 355, height: 70 }}
            >
                <TextInputWidget
                    layout={{ position: 'absolute', left: 6, right: 5, top: 7, bottom: 5 }}
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

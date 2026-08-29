import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';
import { ColourGridWidget, ColourGridWidgetProps } from '#base/views/layouts/catalog/widgets/ColourGridWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { TextInputWidget, TextInputWidgetProps } from '#base/views/layouts/catalog/widgets/TextInputWidget';
import { TrophyWidget3, TrophyWidget3Props } from '#base/views/layouts/catalog/widgets/TrophyWidget3';

/** Generated from `1610_layout_trophies_xml` (layout "ctlg_trophies", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutTrophies_1610LayoutProps {
    ctlgTrophies?: LayoutTrophies_1610LayoutCtlgTrophiesProps;
    layout?: BoxLayout;
}

export const LayoutTrophies_1610Layout = ({ ctlgTrophies, layout }: LayoutTrophies_1610LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutTrophies_1610LayoutCtlgTrophies {...ctlgTrophies} />
        </Region>
    );
};

/** Named region `ctlg_trophies` of LayoutTrophies_1610Layout - configured through the parent's `ctlgTrophies` prop. */
export interface LayoutTrophies_1610LayoutCtlgTrophiesProps {
    captionTrophyDescription?: string;
    captionTrophyEnscription?: string;
    colourGridWidget?: ColourGridWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: PurchaseWidgetProps;
    tags?: string[];
    textInputWidget?: TextInputWidgetProps;
    trophyWidget?: TrophyWidget3Props;
}

export const LayoutTrophies_1610LayoutCtlgTrophies = ({ captionTrophyDescription, captionTrophyEnscription, colourGridWidget, layout, purchaseWidget, tags, textInputWidget, trophyWidget }: LayoutTrophies_1610LayoutCtlgTrophiesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_trophies"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="trophy.description"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrophyDescription ?? t('loremipsum.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                />
            </Region>
            <TrophyWidget3
                tags={[ 'EMBEDDED' ]}
                layout={{ position: 'absolute', left: 0, width: 360, top: 145, height: 135 }}
                {...trophyWidget}
            />
            <ColourGridWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 285, height: 40 }}
                {...colourGridWidget}
            />
            <Region
                name="trophy.enscription"
                layout={{ position: 'absolute', left: 6, width: 355, top: 326, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrophyEnscription ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 355 }}
                />
            </Region>
            <Border
                variant="5"
                layout={{ position: 'absolute', left: 0, width: 360, top: 340, bottom: 37 }}
            >
                <TextInputWidget
                    tags={[ 'EMBEDDED' ]}
                    layout={{ position: 'absolute', left: 6, right: 5, top: 7, bottom: 6 }}
                    {...textInputWidget}
                />
            </Border>
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};

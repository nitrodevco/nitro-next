import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { BuilderLoyaltyWidget, BuilderLoyaltyWidgetProps } from '#base/views/layouts/catalog/widgets/BuilderLoyaltyWidget';

/** Generated from `1617_layout_builders_club_loyalty_xml` (layout "layout_builders_club_loyalty", 360x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBuildersClubLoyaltyLayoutProps {
    ctlgBuildersClubLoyalty?: LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyaltyProps;
    layout?: BoxLayout;
}

export const LayoutBuildersClubLoyaltyLayout = ({ ctlgBuildersClubLoyalty, layout }: LayoutBuildersClubLoyaltyLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 508, ...layout }}>
            <LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyalty {...ctlgBuildersClubLoyalty} />
        </Region>
    );
};

/** Named region `ctlg_builders_club_loyalty` of LayoutBuildersClubLoyaltyLayout - configured through the parent's `ctlgBuildersClubLoyalty` prop. */
export interface LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyaltyProps {
    builderLoyaltyWidget?: BuilderLoyaltyWidgetProps;
    captionCtlgDescription?: string;
    layout?: BoxLayout;
}

export const LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyalty = ({ builderLoyaltyWidget, captionCtlgDescription, layout }: LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyaltyProps) => {
    return (
        <Region
            name="ctlg_builders_club_loyalty"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_description"
                layout={{ position: 'absolute', left: 15, width: 276, top: 28, height: 80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? '<b>Formatted</b> text'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 276 }}
                />
            </Region>
            <ThemeImage
                src="${image.library.url}catalogue/bc_bottom.png"
                layout={{ position: 'absolute', left: 290, width: 72, top: 316, height: 90 }}
            />
            <BuilderLoyaltyWidget
                layout={{ position: 'absolute', left: 14, width: 300, top: 108, bottom: 20 }}
                {...builderLoyaltyWidget}
            />
            <ThemeImage
                src="${image.library.url}catalogue/bc_top.png"
                layout={{ position: 'absolute', left: 249, width: 111, top: 21, height: 282 }}
            />
        </Region>
    );
};

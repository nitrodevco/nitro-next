import { BoxLayout, Region, ThemeText } from '#base/theme';
import { BuilderSubscriptionWidget, BuilderSubscriptionWidgetProps } from '#base/views/layouts/catalog/widgets/BuilderSubscriptionWidget';

/** Generated from `1606_layout_builders_club_frontpage_xml` (layout "layout_builders_club_frontpage", 360x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBuildersClubFrontpageLayoutProps {
    builderSubscriptionWidget?: BuilderSubscriptionWidgetProps;
    captionCtlgDescription?: string;
    layout?: BoxLayout;
}

export const LayoutBuildersClubFrontpageLayout = ({ builderSubscriptionWidget, captionCtlgDescription, layout }: LayoutBuildersClubFrontpageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 508, ...layout }}>
            <Region
                name="ctlg_builders_club_frontpage"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="ctlg_description"
                    layout={{ position: 'absolute', left: 15, width: 330, top: 10, height: 380, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgDescription ?? 'Formatted text'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                    />
                </Region>
                <BuilderSubscriptionWidget
                    layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 100 }}
                    {...builderSubscriptionWidget}
                />
            </Region>
        </Region>
    );
};

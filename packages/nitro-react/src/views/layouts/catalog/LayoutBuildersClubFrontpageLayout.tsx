import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeText } from '#base/theme';

/** Generated from `1606_layout_builders_club_frontpage_xml` (layout "layout_builders_club_frontpage", 360x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBuildersClubFrontpageLayoutProps {
    ctlgBuildersClubFrontpage?: LayoutBuildersClubFrontpageLayoutCtlgBuildersClubFrontpageProps;
    layout?: BoxLayout;
}

export const LayoutBuildersClubFrontpageLayout = ({ ctlgBuildersClubFrontpage, layout }: LayoutBuildersClubFrontpageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 508, ...layout }}>
            <LayoutBuildersClubFrontpageLayoutCtlgBuildersClubFrontpage {...ctlgBuildersClubFrontpage} />
        </Region>
    );
};

/** Named region `builderSubscriptionWidget` of LayoutBuildersClubFrontpageLayout - configured through the parent's `builderSubscriptionWidget` prop. */
export interface LayoutBuildersClubFrontpageLayoutBuilderSubscriptionWidgetProps {
    layout?: BoxLayout;
    onSubscribeButton?: () => void;
    onSubscribeButtonBig?: () => void;
    onSubscribeButtonSms?: () => void;
    onTryButton?: () => void;
    visibleSubscribeButton?: boolean;
    visibleSubscribeButtonBig?: boolean;
    visibleSubscribeButtonSms?: boolean;
}

export const LayoutBuildersClubFrontpageLayoutBuilderSubscriptionWidget = ({ layout, onSubscribeButton, onSubscribeButtonBig, onSubscribeButtonSms, onTryButton, visibleSubscribeButton, visibleSubscribeButtonBig, visibleSubscribeButtonSms }: LayoutBuildersClubFrontpageLayoutBuilderSubscriptionWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="builderSubscriptionWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 100, ...layout }}
        >
            <Region
                visible={visibleSubscribeButtonBig ?? false}
                layout={{ position: 'absolute', left: 90, width: 180, top: 40, height: 50, minWidth: 180, maxWidth: 180 }}
            >
                <ButtonThick
                    variant="5"
                    name="subscribe_button_big"
                    params={131089}
                    tintColor="#0a9bc5"
                    onPointerTap={onSubscribeButtonBig}
                    layout={{ width: '100%', height: '100%' }}
                >
                    {t('builder.front_page.join')}
                </ButtonThick>
            </Region>
            <Region
                visible={visibleSubscribeButton ?? false}
                layout={{ position: 'absolute', left: 195, width: 140, top: 60, height: 30, minWidth: 140, maxWidth: 140 }}
            >
                <ButtonThick
                    variant="5"
                    name="subscribe_button"
                    params={131089}
                    tintColor="#0a9bc5"
                    onPointerTap={onSubscribeButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    {t('builder.front_page.join')}
                </ButtonThick>
            </Region>
            <ButtonThick
                variant="5"
                name="try_button"
                params={131089}
                tintColor="#dda100"
                onPointerTap={onTryButton}
                layout={{ position: 'absolute', left: 25, width: 140, top: 60, height: 30, minWidth: 140, maxWidth: 140 }}
            >
                {t('builder.front_page.try')}
            </ButtonThick>
            <Region
                visible={visibleSubscribeButtonSms ?? false}
                layout={{ position: 'absolute', left: 195, width: 140, top: 20, height: 30, minWidth: 140, maxWidth: 140 }}
            >
                <ButtonThick
                    variant="5"
                    name="subscribe_button_sms"
                    params={131089}
                    tintColor="#0a9bc5"
                    onPointerTap={onSubscribeButtonSms}
                    layout={{ width: '100%', height: '100%' }}
                >
                    {t('builder.front_page.join.sms')}
                </ButtonThick>
            </Region>
        </Region>
    );
};

/** Named region `ctlg_builders_club_frontpage` of LayoutBuildersClubFrontpageLayout - configured through the parent's `ctlgBuildersClubFrontpage` prop. */
export interface LayoutBuildersClubFrontpageLayoutCtlgBuildersClubFrontpageProps {
    builderSubscriptionWidget?: LayoutBuildersClubFrontpageLayoutBuilderSubscriptionWidgetProps;
    captionCtlgDescription?: string;
    layout?: BoxLayout;
}

export const LayoutBuildersClubFrontpageLayoutCtlgBuildersClubFrontpage = ({ builderSubscriptionWidget, captionCtlgDescription, layout }: LayoutBuildersClubFrontpageLayoutCtlgBuildersClubFrontpageProps) => {
    return (
        <Region
            name="ctlg_builders_club_frontpage"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_description"
                params={1}
                layout={{ position: 'absolute', left: 15, width: 330, top: 10, height: 380, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? 'Formatted text'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                />
            </Region>
            <LayoutBuildersClubFrontpageLayoutBuilderSubscriptionWidget {...builderSubscriptionWidget} />
        </Region>
    );
};

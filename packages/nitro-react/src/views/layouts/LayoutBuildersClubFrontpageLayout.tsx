import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeText } from '#base/theme';

/** Generated from `1606_layout_builders_club_frontpage_xml` (layout "layout_builders_club_frontpage", 360x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBuildersClubFrontpageLayoutProps {
    layout?: BoxLayout;
    onSubscribeButton?: () => void;
    onSubscribeButtonBig?: () => void;
    onSubscribeButtonSms?: () => void;
    onTryButton?: () => void;
}

export const LayoutBuildersClubFrontpageLayout = ({ layout, onSubscribeButton, onSubscribeButtonBig, onSubscribeButtonSms, onTryButton }: LayoutBuildersClubFrontpageLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 508, ...layout }}>
            <Region
                name="ctlg_builders_club_frontpage"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 508 }}
            >
                <Region
                    name="ctlg_description"
                    params={1}
                    layout={{ position: 'absolute', left: 15, width: 330, top: 10, height: 380, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="Formatted text"
                        textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                    />
                </Region>
                <Region
                    name="builderSubscriptionWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 408, height: 100 }}
                >
                    <Region
                        visible={false}
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
                        visible={false}
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
                        visible={false}
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
            </Region>
        </Region>
    );
};

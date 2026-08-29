import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1240_logout_xml` (layout "logout", 192x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LogoutLayoutProps {
    helpRegion?: LogoutLayoutHelpRegionProps;
    layout?: BoxLayout;
    logoutRegion?: LogoutLayoutLogoutRegionProps;
}

export const LogoutLayout = ({ helpRegion, layout, logoutRegion }: LogoutLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 40, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 38 }}>
                <LogoutLayoutHelpRegion {...helpRegion} />
                <LogoutLayoutLogoutRegion {...logoutRegion} />
            </Region>
        </Region>
    );
};

/** Named region `help_region` of LogoutLayout - configured through the parent's `helpRegion` prop. */
export interface LogoutLayoutHelpRegionProps {
    captionHelpText?: string;
    layout?: BoxLayout;
    onHelpRegion?: () => void;
}

export const LogoutLayoutHelpRegion = ({ captionHelpText, layout, onHelpRegion }: LogoutLayoutHelpRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="help_region"
            onPointerTap={onHelpRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 95, top: 8, height: 28, ...layout }}
        >
            <Border
                variant="6"
                tintColor="#55534e"
                layout={{ position: 'absolute', left: 0, width: 95, top: 0, height: 28 }}
            >
                <Border
                    variant="3"
                    tintColor="#201e19"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 3, width: 89, top: 3, height: 21, justifyContent: 'center' }}
                >
                    <Region
                        name="help_text"
                        layout={{ position: 'absolute', marginLeft: 1, marginRight: -1, width: 67, top: 2, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionHelpText ?? t('toolbar.help')}
                            textStyle="text-style-il-regular-white"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Border>
            </Border>
        </Region>
    );
};

/** Named region `logout_region` of LogoutLayout - configured through the parent's `logoutRegion` prop. */
export interface LogoutLayoutLogoutRegionProps {
    captionLogoutText?: string;
    layout?: BoxLayout;
    onLogoutRegion?: () => void;
}

export const LogoutLayoutLogoutRegion = ({ captionLogoutText, layout, onLogoutRegion }: LogoutLayoutLogoutRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="logout_region"
            onPointerTap={onLogoutRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 97, width: 95, top: 8, height: 28, ...layout }}
        >
            <Border
                variant="6"
                tintColor="#55534e"
                layout={{ position: 'absolute', left: 0, width: 95, top: 0, height: 28 }}
            >
                <Border
                    variant="3"
                    tintColor="#201e19"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 3, width: 89, top: 3, height: 21, justifyContent: 'center' }}
                >
                    <Region
                        name="logout_text"
                        layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 77, top: 2, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLogoutText ?? t('toolbar.logout')}
                            textStyle="text-style-il-regular-white"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Border>
            </Border>
        </Region>
    );
};

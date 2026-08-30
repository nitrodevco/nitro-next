import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1240_logout_xml` (layout "logout", 192x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LogoutLayoutProps {
    captionHelpText?: string;
    captionLogoutText?: string;
    layout?: BoxLayout;
    onHelpRegion?: () => void;
    onLogoutRegion?: () => void;
}

export const LogoutLayout = ({ captionHelpText, captionLogoutText, layout, onHelpRegion, onLogoutRegion }: LogoutLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 40, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 2 }}>
                <Region
                    name="help_region"
                    onPointerTap={onHelpRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 95, top: 8, bottom: 2 }}
                >
                    <Border
                        variant="6"
                        tintColor="#55534e"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <Border
                            variant="3"
                            tintColor="#201e19"
                            blend={0.8}
                            layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 4, justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionHelpText ?? t('toolbar.help')}
                                textStyle="text-style-il-regular-white"
                                textOptions={{ align: 'center' }}
                                name="help_text"
                                layout={{ position: 'absolute', marginLeft: 1, marginRight: -1, width: 67, top: 2, bottom: 3 }}
                            />
                        </Border>
                    </Border>
                </Region>
                <Region
                    name="logout_region"
                    onPointerTap={onLogoutRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 0, width: 95, top: 8, bottom: 2 }}
                >
                    <Border
                        variant="6"
                        tintColor="#55534e"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <Border
                            variant="3"
                            tintColor="#201e19"
                            blend={0.8}
                            layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 4, justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionLogoutText ?? t('toolbar.logout')}
                                textStyle="text-style-il-regular-white"
                                textOptions={{ align: 'center' }}
                                name="logout_text"
                                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 77, top: 2, bottom: 3 }}
                            />
                        </Border>
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};

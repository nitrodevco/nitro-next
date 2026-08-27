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
            <Region layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 38 }}>
                <Region
                    name="help_region"
                    tags={[ 'REGION' ]}
                    params={17}
                    onPointerTap={onHelpRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 95, top: 8, height: 28 }}
                >
                    <Border
                        variant="6"
                        tags={[ 'BGCOLOR' ]}
                        params={16}
                        tintColor="#55534e"
                        layout={{ position: 'absolute', left: 0, width: 95, top: 0, height: 28 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#201e19"
                            blend={0.8}
                            layout={{ position: 'absolute', left: 3, width: 89, top: 3, height: 21 }}
                        >
                            <Region
                                name="help_text"
                                tags={[ 'TEXT' ]}
                                params={786448}
                                layout={{ position: 'absolute', left: 12, width: 67, top: 2, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                <Region
                    name="logout_region"
                    tags={[ 'REGION' ]}
                    params={17}
                    onPointerTap={onLogoutRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 97, width: 95, top: 8, height: 28 }}
                >
                    <Border
                        variant="6"
                        tags={[ 'BGCOLOR' ]}
                        params={16}
                        tintColor="#55534e"
                        layout={{ position: 'absolute', left: 0, width: 95, top: 0, height: 28 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#201e19"
                            blend={0.8}
                            layout={{ position: 'absolute', left: 3, width: 89, top: 3, height: 21 }}
                        >
                            <Region
                                name="logout_text"
                                tags={[ 'TEXT' ]}
                                params={786448}
                                layout={{ position: 'absolute', left: 5, width: 77, top: 2, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
            </Region>
        </Region>
    );
};

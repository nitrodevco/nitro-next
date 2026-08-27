import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1212_purse_indicator_credits_xml` (layout "purse_indicator_credits", 192x29) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PurseIndicatorCreditsLayoutProps {
    captionChange?: string;
    captionCredits?: string;
    layout?: BoxLayout;
    srcCreditIcon?: string;
    visibleChangeOverlay?: boolean;
}

export const PurseIndicatorCreditsLayout = ({ captionChange, captionCredits, layout, srcCreditIcon, visibleChangeOverlay }: PurseIndicatorCreditsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 29, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
            >
                <Border
                    variant="6"
                    tags={[ 'BGCOLOR' ]}
                    params={16}
                    tintColor="#55534e"
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
                />
                <Border
                    variant="3"
                    params={16}
                    tintColor="#201e19"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 3, width: 186, top: 3, height: 22 }}
                />
                <Border
                    variant="6"
                    params={16}
                    tintColor="#e3af1e"
                    layout={{ position: 'absolute', left: 163, width: 29, top: 0, height: 29 }}
                >
                    <ThemeImage
                        name="credit_icon"
                        tags={[ 'ICON' ]}
                        params={22}
                        src={srcCreditIcon ?? layoutImage('toolbar_credit_icon_0.png')}
                        layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                    />
                </Border>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 91, top: 6, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('purse_coins')}
                        textStyle="text-style-il-regular-white"
                        textOptions={{ fill: '#e3af1e' }}
                    />
                </Region>
                <Region
                    name="credits"
                    params={262160}
                    layout={{ position: 'absolute', left: 90, width: 60, top: 6, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionCredits ?? '0'}
                        textStyle="text-style-il-regular-white"
                        textOptions={{ align: 'right' }}
                    />
                </Region>
                <Region
                    visible={visibleChangeOverlay ?? false}
                    layout={{ position: 'absolute', left: 44, width: 33, top: 0, height: 29 }}
                >
                    <Border
                        variant="6"
                        name="change_overlay"
                        params={147456}
                        tintColor="#e3af1e"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            name="change"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 29, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionChange ?? ' 50'}
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};

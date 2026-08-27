import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1236_purse_indicator_seasonal_xml` (layout "purse_indicator_seasonal", 192x29) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PurseIndicatorSeasonalLayoutProps {
    captionAmount?: string;
    captionChange?: string;
    captionSeasonalName?: string;
    layout?: BoxLayout;
    visibleChangeOverlay?: boolean;
}

export const PurseIndicatorSeasonalLayout = ({ captionAmount, captionChange, captionSeasonalName, layout, visibleChangeOverlay }: PurseIndicatorSeasonalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 29, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
            >
                <Border
                    variant="9"
                    tags={[ 'BGCOLOR' ]}
                    params={16}
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 3, width: 186, top: 3, height: 22 }}
                >
                    <Border
                        variant="3"
                        params={16}
                        tintColor="#201e19"
                        blend={0.8}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Border
                    variant="6"
                    name="seasonal_bg"
                    params={16}
                    tintColor="#7adde9"
                    layout={{ position: 'absolute', left: 163, width: 29, top: 0, height: 29 }}
                >
                    <ThemeImage
                        tags={[ 'ICON' ]}
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                    />
                    <Icon
                        variant="27"
                        name="seasonal_icon"
                        params={4081814}
                        layout={{ position: 'absolute', left: 3, width: 23, top: 3, height: 23 }}
                    />
                </Border>
                <Region
                    name="seasonal_name"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 105, top: 6, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSeasonalName ?? ''}
                        textStyle="text-style-il-regular-white"
                        textOptions={{ fill: '#bb7dc3' }}
                    />
                </Region>
                <Region
                    name="amount"
                    params={262160}
                    layout={{ position: 'absolute', left: 90, width: 60, top: 6, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionAmount ?? '0'}
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
                        tintColor="#bb7dc3"
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

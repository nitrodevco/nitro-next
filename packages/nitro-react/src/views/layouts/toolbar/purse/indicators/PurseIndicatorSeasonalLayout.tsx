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
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="9"
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                {/* `border` is hidden and has no name to show it by */}
                <Border
                    variant="6"
                    name="seasonal_bg"
                    tintColor="#7adde9"
                    layout={{ position: 'absolute', left: 163, width: 29, top: 0, bottom: 0 }}
                >
                    <ThemeImage
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                    />
                    <Icon
                        variant="27"
                        name="seasonal_icon"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 3 }}
                    />
                </Border>
                <ThemeText
                    text={captionSeasonalName ?? ''}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ fill: '#bb7dc3' }}
                    name="seasonal_name"
                    layout={{ position: 'absolute', left: 5, width: 105, top: 6, height: 16 }}
                />
                <ThemeText
                    text={captionAmount ?? '0'}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ align: 'right' }}
                    name="amount"
                    layout={{ position: 'absolute', right: 42, width: 60, top: 6, height: 16 }}
                />
                {(visibleChangeOverlay ?? false) && (
                    <Border
                        variant="6"
                        name="change_overlay"
                        tintColor="#bb7dc3"
                        layout={{ position: 'absolute', left: 44, width: 33, top: 0, bottom: 0 }}
                    >
                        <ThemeText
                            text={captionChange ?? ' 50'}
                            textStyle="text-style-il-regular-white"
                            name="change"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    </Border>
                )}
            </Region>
        </Region>
    );
};

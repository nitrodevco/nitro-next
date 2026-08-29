import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `collector_hub_header` of CollectibleHubLayout - configured through the parent's `collectorHubHeader` prop. */
export interface CollectibleHubLayoutCollectorHubHeaderProps {
    captionCaptionAllTimeHighScore?: string;
    captionCaptionCurrentScore?: string;
    captionCollectorLevel?: string;
    captionCurrentHiscoreKey?: string;
    captionCurrentHiscoreValue?: string;
    captionCurrentScoreKey?: string;
    captionCurrentScoreValue?: string;
    captionEmeraldCurrencyValue?: string;
    captionLevelTitle?: string;
    captionSilverCurrencyValue?: string;
    layout?: BoxLayout;
    srcCollectableBgLeft?: string;
    srcCollectableBgRight?: string;
    srcCollectorLevelBg?: string;
    srcCollectorLevelBg2?: string;
    srcEmeraldCurrencyIcon?: string;
    srcSilverCurrencyIcon?: string;
    visibleCaptionAllTimeHighScore?: boolean;
    visibleCaptionCurrentScore?: boolean;
    visibleTabBg?: boolean;
}

export const CollectibleHubLayoutCollectorHubHeader = ({ captionCaptionAllTimeHighScore, captionCaptionCurrentScore, captionCollectorLevel, captionCurrentHiscoreKey, captionCurrentHiscoreValue, captionCurrentScoreKey, captionCurrentScoreValue, captionEmeraldCurrencyValue, captionLevelTitle, captionSilverCurrencyValue, layout, srcCollectableBgLeft, srcCollectableBgRight, srcCollectorLevelBg, srcCollectorLevelBg2, srcEmeraldCurrencyIcon, srcSilverCurrencyIcon, visibleCaptionAllTimeHighScore, visibleCaptionCurrentScore, visibleTabBg }: CollectibleHubLayoutCollectorHubHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="collector_hub_header"
            backgroundColor="#0b162d"
            layout={{ position: 'absolute', left: -5, width: 500, top: -2, height: 122, ...layout }}
        >
            <Border
                variant="3"
                name="collector_hub_background"
                tintColor="#2c1d29"
                layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 125 }}
            >
                <ThemeImage
                    src={layoutImage('collectables_score_background_gradient.png')}
                    tint="#804138"
                    layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 122 }}
                />
                <ThemeImage
                    name="collectable_bg_left"
                    src={srcCollectableBgLeft ?? layoutImage('collectables_score_background.png')}
                    tint="#fc7c5a"
                    layout={{ position: 'absolute', left: 0, width: 166, top: 0, height: 121 }}
                />
                <ThemeImage
                    name="collectable_bg_right"
                    src={srcCollectableBgRight ?? layoutImage('collectables_score_background_right.png')}
                    tint="#fc7c5a"
                    layout={{ position: 'absolute', left: 332, width: 166, top: -160, height: 286 }}
                />
                <ThemeImage
                    name="collector_level_bg2"
                    src={srcCollectorLevelBg2 ?? layoutImage('collectables_score_element2.png')}
                    tint="#7c8c92"
                    layout={{ position: 'absolute', left: 0, width: 300, top: 17, height: 54 }}
                />
                <ThemeImage
                    name="collector_level_bg"
                    src={srcCollectorLevelBg ?? layoutImage('collectables_score_element.png')}
                    tint="#7c8c92"
                    layout={{ position: 'absolute', left: 299, width: 92, top: 17, height: 72 }}
                />
                <ThemeImage
                    src={layoutImage('collectables_cabinet_element.png')}
                    layout={{ position: 'absolute', left: -2, width: 130, top: -1, height: 128 }}
                />
                <Region
                    name="score_container"
                    layout={{ position: 'absolute', left: 116, width: 220, top: 21, height: 45 }}
                >
                    <Region
                        name="current_score_key"
                        layout={{ position: 'absolute', left: 0, width: 158, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    >
                        <ThemeText
                            text={captionCurrentScoreKey ?? t('collectibles.score')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', align: 'right' }}
                        />
                    </Region>
                    <Region
                        name="current_score_value"
                        layout={{ position: 'absolute', left: 158, width: 10, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCurrentScoreValue ?? '0'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="current_hiscore_key"
                        layout={{ position: 'absolute', left: 0, width: 158, top: 26, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    >
                        <ThemeText
                            text={captionCurrentHiscoreKey ?? t('collectibles.high_score')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', align: 'right' }}
                        />
                    </Region>
                    <Region
                        name="current_hiscore_value"
                        layout={{ position: 'absolute', left: 158, width: 11, top: 26, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCurrentHiscoreValue ?? '0'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    {(visibleCaptionCurrentScore ?? false) && (
                        <Region
                            name="caption_current_score"
                            layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text={captionCaptionCurrentScore ?? 'My Habbo Collector Score: 999999'}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', align: 'right' }}
                            />
                        </Region>
                    )}
                    {(visibleCaptionAllTimeHighScore ?? false) && (
                        <Region
                            name="caption_all_time_high_score"
                            layout={{ position: 'absolute', left: 0, width: 197, top: 25, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text={captionCaptionAllTimeHighScore ?? 'My all time high score: 999999'}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', align: 'right' }}
                            />
                        </Region>
                    )}
                </Region>
                <ThemeImage
                    src={layoutImage('collectables_level_bg.png')}
                    layout={{ position: 'absolute', left: 335, width: 64, top: 2, height: 68 }}
                />
                <Region
                    name="level_container"
                    layout={{ position: 'absolute', left: 344, width: 45, top: 16, height: 35 }}
                >
                    <Region
                        name="collector_level"
                        layout={{ position: 'absolute', left: 2, width: 40, top: 0, height: 26, maxWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionCollectorLevel ?? '0'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="level_title"
                        layout={{ position: 'absolute', left: 3, width: 41, top: 22, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLevelTitle ?? 'LEVEL'}
                            textStyle="text-style-u-bold"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
                <Border
                    variant="3"
                    name="silver_currency_border"
                    tintColor="#a99490"
                    layout={{ position: 'absolute', left: 419, width: 70, top: 18, height: 22 }}
                >
                    <Border
                        variant="3"
                        name="silver_currency_container"
                        tintColor="#3a2f29"
                        layout={{ position: 'absolute', left: 1, width: 68, top: 1, height: 20 }}
                    >
                        <Region
                            name="silver_currency_value"
                            layout={{ position: 'absolute', left: 2, width: 45, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionSilverCurrencyValue ?? '0'}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Border>
                </Border>
                <ThemeImage
                    name="silver_currency_icon"
                    src={srcSilverCurrencyIcon ?? layoutImage('pursearea_mid_silver_icon.png')}
                    layout={{ position: 'absolute', left: 466, width: 24, top: 17, height: 24 }}
                />
                <Border
                    variant="3"
                    name="emerald_currency_border"
                    tintColor="#a99490"
                    layout={{ position: 'absolute', left: 419, width: 70, top: 48, height: 22 }}
                >
                    <Border
                        variant="3"
                        name="emerald_currency_container"
                        tintColor="#3a2f29"
                        layout={{ position: 'absolute', left: 1, width: 68, top: 1, height: 20 }}
                    >
                        <Region
                            name="emerald_currency_value"
                            layout={{ position: 'absolute', left: 2, width: 45, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionEmeraldCurrencyValue ?? '0'}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Border>
                </Border>
                <ThemeImage
                    name="emerald_currency_icon"
                    src={srcEmeraldCurrencyIcon ?? layoutImage('pursearea_mid_emerald_icon.png')}
                    layout={{ position: 'absolute', left: 466, width: 24, top: 47, height: 24 }}
                />
            </Border>
            {(visibleTabBg ?? false) && (
                <Border
                    variant="3"
                    name="tab_bg"
                    tintColor="#000000"
                    blend={0.4}
                    layout={{ position: 'absolute', left: -2, width: 502, top: 91, height: 39 }}
                />
            )}
        </Region>
    );
};

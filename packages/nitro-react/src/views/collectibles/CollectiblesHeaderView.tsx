/**
 * The hub's `collector_hub_header` in `collectible_view.xml`: the style 3 border (`#2c1d29`) with
 * the score background, the two tinted `collectables_score_background` halves at 25%, the level
 * ribbons (`collector_level_bg2` / `collector_level_bg`, which `onCollectionsScoreMessage` tints by
 * level), the cabinet, the score and high score (`current_score_value` / `current_hiscore_value`),
 * the level badge (`collector_level` over `LEVEL`, upper-cased from `collectibles.level`), and the
 * silver and emerald balances (`updateBalances`, from the purse). `tab_bg` darkens the tab row
 * when the visible tabs are wider than 350 (`centerTabLayout`).
 */
import { useCollectiblesStore } from '#base/context/collectibles';
import { useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Border, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { toCollectiblesCssColor } from './collectiblesColors';

export const CollectiblesHeaderView = ({ tabBackgroundVisible }: { tabBackgroundVisible: boolean }) => {
    const t = useTranslation();
    const score = useCollectiblesStore(x => x.score);
    const highestScore = useCollectiblesStore(x => x.highestScore);
    const level = useCollectiblesStore(x => x.level);
    const levelColor = toCollectiblesCssColor(useCollectiblesStore(x => x.levelColor));
    const silver = useUserStore(x => x.silver);
    const emeralds = useUserStore(x => x.emeralds);

    return (
        <Region
            name="collector_hub_header"
            layout={{ position: 'absolute', left: -5, width: 500, top: -2, height: 122, overflow: 'hidden' }}
        >
            <Border
                variant="3"
                name="collector_hub_background"
                tintColor="#2c1d29"
                layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 125, overflow: 'hidden' }}
            >
                <ThemeImage
                    src={LayoutImage('shared/collectables_score_background_gradient.png')}
                    bitmap={{ stretchedY: false }}
                    tint="#804138"
                    layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 122 }}
                />
                <ThemeImage
                    name="collectable_bg_left"
                    src={LayoutImage('catalog/collectables_score_background.png')}
                    bitmap={{ stretchedX: false, stretchedY: false }}
                    tint="#fc7c5a"
                    alpha={0.25}
                    layout={{ position: 'absolute', left: 0, width: 166, top: 0, height: 121 }}
                />
                <ThemeImage
                    name="collectable_bg_right"
                    src={LayoutImage('catalog/collectables_score_background_right.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                    tint="#fc7c5a"
                    alpha={0.25}
                    layout={{ position: 'absolute', left: 332, top: -160 }}
                />
                <ThemeImage
                    name="collector_level_bg2"
                    src={LayoutImage('catalog/collectables_score_element2.png')}
                    bitmap={{}}
                    tint={levelColor}
                    layout={{ position: 'absolute', left: 0, width: 300, top: 17, height: 54 }}
                />
                <ThemeImage
                    name="collector_level_bg"
                    src={LayoutImage('catalog/collectables_score_element.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                    tint={levelColor}
                    layout={{ position: 'absolute', left: 299, top: 17 }}
                />
                <ThemeImage
                    src={LayoutImage('catalog/collectables_cabinet_element.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: -2, width: 130, top: -1, height: 128 }}
                />
                <Region
                    name="score_container"
                    layout={{ position: 'absolute', left: 116, width: 220, top: 21, height: 45 }}
                >
                    <ThemeText
                        text={t('collectibles.score')}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff', fontSize: 13, align: 'right' }}
                        flashFormat={{ bold: false }}
                        name="current_score_key"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, width: 158, top: 0 }}
                    />
                    <ThemeText
                        text={String(score)}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff', fontSize: 13 }}
                        name="current_score_value"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 158, top: 0 }}
                    />
                    <ThemeText
                        text={t('collectibles.high_score')}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff', fontSize: 13, align: 'right' }}
                        flashFormat={{ bold: false }}
                        name="current_hiscore_key"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, width: 158, top: 26 }}
                    />
                    <ThemeText
                        text={String(highestScore)}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff', fontSize: 13 }}
                        flashFormat={{ bold: false }}
                        name="current_hiscore_value"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 158, top: 26 }}
                    />
                </Region>
                <ThemeImage
                    src={LayoutImage('catalog/collectables_level_bg.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                    layout={{ position: 'absolute', left: 335, top: 2 }}
                />
                <Region
                    name="level_container"
                    layout={{ position: 'absolute', left: 344, width: 45, top: 16, height: 35, overflow: 'hidden' }}
                >
                    <ThemeText
                        text={String(level)}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff', fontSize: 20, align: 'center' }}
                        name="collector_level"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 2, width: 40, top: 0, maxWidth: 40 }}
                    />
                    <Region
                        name="level_title"
                        alpha={0.41}
                        layout={{ position: 'absolute', left: 3, width: 41, top: 22, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('collectibles.level').toUpperCase()}
                            textStyle="u_bold"
                            textOptions={{ fontSize: 9, align: 'center' }}
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
                        <ThemeText
                            text={String(silver)}
                            textStyle="u_regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                            name="silver_currency_value"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 2, width: 45, top: 1 }}
                        />
                    </Border>
                </Border>
                <ThemeImage
                    name="silver_currency_icon"
                    src={LayoutImage('shared/pursearea_mid_silver_icon.png')}
                    bitmap={{ pivot: 'center' }}
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
                        <ThemeText
                            text={String(emeralds)}
                            textStyle="u_regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                            name="emerald_currency_value"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 2, width: 45, top: 1 }}
                        />
                    </Border>
                </Border>
                <ThemeImage
                    name="emerald_currency_icon"
                    src={LayoutImage('catalog/pursearea_mid_emerald_icon.png')}
                    bitmap={{ pivot: 'center' }}
                    layout={{ position: 'absolute', left: 466, width: 24, top: 47, height: 24 }}
                />
            </Border>
            {tabBackgroundVisible && (
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

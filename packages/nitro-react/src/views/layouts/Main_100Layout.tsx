import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, Shape, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `100_main_xml` (layout "main", 1103x722) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Main_100LayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onGetPremiumBtn?: () => void;
    onHintRedirectBtn?: () => void;
    onSelectedView?: () => void;
    onSelectedView2?: () => void;
    onSelectedView3?: () => void;
}

export const Main_100Layout = ({ layout, onClose, onGetPremiumBtn, onHintRedirectBtn, onSelectedView, onSelectedView2, onSelectedView3 }: Main_100LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            tags={[ 'RECOLORABLE_DARK' ]}
            params={32769}
            caption="Reward Track"
            tintColor="#3576b9"
            onClose={onClose}
            layout={{ width: 1103, height: 722, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="header"
                    params={144}
                    layout={{ position: 'absolute', left: 0, width: 1079, top: 0, height: 243 }}
                >
                    <Region
                        name="cutout"
                        params={2048}
                        layout={{ position: 'absolute', left: 0, width: 245, top: 0, height: 243 }}
                    >
                        <Region
                            name="cutout"
                            params={2112}
                            layout={{ position: 'absolute', left: 242, width: 35, top: 2, height: 241 }}
                        >
                            <Shape
                                tags={[ 'RECOLORABLE_LIGHT' ]}
                                params={16}
                                shape="ellipse"
                                color="#ddebf9"
                                strokeColor="#000000"
                                strokeThickness={2}
                                radius={40}
                                layout={{ position: 'absolute', left: -35, width: 70, top: -59, height: 300 }}
                            />
                        </Region>
                        <Border
                            variant="15"
                            name="profile"
                            tags={[ 'RECOLORABLE_LIGHT' ]}
                            params={2064}
                            tintColor="#ddebf9"
                            layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 243 }}
                        >
                            <WidgetSlot
                                widgetType="avatar_image"
                                name="own_avatar"
                                params={16}
                                layout={{ position: 'absolute', left: -3, width: 90, top: -15, height: 130 }}
                            />
                            <Region
                                params={2128}
                                layout={{ position: 'absolute', left: 87, width: 175, top: -1, height: 124 }}
                            >
                                <Region
                                    name="track_info"
                                    params={3148816}
                                    layout={{ position: 'absolute', left: 0, width: 160, top: 26, height: 73, flexDirection: 'column', gap: 1 }}
                                >
                                    <Region
                                        name="track_title_region"
                                        params={17}
                                        layout={{ width: 160, height: 24, flexShrink: 0 }}
                                    >
                                        <Region
                                            name="track_title_txt"
                                            params={12582928}
                                            layout={{ position: 'absolute', left: 0, width: 160, top: 0, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text="New player track"
                                                textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                                            />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="spacer"
                                        params={16}
                                        layout={{ width: 30, height: 2, flexShrink: 0 }}
                                    />
                                    <Region
                                        name="track_desc_txt"
                                        params={16}
                                        layout={{ width: 160, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text="Kickstart your Habbo journey!"
                                            textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                                        />
                                    </Region>
                                    <Region
                                        name="track_instructions_txt"
                                        params={16}
                                        layout={{ width: 157, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text="Complete tasks to earn points and unlock rewards"
                                            textOptions={{ wordWrap: true, wordWrapWidth: 157 }}
                                        />
                                    </Region>
                                </Region>
                            </Region>
                            <Border
                                variant="15"
                                name="points_total_border"
                                tags={[ 'RECOLORABLE_MEDIUM' ]}
                                params={786640}
                                tintColor="#cfe2f9"
                                layout={{ position: 'absolute', left: 43, width: 179, top: 122, height: 62 }}
                            >
                                <Region
                                    params={786640}
                                    layout={{ position: 'absolute', left: 53, width: 72, top: 11, height: 20, minHeight: 24, maxHeight: 24, flexDirection: 'row', gap: 4 }}
                                >
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('reward_track_point_large.png')}
                                        layout={{ width: 27, height: 18, flexShrink: 0 }}
                                    />
                                    <Region
                                        name="points_total_collected_txt"
                                        params={16}
                                        layout={{ width: 41, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text="125" />
                                    </Region>
                                </Region>
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 10, width: 160, top: 36, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('reward_track.profile.points_collected')}
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                            </Border>
                            <Shape
                                name="splitter"
                                tags={[ 'RECOLORABLE_LIGHT' ]}
                                params={16}
                                color="#ddebf9"
                                strokeThickness={1}
                                layout={{ position: 'absolute', left: 16, width: 231, top: 196, height: 2 }}
                            />
                            <Region
                                params={786448}
                                layout={{ position: 'absolute', left: 9, width: 247, top: 204, height: 30, flexDirection: 'row', gap: 6 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('reward_track_checkmark.png')}
                                    layout={{ width: 17, height: 15, flexShrink: 0 }}
                                />
                                <Region
                                    name="rewards_collected_txt"
                                    params={16}
                                    layout={{ width: 224, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('reward_track.profile.rewards_collected')} />
                                </Region>
                            </Region>
                        </Border>
                    </Region>
                    <Border
                        variant="15"
                        name="rewards"
                        tags={[ 'RECOLORABLE_LIGHT' ]}
                        params={2192}
                        tintColor="#ddebf9"
                        layout={{ position: 'absolute', left: 232, width: 847, top: 0, height: 243 }}
                    >
                        <ThemeImage
                            tags={[ 'RECOLORABLE_DARK' ]}
                            params={144}
                            src={layoutImage('reward_track_prizes_background.png')}
                            tint="#3576b9"
                            layout={{ position: 'absolute', left: 2, width: 843, top: -2, height: 243 }}
                        />
                        <Region
                            params={2192}
                            layout={{ position: 'absolute', left: 2, width: 843, top: 2, height: 239 }}
                        />
                        <ThemeImage
                            tags={[ 'B' ]}
                            params={144}
                            src={layoutImage('reward_track_prizes_background_stars.png')}
                            layout={{ position: 'absolute', left: 1, width: 845, top: 0, height: 243 }}
                        />
                        <Region
                            name="track"
                            params={2192}
                            layout={{ position: 'absolute', left: 165, width: 660, top: 2, height: 239 }}
                        >
                            <Region
                                name="loading_bar"
                                params={128}
                                layout={{ position: 'absolute', left: 29, width: 602, top: 92, height: 13 }}
                            >
                                <Shape
                                    name="bg"
                                    params={2192}
                                    shape="round_rectangle"
                                    color="#888888"
                                    strokeThickness={1}
                                    radius={6}
                                    layout={{ position: 'absolute', left: 0, width: 602, top: 0, height: 13 }}
                                />
                                <Region
                                    name="progress"
                                    params={2064}
                                    layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 13 }}
                                >
                                    <Region
                                        name="loading_bar"
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 13 }}
                                    >
                                        <Shape
                                            name="shape"
                                            params={2192}
                                            shape="round_rectangle"
                                            color="#71af24"
                                            strokeThickness={1}
                                            radius={6}
                                            layout={{ position: 'absolute', left: 0, width: 304, top: 0, height: 13 }}
                                        />
                                    </Region>
                                    <Region
                                        tags={[ 'BLEND_ADD' ]}
                                        params={2192}
                                        layout={{ position: 'absolute', left: 1, width: 299, top: 1, height: 11 }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                        <Region
                            name="points_indicator_container"
                            params={2192}
                            layout={{ position: 'absolute', left: 2, width: 843, top: 2, height: 239 }}
                        >
                            <Border
                                variant="15"
                                tags={[ 'RECOLORABLE_MEDIUM' ]}
                                params={1040}
                                tintColor="#cfe2f9"
                                blend={0.7}
                                layout={{ position: 'absolute', left: 6, width: 844, top: 206, height: 44 }}
                            >
                                <Region
                                    tags={[ 'BLEND_ADD' ]}
                                    params={2192}
                                    layout={{ position: 'absolute', left: 0, width: 844, top: 0, height: 44 }}
                                />
                            </Border>
                            <Region
                                name="points_indicator"
                                params={2192}
                                layout={{ position: 'absolute', left: 194, width: 598, top: 0, height: 239 }}
                            >
                                <Region
                                    name="point_indicator_template"
                                    layout={{ position: 'absolute', left: 9, width: 80, top: 82, height: 157 }}
                                >
                                    <ThemeImage
                                        name="available_icon"
                                        params={16}
                                        src={layoutImage('reward_track_not_available_icon.png')}
                                        layout={{ position: 'absolute', left: 30, width: 20, top: 7, height: 20 }}
                                    />
                                    <Shape
                                        tags={[ 'RECOLORABLE_MEDIUM' ]}
                                        params={16}
                                        shape="ellipse"
                                        color="#cfe2f9"
                                        strokeThickness={3}
                                        layout={{ position: 'absolute', left: 37, width: 7, top: 121, height: 7 }}
                                    />
                                    <Shape
                                        tags={[ 'RECOLORABLE_MEDIUM' ]}
                                        params={16}
                                        color="#cfe2f9"
                                        strokeThickness={3}
                                        layout={{ position: 'absolute', left: 40, width: 1, top: 127, height: 8 }}
                                    />
                                    <Shape
                                        name="connector"
                                        tags={[ 'RECOLORABLE_MEDIUM' ]}
                                        params={1048592}
                                        color="#cfe2f9"
                                        strokeThickness={3}
                                        layout={{ position: 'absolute', left: 40, width: 1, top: 113, height: 9 }}
                                    />
                                    <Region
                                        name="points_txt"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 80, top: 136, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="100"
                                            textOptions={{ align: 'center' }}
                                        />
                                    </Region>
                                </Region>
                            </Region>
                        </Region>
                        <Region
                            name="prize_content"
                            params={2176}
                            layout={{ position: 'absolute', left: 196, width: 598, top: 2, height: 239 }}
                        >
                            <Region
                                name="prize_template"
                                layout={{ position: 'absolute', left: 9, width: 80, top: 4, height: 105 }}
                            >
                                <Region
                                    name="click_region"
                                    tooltip={t('reward_track.rewards.reward_tooltip.claim')}
                                    params={1}
                                    dynamicStyle="reward_track_item"
                                    layout={{ position: 'absolute', left: 12, width: 56, top: 10, height: 60 }}
                                >
                                    <Border
                                        variant="1"
                                        name="shadow"
                                        tags={[ 'INVIS_ON_DISABLE' ]}
                                        params={1168}
                                        blend={0.25}
                                        layout={{ position: 'absolute', left: 0, width: 56, top: 44, height: 16 }}
                                    />
                                    <Border
                                        variant="16"
                                        name="border"
                                        tags={[ '#icon' ]}
                                        params={2176}
                                        tintColor="#f9efe0"
                                        layout={{ position: 'absolute', left: 0, width: 56, top: 2, height: 56 }}
                                    >
                                        <WidgetSlot
                                            widgetType="product_icon"
                                            name="product_icon"
                                            params={3280}
                                            layout={{ position: 'absolute', left: 8, width: 40, top: 8, height: 40 }}
                                        />
                                        <Shape
                                            name="quantity_container"
                                            params={787664}
                                            shape="round_rectangle"
                                            color="#f9efe0"
                                            strokeColor="#000000"
                                            strokeThickness={1}
                                            radius={5}
                                            layout={{ position: 'absolute', left: 18, width: 20, top: 37, height: 14 }}
                                        />
                                    </Border>
                                </Region>
                                <Region
                                    name="connector"
                                    params={16}
                                    backgroundColor="#000000"
                                    layout={{ position: 'absolute', left: 39, width: 2, top: 66, height: 19 }}
                                />
                                <ThemeImage
                                    name="locked_icon"
                                    src={layoutImage('reward_track_locked_reward.png')}
                                    layout={{ position: 'absolute', left: 53, width: 18, top: 54, height: 22 }}
                                />
                                <ThemeImage
                                    name="claimed_icon"
                                    src={layoutImage('reward_track_checkmark.png')}
                                    layout={{ position: 'absolute', left: 54, width: 17, top: 4, height: 15 }}
                                />
                            </Region>
                            <Region
                                name="prize_template_premium"
                                layout={{ position: 'absolute', left: 9, width: 80, top: 89, height: 104 }}
                            >
                                <Region
                                    name="click_region"
                                    tooltip={t('reward_track.rewards.reward_tooltip.premium')}
                                    params={1}
                                    dynamicStyle="reward_track_item"
                                    layout={{ position: 'absolute', left: 12, width: 56, top: 34, height: 60 }}
                                >
                                    <Border
                                        variant="1"
                                        name="shadow"
                                        tags={[ 'INVIS_ON_DISABLE' ]}
                                        params={1168}
                                        blend={0.25}
                                        layout={{ position: 'absolute', left: 0, width: 56, top: 44, height: 16 }}
                                    />
                                    <Border
                                        variant="16"
                                        name="border"
                                        tags={[ '#icon' ]}
                                        params={2176}
                                        tintColor="#f1def7"
                                        layout={{ position: 'absolute', left: 0, width: 56, top: 2, height: 56 }}
                                    >
                                        <WidgetSlot
                                            widgetType="product_icon"
                                            name="product_icon"
                                            params={3280}
                                            layout={{ position: 'absolute', left: 8, width: 40, top: 8, height: 40 }}
                                        />
                                        <Shape
                                            name="quantity_container"
                                            params={787664}
                                            shape="round_rectangle"
                                            color="#f1def7"
                                            strokeColor="#000000"
                                            strokeThickness={1}
                                            radius={5}
                                            layout={{ position: 'absolute', left: 18, width: 20, top: 37, height: 14 }}
                                        />
                                    </Border>
                                </Region>
                                <Region
                                    name="connector"
                                    params={1048592}
                                    backgroundColor="#000000"
                                    layout={{ position: 'absolute', left: 39, width: 2, top: 19, height: 19 }}
                                />
                                <ThemeImage
                                    name="locked_icon"
                                    src={layoutImage('reward_track_locked_reward.png')}
                                    layout={{ position: 'absolute', left: 53, width: 18, top: 78, height: 22 }}
                                />
                                <ThemeImage
                                    name="claimed_icon"
                                    src={layoutImage('reward_track_checkmark.png')}
                                    layout={{ position: 'absolute', left: 54, width: 17, top: 28, height: 15 }}
                                />
                            </Region>
                        </Region>
                        <Border
                            variant="15"
                            name="free_tier_cont"
                            params={16}
                            tintColor="#f9efe0"
                            blend={0.5}
                            layout={{ position: 'absolute', left: 96, width: 700, top: 6, height: 80 }}
                        >
                            <Region
                                name="information"
                                params={2064}
                                layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 80 }}
                            >
                                <Region
                                    name="cut"
                                    params={2192}
                                    layout={{ position: 'absolute', left: 0, width: 98, top: 0, height: 80 }}
                                >
                                    <Border
                                        variant="15"
                                        name="free_tier_cont"
                                        params={2192}
                                        tintColor="#f9efe0"
                                        blend={0.5}
                                        layout={{ position: 'absolute', left: 0, width: 103, top: 0, height: 80 }}
                                    />
                                </Region>
                                <Region
                                    name="splitter"
                                    params={80}
                                    layout={{ position: 'absolute', left: 98, width: 2, top: 0, height: 80 }}
                                >
                                    <Border
                                        variant="15"
                                        name="bg"
                                        params={2064}
                                        tintColor="#f9efe0"
                                        blend={0.5}
                                        layout={{ position: 'absolute', left: -18, width: 20, top: -6, height: 91 }}
                                    />
                                </Region>
                                <Region
                                    params={1048592}
                                    layout={{ position: 'absolute', left: 0, width: 100, top: 57, height: 21, flexDirection: 'column' }}
                                >
                                    <Region
                                        name="title"
                                        params={16}
                                        layout={{ width: 90, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('reward_track.rewards.free')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 90, align: 'center' }}
                                        />
                                    </Region>
                                    <Region
                                        name="desc"
                                        params={16}
                                        layout={{ width: 90, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                    />
                                </Region>
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('reward_track_free_track.png')}
                                    layout={{ position: 'absolute', left: 26, width: 49, top: 9, height: 48 }}
                                />
                            </Region>
                        </Border>
                        <Border
                            variant="15"
                            name="premium_tier_cont"
                            params={16}
                            tintColor="#f1def7"
                            blend={0.5}
                            layout={{ position: 'absolute', left: 96, width: 700, top: 115, height: 80 }}
                        >
                            <Region
                                name="information"
                                params={2064}
                                layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 80 }}
                            >
                                <Region
                                    name="cut"
                                    params={2192}
                                    layout={{ position: 'absolute', left: 0, width: 98, top: 0, height: 80 }}
                                >
                                    <Border
                                        variant="15"
                                        name="free_tier_cont"
                                        params={2192}
                                        tintColor="#f1def7"
                                        blend={0.5}
                                        layout={{ position: 'absolute', left: 0, width: 103, top: 0, height: 80 }}
                                    />
                                </Region>
                                <Region
                                    name="splitter"
                                    params={80}
                                    layout={{ position: 'absolute', left: 98, width: 2, top: 0, height: 80 }}
                                >
                                    <Border
                                        variant="15"
                                        name="bg"
                                        params={2064}
                                        tintColor="#f1def7"
                                        blend={0.5}
                                        layout={{ position: 'absolute', left: -18, width: 20, top: -6, height: 91 }}
                                    />
                                </Region>
                                <Region
                                    params={1048592}
                                    layout={{ position: 'absolute', left: 0, width: 100, top: 47, height: 30, flexDirection: 'column', gap: -3 }}
                                >
                                    <Region
                                        name="title"
                                        params={16}
                                        layout={{ width: 90, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('reward_track.rewards.premium')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 90, align: 'center' }}
                                        />
                                    </Region>
                                    <Region
                                        name="desc"
                                        params={16}
                                        layout={{ width: 90, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('reward_track.rewards.premium.info')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 90, align: 'center' }}
                                        />
                                    </Region>
                                </Region>
                            </Region>
                            <ThemeImage
                                params={16}
                                src={layoutImage('reward_track_premium_track.png')}
                                layout={{ position: 'absolute', left: 24, width: 58, top: 4, height: 45 }}
                            />
                        </Border>
                        <Region
                            name="previous_btn"
                            params={1}
                            dynamicStyle="button"
                            layout={{ position: 'absolute', left: 54, width: 33, top: 84, height: 34 }}
                        >
                            <ThemeImage
                                tags={[ '#icon' ]}
                                src={layoutImage('icons_back.png')}
                                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
                            />
                        </Region>
                        <Region
                            name="next_btn"
                            params={1}
                            dynamicStyle="button"
                            layout={{ position: 'absolute', left: 805, width: 33, top: 84, height: 34 }}
                        >
                            <ThemeImage
                                tags={[ '#icon' ]}
                                src={layoutImage('icons_forward.png')}
                                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
                            />
                        </Region>
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 74, width: 17, top: 77, height: 18 }}
                        >
                            <Border
                                variant="7"
                                name="previous_unclaimed_indicator"
                                params={262144}
                                tintColor="#ee2924"
                                layout={{ width: '100%', height: '100%' }}
                            >
                                <Region
                                    name="previous_unclaimed_count"
                                    params={4194320}
                                    layout={{ position: 'absolute', left: 3, width: 9, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="2"
                                        textStyle="text-style-il-regular-white"
                                    />
                                </Region>
                            </Border>
                        </Region>
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 827, width: 17, top: 77, height: 18 }}
                        >
                            <Border
                                variant="7"
                                name="next_unclaimed_indicator"
                                params={262144}
                                tintColor="#ee2924"
                                layout={{ width: '100%', height: '100%' }}
                            >
                                <Region
                                    name="next_unclaimed_count"
                                    params={4194320}
                                    layout={{ position: 'absolute', left: 3, width: 9, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="2"
                                        textStyle="text-style-il-regular-white"
                                    />
                                </Region>
                            </Border>
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="body"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 1079, top: 249, height: 418 }}
                >
                    <Border
                        variant="15"
                        name="task_list"
                        params={2064}
                        tintColor="#f0f0f0"
                        layout={{ position: 'absolute', left: 0, width: 444, top: 0, height: 418 }}
                    >
                        <Region
                            name="header"
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 444, top: 0, height: 95 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('reward_track_task_list.png')}
                                layout={{ position: 'absolute', left: 19, width: 19, top: 17, height: 25 }}
                            />
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 46, width: 83, top: 11, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('reward_track.tasks')} />
                            </Region>
                            <Region
                                name="tasks_completion_txt"
                                params={16}
                                layout={{ position: 'absolute', left: 46, width: 186, top: 31, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('reward_track.tasks.progress')}
                                    textOptions={{ fill: '#3c3c3c' }}
                                />
                            </Region>
                            <Region
                                name="tab_selection"
                                params={16}
                                layout={{ position: 'absolute', left: 14, width: 278, top: 58, height: 30, flexDirection: 'row', gap: 7 }}
                            >
                                <Region
                                    name="tab_button_template"
                                    params={17}
                                    layout={{ width: 88, height: 29, flexShrink: 0 }}
                                >
                                    <Button
                                        variant="3"
                                        name="selected_view"
                                        tags={[ 'RECOLORABLE_DARK' ]}
                                        params={131217}
                                        tintColor="#3576b9"
                                        onPointerTap={onSelectedView}
                                        textStyle="text-style-button-shiny-regular"
                                        layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 29 }}
                                    />
                                    <Shape
                                        name="notselected_shape"
                                        params={144}
                                        visible={false}
                                        shape="round_rectangle"
                                        color="#dddcdc"
                                        strokeColor="#b7b7b7"
                                        strokeThickness={2}
                                        radius={4}
                                        layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 29 }}
                                    />
                                    <Region
                                        name="button_text"
                                        params={208}
                                        layout={{ position: 'absolute', left: 5, width: 78, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('reward_track.tasks.tab.all_tasks')}
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </Region>
                                <Region
                                    name="tab_button_template"
                                    params={17}
                                    layout={{ width: 88, height: 29, flexShrink: 0 }}
                                >
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 29 }}
                                    >
                                        <Button
                                            variant="3"
                                            name="selected_view"
                                            tags={[ 'RECOLORABLE_DARK' ]}
                                            params={131217}
                                            tintColor="#3576b9"
                                            onPointerTap={onSelectedView2}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ width: '100%', height: '100%' }}
                                        />
                                    </Region>
                                    <Shape
                                        name="notselected_shape"
                                        params={144}
                                        shape="round_rectangle"
                                        color="#dddcdc"
                                        strokeColor="#b7b7b7"
                                        strokeThickness={2}
                                        radius={4}
                                        layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 29 }}
                                    />
                                    <Region
                                        name="button_text"
                                        params={208}
                                        layout={{ position: 'absolute', left: 5, width: 78, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('reward_track.tasks.tab.in_progress')}
                                            textOptions={{ fill: '#444444', align: 'center' }}
                                        />
                                    </Region>
                                </Region>
                                <Region
                                    name="tab_button_template"
                                    params={17}
                                    layout={{ width: 88, height: 29, flexShrink: 0 }}
                                >
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 29 }}
                                    >
                                        <Button
                                            variant="3"
                                            name="selected_view"
                                            tags={[ 'RECOLORABLE_DARK' ]}
                                            params={131217}
                                            tintColor="#3576b9"
                                            onPointerTap={onSelectedView3}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ width: '100%', height: '100%' }}
                                        />
                                    </Region>
                                    <Shape
                                        name="notselected_shape"
                                        params={144}
                                        shape="round_rectangle"
                                        color="#dddcdc"
                                        strokeColor="#b7b7b7"
                                        strokeThickness={2}
                                        radius={4}
                                        layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 29 }}
                                    />
                                    <Region
                                        name="button_text"
                                        params={208}
                                        layout={{ position: 'absolute', left: 5, width: 78, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('reward_track.tasks.tab.completed')}
                                            textOptions={{ fill: '#444444', align: 'center' }}
                                        />
                                    </Region>
                                </Region>
                            </Region>
                        </Region>
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 14, width: 422, top: 94, height: 259 }}
                        >
                            <Region
                                name="tasks"
                                params={2064}
                                layout={{ flexDirection: 'column', gap: 5, width: '100%' }}
                            >
                                <Region
                                    name="task_template"
                                    params={17}
                                    layout={{ width: 406, height: 61, flexShrink: 0 }}
                                >
                                    <Border
                                        variant="15"
                                        name="task_border"
                                        params={2192}
                                        tintColor="#f0f0f0"
                                        layout={{ position: 'absolute', left: 0, width: 406, top: 0, height: 61 }}
                                    >
                                        <Region
                                            name="task_name"
                                            params={16}
                                            layout={{ position: 'absolute', left: 67, width: 202, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text="Visit Rooms" />
                                        </Region>
                                        <Region
                                            name="task_description"
                                            params={16}
                                            layout={{ position: 'absolute', left: 67, width: 202, top: 23, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text="Explore rooms made by other players" />
                                        </Region>
                                        <Region
                                            name="loading_bar"
                                            layout={{ position: 'absolute', left: 68, width: 200, top: 44, height: 7 }}
                                        >
                                            <Shape
                                                name="bg"
                                                params={144}
                                                shape="round_rectangle"
                                                color="#cccccc"
                                                strokeColor="#777777"
                                                strokeThickness={1}
                                                radius={5}
                                                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 7 }}
                                            />
                                            <Region
                                                name="progress"
                                                params={16}
                                                layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 7 }}
                                            >
                                                <Shape
                                                    name="loading_bar"
                                                    params={144}
                                                    shape="round_rectangle"
                                                    color="#eba60c"
                                                    strokeThickness={1}
                                                    radius={5}
                                                    layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 7 }}
                                                />
                                                <Region
                                                    name="gradient"
                                                    tags={[ 'BLEND_ADD' ]}
                                                    params={144}
                                                    layout={{ position: 'absolute', left: 1, width: 138, top: 1, height: 5 }}
                                                />
                                            </Region>
                                        </Region>
                                        <Region
                                            name="task_progress_txt"
                                            params={16}
                                            layout={{ position: 'absolute', left: 280, width: 25, top: 38, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text="3 / 5" />
                                        </Region>
                                        <Border
                                            variant="15"
                                            params={262224}
                                            tintColor="#f0f0f0"
                                            layout={{ position: 'absolute', left: 331, width: 62, top: 15, height: 31 }}
                                        >
                                            <Region
                                                params={4194320}
                                                layout={{ position: 'absolute', left: 8, width: 44, top: 4, height: 23, flexDirection: 'row', gap: 5 }}
                                            >
                                                <Region
                                                    name="track_reward_txt"
                                                    params={16}
                                                    layout={{ width: 20, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                >
                                                    <ThemeText text="30" />
                                                </Region>
                                                <ThemeImage
                                                    name="track_reward_icon"
                                                    params={16}
                                                    src={layoutImage('reward_track_point_small.png')}
                                                    layout={{ width: 19, height: 14, flexShrink: 0 }}
                                                />
                                            </Region>
                                        </Border>
                                        <ThemeImage
                                            name="task_image"
                                            params={16}
                                            src={layoutImage('reward_track_tasks_dance.png')}
                                            layout={{ position: 'absolute', left: 9, width: 52, top: 6, height: 50 }}
                                        />
                                    </Border>
                                </Region>
                                <Border
                                    variant="15"
                                    params={16}
                                    tintColor="#f0f0f0"
                                    layout={{ width: 406, height: 61, flexShrink: 0 }}
                                />
                                <Border
                                    variant="15"
                                    params={16}
                                    tintColor="#f0f0f0"
                                    layout={{ width: 406, height: 61, flexShrink: 0 }}
                                />
                                <Border
                                    variant="15"
                                    params={16}
                                    tintColor="#f0f0f0"
                                    layout={{ width: 406, height: 61, flexShrink: 0 }}
                                />
                                <Border
                                    variant="15"
                                    params={16}
                                    tintColor="#f0f0f0"
                                    layout={{ width: 406, height: 57, flexShrink: 0 }}
                                />
                            </Region>
                        </ScrollArea>
                        <Border
                            variant="15"
                            name="reward_info"
                            params={1168}
                            tintColor="#f5e1b9"
                            layout={{ position: 'absolute', left: 9, width: 426, top: 361, height: 48 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('reward_track_reward_gift.png')}
                                layout={{ position: 'absolute', left: 8, width: 41, top: 7, height: 36 }}
                            />
                            <Region
                                params={3145744}
                                layout={{ position: 'absolute', left: 57, width: 265, top: 9, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('reward_track.tasks.tip')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 265 }}
                                />
                            </Region>
                            <ThemeImage
                                params={16}
                                src={layoutImage('reward_track_frank_and_piccolo.png')}
                                layout={{ position: 'absolute', left: 329, width: 88, top: 7, height: 39 }}
                            />
                        </Border>
                        <Border
                            variant="15"
                            name="reward_info_not_premium"
                            params={1168}
                            tintColor="#f1def7"
                            layout={{ position: 'absolute', left: 9, width: 426, top: 361, height: 48 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('reward_track_reward_gift_premium.png')}
                                layout={{ position: 'absolute', left: 8, width: 41, top: 7, height: 36 }}
                            />
                            <Region
                                params={3145744}
                                layout={{ position: 'absolute', left: 57, width: 227, top: 9, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('reward_track.tasks.tip_upgrade')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 227 }}
                                />
                            </Region>
                            <Button
                                variant="3"
                                name="get_premium_btn"
                                params={393297}
                                tintColor="#b265ce"
                                onPointerTap={onGetPremiumBtn}
                                textStyle="text-style-button-shiny-bold"
                                layout={{ position: 'absolute', left: 323, width: 91, top: 9, height: 30 }}
                            >
                                {t('reward_track.tasks.tip_upgrade.button')}
                            </Button>
                        </Border>
                    </Border>
                    <Border
                        variant="15"
                        name="task_info"
                        params={2192}
                        tintColor="#f0f0f0"
                        layout={{ position: 'absolute', left: 451, width: 628, top: 0, height: 418 }}
                    >
                        <Region
                            name="task_info_header"
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 628, top: 0, height: 128 }}
                        >
                            <ThemeImage
                                name="task_info_img"
                                params={16}
                                src={layoutImage('reward_track_tasks_dance.png')}
                                layout={{ position: 'absolute', left: 23, width: 104, top: 23, height: 100 }}
                            />
                            <Region
                                name="task_info_name_region"
                                params={17}
                                layout={{ position: 'absolute', left: 137, width: 100, top: 35, height: 22 }}
                            >
                                <Region
                                    name="task_info_name"
                                    params={12582928}
                                    layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="Visit Rooms" />
                                </Region>
                            </Region>
                            <Region
                                name="task_info_description"
                                params={144}
                                layout={{ position: 'absolute', left: 137, width: 469, top: 59, height: 63, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Explore the hotel and visit rooms created by other players!"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 469 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="task_levels"
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 628, top: 127, height: 200 }}
                        >
                            <Region
                                name="spacer"
                                params={16}
                                backgroundColor="#d6d5d3"
                                layout={{ position: 'absolute', left: 22, width: 582, top: 20, height: 2 }}
                            />
                            <Region
                                name="levels_title_bg"
                                params={16}
                                backgroundColor="#f0f0f0"
                                layout={{ position: 'absolute', left: 37, width: 53, top: 7, height: 18 }}
                            >
                                <Region
                                    params={4194320}
                                    layout={{ position: 'absolute', left: 3, width: 44, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('reward_track.levels.title')}
                                        textOptions={{ fill: '#124b8b' }}
                                    />
                                </Region>
                            </Region>
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 22, width: 598, top: 35, height: 150 }}
                            >
                                <Region
                                    name="levels"
                                    params={16}
                                    layout={{ flexDirection: 'column', gap: 9, width: '100%' }}
                                >
                                    <Region
                                        name="level_template"
                                        params={17}
                                        layout={{ width: 582, height: 44, flexShrink: 0 }}
                                    >
                                        <Border
                                            variant="15"
                                            name="level_border"
                                            params={2192}
                                            tintColor="#e3e3e3"
                                            layout={{ position: 'absolute', left: 0, width: 582, top: 0, height: 44 }}
                                        >
                                            <Region
                                                name="level_name"
                                                params={16}
                                                layout={{ position: 'absolute', left: 18, width: 85, top: 14, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                            >
                                                <ThemeText text={t('reward_track.levels.level')} />
                                            </Region>
                                            <Region
                                                name="loading_bar"
                                                layout={{ position: 'absolute', left: 94, width: 260, top: 19, height: 7 }}
                                            >
                                                <Shape
                                                    name="bg"
                                                    params={144}
                                                    shape="round_rectangle"
                                                    color="#cccccc"
                                                    strokeColor="#777777"
                                                    strokeThickness={1}
                                                    radius={5}
                                                    layout={{ position: 'absolute', left: 0, width: 260, top: 0, height: 7 }}
                                                />
                                                <Region
                                                    name="progress"
                                                    params={16}
                                                    layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 7 }}
                                                >
                                                    <Shape
                                                        name="loading_bar"
                                                        params={144}
                                                        shape="round_rectangle"
                                                        color="#eba60c"
                                                        strokeThickness={1}
                                                        radius={5}
                                                        layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 7 }}
                                                    />
                                                    <Region
                                                        name="gradient"
                                                        tags={[ 'BLEND_ADD' ]}
                                                        params={144}
                                                        layout={{ position: 'absolute', left: 1, width: 138, top: 1, height: 5 }}
                                                    />
                                                </Region>
                                            </Region>
                                            <Region
                                                name="level_progress_txt"
                                                params={16}
                                                layout={{ position: 'absolute', left: 377, width: 25, top: 14, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                            >
                                                <ThemeText text="3 / 5" />
                                            </Region>
                                            <Region
                                                params={262224}
                                                layout={{ position: 'absolute', left: 470, width: 94, top: 7, height: 30, flexDirection: 'row', gap: 10 }}
                                            >
                                                <ThemeImage
                                                    name="completed_icon"
                                                    params={16}
                                                    src={layoutImage('reward_track_checkmark.png')}
                                                    layout={{ width: 17, height: 15, flexShrink: 0 }}
                                                />
                                                <ThemeImage
                                                    name="locked_icon"
                                                    params={16}
                                                    src={layoutImage('reward_track_locked_small.png')}
                                                    layout={{ width: 13, height: 18, flexShrink: 0 }}
                                                />
                                                <Region
                                                    name="reward_container"
                                                    params={4194320}
                                                    layout={{ width: 44, height: 23, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                                                >
                                                    <Region
                                                        name="level_reward_txt"
                                                        params={16}
                                                        layout={{ width: 20, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                    >
                                                        <ThemeText text="30" />
                                                    </Region>
                                                    <ThemeImage
                                                        name="level_reward_icon"
                                                        params={16}
                                                        src={layoutImage('reward_track_point_small.png')}
                                                        layout={{ width: 19, height: 14, flexShrink: 0 }}
                                                    />
                                                </Region>
                                            </Region>
                                        </Border>
                                    </Region>
                                    <Border
                                        variant="15"
                                        params={16}
                                        tintColor="#bdd6ef"
                                        layout={{ width: 582, height: 44, flexShrink: 0 }}
                                    />
                                    <Border
                                        variant="15"
                                        params={16}
                                        tintColor="#e3e3e3"
                                        layout={{ width: 582, height: 44, flexShrink: 0 }}
                                    />
                                    <Border
                                        variant="15"
                                        params={16}
                                        tintColor="#f0f0f0"
                                        layout={{ width: 582, height: 46, flexShrink: 0 }}
                                    />
                                </Region>
                            </ScrollArea>
                        </Region>
                        <Border
                            variant="14"
                            name="task_hint_border"
                            params={1040}
                            tintColor="#e9e9e9"
                            layout={{ position: 'absolute', left: 16, width: 596, top: 331, height: 74 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 76, width: 27, top: 10, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('reward_track.levels.tip')}
                                    textOptions={{ fill: '#124b8b' }}
                                />
                            </Region>
                            <Region
                                name="task_hint_text"
                                params={16}
                                layout={{ position: 'absolute', left: 76, width: 333, top: 29, height: 42, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Use the navigator to find cool rooms!"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 333 }}
                                />
                            </Region>
                            <Button
                                variant="3"
                                name="hint_redirect_btn"
                                params={393233}
                                onPointerTap={onHintRedirectBtn}
                                textStyle="text-style-button-shiny-regular"
                                layout={{ position: 'absolute', left: 471, width: 109, top: 16, height: 30 }}
                            >
                                Open Navigator
                            </Button>
                            <ThemeImage
                                params={16}
                                src={layoutImage('reward_track_frank_tips.png')}
                                layout={{ position: 'absolute', left: 15, width: 52, top: 7, height: 66 }}
                            />
                        </Border>
                    </Border>
                </Region>
            </Region>
        </Frame>
    );
};

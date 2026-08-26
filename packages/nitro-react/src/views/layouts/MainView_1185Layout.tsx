import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1185_main_view_xml` (layout "main_view", 412x650) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainView_1185LayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onHiddenDropdown?: () => void;
    onNextBtn?: () => void;
    onPreviousBtn?: () => void;
}

export const MainView_1185Layout = ({ layout, onClose, onHiddenDropdown, onNextBtn, onPreviousBtn }: MainView_1185LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="10000"
            params={32769}
            onClose={onClose}
            layout={{ width: 412, height: 650, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="frame_header_override"
                    params={144}
                    layout={{ position: 'absolute', left: 88, width: 211, top: 3, height: 32 }}
                >
                    <Region
                        params={208}
                        layout={{ position: 'absolute', left: 48, width: 115, top: 0, height: 32, flexDirection: 'row', gap: 6 }}
                    >
                        <Region
                            name="hacky_title"
                            params={147472}
                            layout={{ width: 96, height: 27, flexShrink: 0 }}
                        >
                            <Region
                                name="title_txt_shadow_0"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="Top Badges" />
                            </Region>
                            <Region
                                name="title_txt_shadow_1"
                                params={16}
                                layout={{ position: 'absolute', left: 1, width: 94, top: 4, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="Top Badges" />
                            </Region>
                            <Region
                                name="title_txt_shadow_2"
                                params={16}
                                layout={{ position: 'absolute', left: 2, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="Top Badges" />
                            </Region>
                            <Region
                                name="title_txt_shadow_3"
                                params={16}
                                layout={{ position: 'absolute', left: 1, width: 94, top: 6, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="Top Badges" />
                            </Region>
                            <Region
                                name="title_txt"
                                params={16}
                                layout={{ position: 'absolute', left: 1, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Top Badges"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="dropdown_region"
                            params={1}
                            dynamicStyle="button"
                            layout={{ width: 13, height: 9, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="dropdown_opener"
                                tags={[ '#icon' ]}
                                params={16}
                                src={layoutImage('badge_leaderboard_dropdown_opener.png')}
                                layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 8 }}
                            />
                            <Dropmenu
                                variant="100"
                                name="hidden_dropdown"
                                params={17}
                                onPointerTap={onHiddenDropdown}
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 0 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="body"
                    params={2192}
                    layout={{ position: 'absolute', left: 6, width: 376, top: 59, height: 574 }}
                >
                    <Region
                        name="info_container"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 376, top: 0, height: 54 }}
                    >
                        <ThemeImage
                            name="info_bg"
                            params={16}
                            src={layoutImage('badge_leaderboard_header.png')}
                            layout={{ position: 'absolute', left: 0, width: 376, top: 0, height: 54 }}
                        />
                        <ThemeImage
                            name="rank_type_extended_img"
                            params={16}
                            src={layoutImage('badge_rarity_badges_emblem_unique_extended.png')}
                            layout={{ position: 'absolute', left: 4, width: 65, top: 1, height: 47 }}
                        />
                        <Region
                            name="rank_type_info"
                            params={3145744}
                            layout={{ position: 'absolute', left: 74, width: 295, top: 6, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Players with the most unique badges.Unique badges can be obtained from exceptional events where only a single user is awarded the badge."
                                textOptions={{ fill: '#222222', wordWrap: true, wordWrapWidth: 295 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="ranking_list"
                        params={2192}
                        layout={{ position: 'absolute', left: 7, width: 362, top: 60, height: 428, flexDirection: 'column', gap: 2 }}
                    >
                        <Region
                            name="entry_template"
                            params={144}
                            layout={{ width: 362, height: 41, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="entry_bg_even"
                                params={16}
                                src={layoutImage('badge_leaderboard_entry_even.png')}
                                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 41 }}
                            />
                            <Region
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 41 }}
                            >
                                <ThemeImage
                                    name="entry_bg_uneven"
                                    params={16}
                                    src={layoutImage('badge_leaderboard_entry_uneven.png')}
                                    layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 41 }}
                                />
                            </Region>
                            <Region
                                name="rank_container"
                                params={3088}
                                layout={{ position: 'absolute', left: 5, width: 45, top: 1, height: 39 }}
                            >
                                <Border
                                    variant="14"
                                    name="rank_border"
                                    params={786640}
                                    tintColor="#6382aa"
                                    layout={{ position: 'absolute', left: 10, width: 25, top: 7, height: 25 }}
                                >
                                    <Region
                                        name="rank_number"
                                        params={4194320}
                                        layout={{ position: 'absolute', left: 6, width: 12, top: 2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text="1"
                                            textOptions={{ fill: '#ffffff' }}
                                        />
                                    </Region>
                                </Border>
                            </Region>
                            <Region
                                name="region_profile"
                                params={145}
                                layout={{ position: 'absolute', left: 51, width: 44, top: 3, height: 35 }}
                            >
                                <Region
                                    params={1073741840}
                                    layout={{ position: 'absolute', left: -3, width: 50, top: -18, height: 70 }}
                                >
                                    <ThemeImage
                                        name="canvas"
                                        params={1077673984}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 20, width: 10, top: 30, height: 10 }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="username_txt"
                                params={3088}
                                layout={{ position: 'absolute', left: 98, width: 114, top: 12, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="Username very long" />
                            </Region>
                            <Region
                                name="right_aligned"
                                params={262224}
                                layout={{ position: 'absolute', left: 287, width: 64, top: 7, height: 26, flexDirection: 'row', gap: 8 }}
                            >
                                <Region
                                    name="score_txt"
                                    params={16}
                                    layout={{ width: 31, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="7864" />
                                </Region>
                                <ThemeImage
                                    name="rank_type_img"
                                    params={16}
                                    src={layoutImage('badge_rarity_badges_emblem_unique.png')}
                                    layout={{ width: 25, height: 25, flexShrink: 0 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="own_container"
                        params={1168}
                        layout={{ position: 'absolute', left: 3, width: 370, top: 492, height: 43 }}
                    >
                        <ThemeImage
                            name="own_bg"
                            params={16}
                            src={layoutImage('badge_leaderboard_entry_self.png')}
                            layout={{ position: 'absolute', left: 0, width: 370, top: 0, height: 43 }}
                        />
                        <Region
                            name="rank_container"
                            params={3088}
                            layout={{ position: 'absolute', left: 5, width: 45, top: 2, height: 39 }}
                        >
                            <Border
                                variant="14"
                                name="rank_border"
                                params={786640}
                                tintColor="#6382aa"
                                layout={{ position: 'absolute', left: 9, width: 27, top: 7, height: 25 }}
                            >
                                <Region
                                    name="rank_own"
                                    params={4194320}
                                    layout={{ position: 'absolute', left: 6, width: 14, top: 2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="--"
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                            </Border>
                        </Region>
                        <Region
                            name="region_profile"
                            params={145}
                            layout={{ position: 'absolute', left: 51, width: 44, top: 4, height: 35 }}
                        >
                            <Region
                                params={1073741840}
                                layout={{ position: 'absolute', left: -3, width: 50, top: -18, height: 70 }}
                            >
                                <ThemeImage
                                    name="canvas"
                                    params={1077673984}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 20, width: 10, top: 30, height: 10 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="username_txt"
                            params={3088}
                            layout={{ position: 'absolute', left: 97, width: 99, top: 13, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="sirjonasxx-XIVXXI" />
                        </Region>
                        <Region
                            name="right_aligned"
                            params={262224}
                            layout={{ position: 'absolute', left: 295, width: 64, top: 7, height: 26, flexDirection: 'row', gap: 8 }}
                        >
                            <Region
                                name="score_txt"
                                params={16}
                                layout={{ width: 31, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="7864" />
                            </Region>
                            <ThemeImage
                                name="rank_type_img"
                                params={16}
                                src={layoutImage('badge_rarity_badges_emblem_unique.png')}
                                layout={{ width: 25, height: 25, flexShrink: 0 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="buttons"
                        params={787664}
                        layout={{ position: 'absolute', left: 49, width: 279, top: 545, height: 26, flexDirection: 'row', gap: 79 }}
                    >
                        <Button
                            variant="3"
                            name="previous_btn"
                            params={131089}
                            onPointerTap={onPreviousBtn}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ width: 100, height: 26, flexShrink: 0, minWidth: 100, maxWidth: 100 }}
                        >
                            {t('badge_leaderboard.previous')}
                        </Button>
                        <Button
                            variant="3"
                            name="next_btn"
                            params={131089}
                            onPointerTap={onNextBtn}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ width: 100, height: 26, flexShrink: 0, minWidth: 100, maxWidth: 100 }}
                        >
                            {t('badge_leaderboard.next')}
                        </Button>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};

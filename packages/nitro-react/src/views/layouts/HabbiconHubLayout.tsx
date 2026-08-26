import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Icon, Region, ScrollArea, Shape, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1558_habbicon_hub_xml` (layout "habbicon_view", 560x570) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabbiconHubLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onHabbiconPopupActionButton?: () => void;
    onHabbiconPopupBuyButton?: () => void;
    onRewardActionButton?: () => void;
    onRewardBuyButton?: () => void;
    onTabAllSets?: () => void;
    onTabFavourited?: () => void;
    onTabOwned?: () => void;
}

export const HabbiconHubLayout = ({ layout, onClose, onHabbiconPopupActionButton, onHabbiconPopupBuyButton, onRewardActionButton, onRewardBuyButton, onTabAllSets, onTabFavourited, onTabOwned }: HabbiconHubLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="HabbiconHub"
            name="HabbiconHub"
            params={1073774593}
            caption={t('habbicon_book.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 560, height: 570, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="3"
                    name="album_background"
                    params={2192}
                    tintColor="#d7d1be"
                    layout={{ position: 'absolute', left: 0, width: 554, top: 0, height: 530 }}
                />
                <Region
                    name="album_header"
                    params={128}
                    backgroundColor="#2b7aa0"
                    layout={{ position: 'absolute', left: -2, width: 558, top: -3, height: 110 }}
                >
                    <Border
                        variant="3"
                        name="album_header_background"
                        params={144}
                        tintColor="#1f5d78"
                        layout={{ position: 'absolute', left: 2, width: 554, top: 2, height: 106 }}
                    >
                        <ThemeImage
                            name="album_header_pattern"
                            params={144}
                            src={layoutImage('bg_pattern_001.png')}
                            layout={{ position: 'absolute', left: -1, width: 554, top: 2, height: 110 }}
                        />
                        <ThemeImage
                            name="album_logo"
                            params={16}
                            src={layoutImage('habbicons_habbicons_logo.png')}
                            layout={{ position: 'absolute', left: 18, width: 66, top: 20, height: 70 }}
                        />
                        <Region
                            name="album_title"
                            params={16}
                            layout={{ position: 'absolute', left: 100, width: 95, top: 14, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('habbicons.hud.title')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            name="album_subtitle"
                            params={16}
                            layout={{ position: 'absolute', left: 100, width: 220, top: 39, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('habbicon_book.subtitle')}
                                textOptions={{ fill: '#d7efe5', wordWrap: true, wordWrapWidth: 220 }}
                            />
                        </Region>
                        <Border
                            variant="7"
                            name="owned_habbicons_stat"
                            params={16}
                            tintColor="#41aad3"
                            layout={{ position: 'absolute', left: 331, width: 102, top: 12, height: 42 }}
                        >
                            <Region
                                name="owned_habbicons_label"
                                params={144}
                                layout={{ position: 'absolute', left: 6, width: 90, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('habbicons.owned.description')}
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="owned_habbicons_value"
                                params={144}
                                layout={{ position: 'absolute', left: 6, width: 90, top: 20, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text="0"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                        </Border>
                        <Border
                            variant="7"
                            name="sets_completed_stat"
                            params={16}
                            tintColor="#41aad3"
                            layout={{ position: 'absolute', left: 443, width: 102, top: 12, height: 42 }}
                        >
                            <Region
                                name="sets_completed_label"
                                params={144}
                                layout={{ position: 'absolute', left: 6, width: 90, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('habbicon_book.sets_completed')}
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="sets_completed_value"
                                params={144}
                                layout={{ position: 'absolute', left: 6, width: 90, top: 20, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text="0"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                        </Border>
                        <Region
                            name="album_progress_container"
                            layout={{ position: 'absolute', left: 102, width: 452, top: 76, height: 24 }}
                        >
                            <Region
                                name="album_progress_bar"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 304, top: 3, height: 18 }}
                            >
                                <Shape
                                    name="background"
                                    params={2192}
                                    shape="round_rectangle"
                                    color="#17394d"
                                    strokeThickness={1}
                                    radius={6}
                                    layout={{ position: 'absolute', left: 0, width: 304, top: 0, height: 18 }}
                                />
                                <Region
                                    name="progress"
                                    params={2064}
                                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 18 }}
                                >
                                    <Shape
                                        name="fill"
                                        params={2192}
                                        shape="round_rectangle"
                                        color="#54a8e8"
                                        strokeThickness={1}
                                        radius={6}
                                        layout={{ position: 'absolute', left: 0, width: 323, top: 0, height: 18 }}
                                    />
                                    <Region
                                        name="highlight"
                                        tags={[ 'BLEND_ADD' ]}
                                        params={144}
                                        layout={{ position: 'absolute', left: 1, width: 321, top: 1, height: 6 }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="album_progress_text"
                                params={16}
                                layout={{ position: 'absolute', left: 312, width: 28, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="0 / 0"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="tabs_bg"
                    params={16}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 7, width: 540, top: 144, height: 1 }}
                />
                <TabContext
                    variant="3"
                    name="tab_context"
                    tintColor="#0fffff"
                    layout={{ position: 'absolute', left: 7, width: 540, top: 113, height: 33 }}
                >
                    <TabButton
                        variant="3"
                        name="tab_all_sets"
                        params={17}
                        onPointerTap={onTabAllSets}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 32 }}
                    >
                        {t('habbicon_book.tab.all_sets')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_owned"
                        params={17}
                        onPointerTap={onTabOwned}
                        layout={{ position: 'absolute', left: 64, width: 64, top: 0, height: 32 }}
                    >
                        {t('habbicon_book.tab.owned')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_favourited"
                        params={17}
                        onPointerTap={onTabFavourited}
                        layout={{ position: 'absolute', left: 128, width: 82, top: 0, height: 32 }}
                    >
                        {t('habbicon_book.tab.favourited')}
                    </TabButton>
                </TabContext>
                <Region
                    name="all_sets_container"
                    params={2064}
                    layout={{ position: 'absolute', left: 7, width: 540, top: 146, height: 380 }}
                >
                    <Border
                        variant="6"
                        name="set_rail_background"
                        params={2064}
                        layout={{ position: 'absolute', left: 0, width: 154, top: 0, height: 380 }}
                    />
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 4, width: 145, top: 4, height: 372 }}
                    >
                        <Region
                            name="set_rail_list"
                            params={2064}
                            layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
                        >
                            <Region
                                name="set_row_template"
                                params={129}
                                layout={{ width: 145, height: 50, flexShrink: 0 }}
                            >
                                <Border
                                    variant="10"
                                    name="set_row_background"
                                    params={2192}
                                    tintColor="#f8ebd6"
                                    layout={{ position: 'absolute', left: 1, width: 145, top: 1, height: 49 }}
                                />
                                <ThemeImage
                                    name="set_icon"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 7, width: 40, top: 4, height: 40 }}
                                />
                                <Region
                                    name="set_row_title"
                                    params={16}
                                    layout={{ position: 'absolute', left: 50, width: 115, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('habbicon_set_name')}
                                        textStyle="text-style-u-bold"
                                        textOptions={{ fill: '#2b2b2b' }}
                                    />
                                </Region>
                                <Region
                                    name="set_row_progress_bar"
                                    params={128}
                                    layout={{ position: 'absolute', left: 53, width: 69, top: 28, height: 12 }}
                                >
                                    <Shape
                                        name="background"
                                        params={144}
                                        shape="round_rectangle"
                                        color="#4d5d66"
                                        strokeThickness={1}
                                        radius={4}
                                        layout={{ position: 'absolute', left: 0, width: 69, top: 0, height: 12 }}
                                    />
                                    <Region
                                        name="progress"
                                        params={2064}
                                        layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 12 }}
                                    >
                                        <Shape
                                            name="fill"
                                            params={144}
                                            shape="round_rectangle"
                                            color="#54a8e8"
                                            strokeThickness={1}
                                            radius={4}
                                            layout={{ position: 'absolute', left: 0, width: 69, top: 0, height: 12 }}
                                        />
                                        <Region
                                            name="highlight"
                                            tags={[ 'BLEND_ADD' ]}
                                            params={144}
                                            layout={{ position: 'absolute', left: 1, width: 67, top: 1, height: 4 }}
                                        />
                                    </Region>
                                </Region>
                                <Region
                                    name="set_row_progress_text"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 104, width: 34, top: 27, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                                >
                                    <ThemeText
                                        text="0/0"
                                        textOptions={{ fill: '#2b2b2b', align: 'right' }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                    </ScrollArea>
                    <Region
                        name="set_page_container"
                        params={2192}
                        layout={{ position: 'absolute', left: 160, width: 380, top: 0, height: 380 }}
                    >
                        <Border
                            variant="10"
                            name="set_page_background"
                            params={2192}
                            tintColor="#f6ebd7"
                            layout={{ position: 'absolute', left: 0, width: 380, top: 98, height: 282 }}
                        />
                        <Region
                            name="header"
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 380, top: 2, height: 92 }}
                        >
                            <Border
                                variant="10"
                                name="bg1"
                                params={2192}
                                tintColor="#e0cba6"
                                layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 91 }}
                            />
                            <Region
                                name="set_title"
                                params={144}
                                layout={{ position: 'absolute', left: 12, width: 230, top: 8, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Habbicon set name"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#2b2b2b' }}
                                />
                            </Region>
                            <Region
                                name="set_description"
                                params={144}
                                layout={{ position: 'absolute', left: 13, width: 359, top: 31, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="sdfg fdgfd gfsdgdfs ggfdfg fdfgfsdg fsdgfsdgfsd gdfg sdfgfsd gfdsgfsdgfsdgdf dfg d gsfdsf"
                                    textOptions={{ fill: '#3b3b3b', wordWrap: true, wordWrapWidth: 359 }}
                                />
                            </Region>
                            <Region
                                name="set_progress_container"
                                params={144}
                                layout={{ position: 'absolute', left: 14, width: 230, top: 62, height: 22 }}
                            >
                                <Region
                                    name="set_progress_bar"
                                    layout={{ position: 'absolute', left: 0, width: 154, top: 3, height: 16 }}
                                >
                                    <Shape
                                        name="background"
                                        params={144}
                                        shape="round_rectangle"
                                        color="#4d5d66"
                                        strokeThickness={1}
                                        radius={6}
                                        layout={{ position: 'absolute', left: 0, width: 154, top: 0, height: 16 }}
                                    />
                                    <Region
                                        name="progress"
                                        params={2064}
                                        layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 16 }}
                                    >
                                        <Shape
                                            name="fill"
                                            params={144}
                                            shape="round_rectangle"
                                            color="#54a8e8"
                                            strokeThickness={1}
                                            radius={6}
                                            layout={{ position: 'absolute', left: 0, width: 154, top: 0, height: 16 }}
                                        />
                                        <Region
                                            name="highlight"
                                            tags={[ 'BLEND_ADD' ]}
                                            params={144}
                                            layout={{ position: 'absolute', left: 1, width: 152, top: 1, height: 5 }}
                                        />
                                    </Region>
                                </Region>
                                <Region
                                    name="set_progress_text"
                                    params={16}
                                    layout={{ position: 'absolute', left: 164, width: 28, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="0 / 0"
                                        textStyle="text-style-u-bold"
                                        textOptions={{ fill: '#2b2b2b' }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 252, width: 116, top: 106, height: 232, flexDirection: 'column', gap: 9 }}
                        >
                            <Border
                                variant="3"
                                name="reward_panel"
                                params={80}
                                tintColor="#e7d5b2"
                                layout={{ width: 116, height: 152, flexShrink: 0 }}
                            >
                                <Region
                                    params={8388752}
                                    layout={{ position: 'absolute', left: 0, width: 116, top: 9, height: 135, flexDirection: 'column', gap: 6 }}
                                >
                                    <Region
                                        name="reward_title"
                                        params={16}
                                        layout={{ width: 100, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('habbicon_reward.title')}
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#2b2b2b', align: 'center' }}
                                        />
                                    </Region>
                                    <Border
                                        variant="3"
                                        name="reward_habbicon_frame"
                                        params={16}
                                        tintColor="#f8ebd6"
                                        layout={{ width: 46, height: 46, flexShrink: 0 }}
                                    >
                                        <ThemeImage
                                            name="reward_habbicon"
                                            params={16}
                                            src={undefined}
                                            layout={{ position: 'absolute', left: 3, width: 40, top: 3, height: 40 }}
                                        />
                                    </Border>
                                    <Region
                                        name="reward_description"
                                        params={16}
                                        layout={{ width: 100, height: 26, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('habbicon_reward.description')}
                                            textOptions={{ fill: '#3b3b3b', wordWrap: true, wordWrapWidth: 100, align: 'center' }}
                                        />
                                    </Region>
                                    <Button
                                        variant="5"
                                        name="reward_action_button"
                                        params={393233}
                                        tintColor="#01a101"
                                        onPointerTap={onRewardActionButton}
                                        textStyle="text-style-button-shiny-regular"
                                        layout={{ width: 100, height: 28, flexShrink: 0, minWidth: 100, maxWidth: 100 }}
                                    >
                                        {t('habbicon_reward.claim')}
                                    </Button>
                                </Region>
                            </Border>
                            <Border
                                variant="3"
                                name="reward_buy_container"
                                params={80}
                                tintColor="#e7d5b2"
                                layout={{ width: 116, height: 71, flexShrink: 0 }}
                            >
                                <Region
                                    params={8388752}
                                    layout={{ position: 'absolute', left: 0, width: 116, top: 9, height: 53, flexDirection: 'column', gap: 8 }}
                                >
                                    <Region
                                        name="reward_buy_description"
                                        params={786448}
                                        layout={{ width: 100, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('habbicon_book.buy_set')}
                                            textOptions={{ fill: '#2b2b2b', wordWrap: true, wordWrapWidth: 100, align: 'center' }}
                                        />
                                    </Region>
                                    <Region
                                        params={262224}
                                        layout={{ width: 122, height: 28, flexShrink: 0, flexDirection: 'row', gap: 4 }}
                                    >
                                        <Region
                                            name="reward_buy_price"
                                            params={16}
                                            layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text="0"
                                                textStyle="text-style-u-bold"
                                            />
                                        </Region>
                                        <Icon
                                            variant="35"
                                            name="reward_buy_currency_icon"
                                            params={16}
                                            layout={{ width: 16, height: 16, flexShrink: 0 }}
                                        />
                                        <Button
                                            variant="5"
                                            name="reward_buy_button"
                                            params={131089}
                                            tintColor="#01a101"
                                            onPointerTap={onRewardBuyButton}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ width: 88, height: 28, flexShrink: 0 }}
                                        >
                                            {t('generic.buy')}
                                        </Button>
                                    </Region>
                                </Region>
                            </Border>
                        </Region>
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 8, width: 234, top: 106, height: 266 }}
                        >
                            <Region
                                name="set_grid"
                                params={2192}
                                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, width: '100%' }}
                            >
                                <Region
                                    name="tile_template"
                                    params={17}
                                    layout={{ width: 50, height: 50, flexShrink: 0 }}
                                >
                                    <Region
                                        name="tile_background"
                                        params={2192}
                                        backgroundColor="#f8ebd6"
                                        layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 48 }}
                                    />
                                    <Border
                                        variant="2"
                                        name="tile_border"
                                        tags={[ 'ITEM_HILIGHT' ]}
                                        params={2192}
                                        tintColor="#c8be8d"
                                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                    />
                                    <ThemeImage
                                        name="bitmap"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 5, width: 40, top: 5, height: 40, minWidth: 40, maxWidth: 40 }}
                                    />
                                    <Region
                                        name="locked_overlay"
                                        params={2192}
                                        visible={false}
                                        backgroundColor="#ffffff"
                                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                    />
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: 2, width: 14, top: 2, height: 14 }}
                                    >
                                        <ThemeImage
                                            name="favorite_icon"
                                            params={16}
                                            src={layoutImage('icon_habbicon_fav.png')}
                                            layout={{ position: 'absolute', left: 2, width: 14, top: 2, height: 14 }}
                                        />
                                    </Region>
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: 31, width: 18, top: 1, height: 18 }}
                                    >
                                        <ThemeImage
                                            name="claimable_icon"
                                            params={16}
                                            src={layoutImage('icon_notification_corner_mid.png')}
                                            layout={{ position: 'absolute', left: 31, width: 18, top: 1, height: 18 }}
                                        />
                                    </Region>
                                </Region>
                                <Region
                                    name="empty_tile_template"
                                    params={17}
                                    layout={{ width: 50, height: 50, flexShrink: 0 }}
                                >
                                    <Border
                                        variant="2"
                                        name="tile_border"
                                        tags={[ 'ITEM_HILIGHT' ]}
                                        params={2192}
                                        tintColor="#c8be8d"
                                        blend={0.2}
                                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                    />
                                </Region>
                            </Region>
                        </ScrollArea>
                    </Region>
                </Region>
                <Region
                    name="tray_container"
                    params={2064}
                    visible={false}
                    layout={{ position: 'absolute', left: 7, width: 540, top: 146, height: 380 }}
                >
                    <Border
                        variant="3"
                        name="tray_background"
                        params={2192}
                        tintColor="#f6ebd7"
                        layout={{ position: 'absolute', left: 0, width: 540, top: 0, height: 380 }}
                    />
                    <Region
                        name="tray_title"
                        params={16}
                        layout={{ position: 'absolute', left: 12, width: 60, top: 10, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('habbicon_book.tab.owned')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#2b2b2b' }}
                        />
                    </Region>
                    <Region
                        name="tray_summary"
                        params={16}
                        layout={{ position: 'absolute', left: 12, width: 510, top: 34, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('habbicon_book.tray.summary')}
                            textOptions={{ fill: '#3b3b3b', wordWrap: true, wordWrapWidth: 510 }}
                        />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 10, width: 526, top: 59, height: 310 }}
                    >
                        <Region
                            name="tray_group_list"
                            params={2064}
                            layout={{ flexDirection: 'column', gap: 6, width: '100%' }}
                        >
                            <Border
                                variant="10"
                                name="tray_group_template"
                                params={16}
                                tintColor="#efe1c4"
                                layout={{ width: 506, height: 89, flexShrink: 0 }}
                            >
                                <Region
                                    name="tray_group_title"
                                    params={16}
                                    layout={{ position: 'absolute', left: 10, width: 115, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('habbicon_set_name')}
                                        textStyle="text-style-u-bold"
                                        textOptions={{ fill: '#2b2b2b' }}
                                    />
                                </Region>
                                <Region
                                    name="tray_group_grid"
                                    params={8388752}
                                    layout={{ position: 'absolute', left: 10, width: 486, top: 30, height: 50, flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}
                                >
                                    <Region
                                        name="tray_tile_template"
                                        params={17}
                                        layout={{ width: 50, height: 50, flexShrink: 0 }}
                                    >
                                        <Region
                                            name="tile_background"
                                            params={2192}
                                            backgroundColor="#f8ebd6"
                                            layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 48 }}
                                        />
                                        <Border
                                            variant="2"
                                            name="tile_border"
                                            tags={[ 'ITEM_HILIGHT' ]}
                                            params={2192}
                                            tintColor="#c8be8d"
                                            layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                        />
                                        <ThemeImage
                                            name="bitmap"
                                            tags={[ 'BITMAP' ]}
                                            params={16}
                                            src={undefined}
                                            layout={{ position: 'absolute', left: 5, width: 40, top: 5, height: 40, minWidth: 40, maxWidth: 40 }}
                                        />
                                        <Region
                                            name="locked_overlay"
                                            params={2192}
                                            visible={false}
                                            backgroundColor="#ffffff"
                                            layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                        />
                                        <Region
                                            visible={false}
                                            layout={{ position: 'absolute', left: 2, width: 14, top: 2, height: 14 }}
                                        >
                                            <ThemeImage
                                                name="favorite_icon"
                                                params={16}
                                                src={layoutImage('icon_habbicon_fav.png')}
                                                layout={{ position: 'absolute', left: 2, width: 14, top: 2, height: 14 }}
                                            />
                                        </Region>
                                        <Region
                                            visible={false}
                                            layout={{ position: 'absolute', left: 31, width: 18, top: 1, height: 18 }}
                                        >
                                            <ThemeImage
                                                name="claimable_icon"
                                                params={16}
                                                src={layoutImage('icon_notification_corner_mid.png')}
                                                layout={{ position: 'absolute', left: 31, width: 18, top: 1, height: 18 }}
                                            />
                                        </Region>
                                    </Region>
                                </Region>
                            </Border>
                        </Region>
                    </ScrollArea>
                </Region>
                <Region
                    name="habbicon_popup_layer"
                    params={2176}
                    layout={{ position: 'absolute', left: 0, width: 560, top: 102, height: 428 }}
                >
                    <Region
                        name="habbicon_item_popup"
                        params={16}
                        layout={{ position: 'absolute', left: 190, width: 180, top: 210, height: 136, flexDirection: 'column' }}
                    >
                        <Border
                            variant="4"
                            name="habbicon_popup_background"
                            params={16}
                            tintColor="#efefef"
                            layout={{ width: 180, height: 121, flexShrink: 0 }}
                        >
                            <Region
                                name="habbicon_popup_content_list"
                                params={8388752}
                                layout={{ position: 'absolute', left: 0, width: 180, top: 6, height: 108, flexDirection: 'column', gap: 5 }}
                            >
                                <Region
                                    name="habbicon_popup_title"
                                    params={16}
                                    layout={{ width: 164, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text="Habbicon name"
                                        textStyle="text-style-u-bold"
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                                <Region
                                    name="habbicon_popup_description"
                                    params={16}
                                    layout={{ width: 156, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('habbicon.popup.desc.not_owned')}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 156 }}
                                    />
                                </Region>
                                <Region
                                    name="habbicon_popup_action_row"
                                    params={16}
                                    layout={{ width: 180, height: 28, flexShrink: 0 }}
                                >
                                    <Button
                                        variant="5"
                                        name="habbicon_popup_action_button"
                                        params={131089}
                                        tintColor="#01a101"
                                        onPointerTap={onHabbiconPopupActionButton}
                                        textStyle="text-style-button-shiny-regular"
                                        layout={{ position: 'absolute', left: 12, width: 156, top: 0, height: 28, minWidth: 156, maxWidth: 156 }}
                                    >
                                        {t('generic.claim')}
                                    </Button>
                                </Region>
                                <Border
                                    variant="3"
                                    name="habbicon_popup_bottom_bar"
                                    params={16}
                                    tintColor="#efefef"
                                    blend={0}
                                    layout={{ width: 180, height: 28, flexShrink: 0 }}
                                >
                                    <Region
                                        params={262160}
                                        layout={{ position: 'absolute', left: 77, width: 91, top: 0, height: 28, flexDirection: 'row', gap: 4 }}
                                    >
                                        <Region
                                            name="habbicon_popup_price"
                                            params={16}
                                            layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text="0"
                                                textStyle="text-style-u-bold"
                                            />
                                        </Region>
                                        <Icon
                                            variant="35"
                                            name="habbicon_popup_currency_icon"
                                            params={16}
                                            layout={{ width: 16, height: 16, flexShrink: 0 }}
                                        />
                                        <Button
                                            variant="5"
                                            name="habbicon_popup_buy_button"
                                            params={131089}
                                            tintColor="#01a101"
                                            onPointerTap={onHabbiconPopupBuyButton}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ width: 57, height: 28, flexShrink: 0, minWidth: 57, maxWidth: 57 }}
                                        >
                                            {t('generic.buy')}
                                        </Button>
                                    </Region>
                                </Border>
                            </Region>
                            <Region
                                name="pointer_crossover"
                                params={1024}
                                backgroundColor="#efefef"
                                layout={{ position: 'absolute', left: 84, width: 13, top: 119, height: 2 }}
                            />
                        </Border>
                        <Region
                            name="habbicon_popup_pointer"
                            params={16}
                            layout={{ width: 15, height: 15, flexShrink: 0 }}
                        >
                            <Shape
                                params={16}
                                shape="rhombus"
                                color="#efefef"
                                strokeThickness={1}
                                layout={{ position: 'absolute', left: 0, width: 15, top: -8, height: 15 }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};

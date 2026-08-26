import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `23_talent_track_xml` (layout "talent_track", 1000x490) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TalentTrackLayoutProps {
    layout?: BoxLayout;
    onButtonTrackCitizenship?: () => void;
    onButtonTrackHelper?: () => void;
    onCitizenshipButton?: () => void;
    onFrame?: () => void;
}

export const TalentTrackLayout = ({ layout, onButtonTrackCitizenship, onButtonTrackHelper, onCitizenshipButton, onFrame }: TalentTrackLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 1000, height: 490, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 1000, top: 0, height: 490, minWidth: 100, minHeight: 50 }}>
                <Frame
                    variant="101"
                    id="frame"
                    name="frame"
                    params={1}
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 1000, top: 22, height: 445, minWidth: 100 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                        <ScrollArea
                            orientation="horizontal"
                            layout={{ position: 'absolute', left: 0, width: 998, top: 20, height: 280, minHeight: 280, maxHeight: 280 }}
                        >
                            <Region
                                name="panorama"
                                params={17}
                                layout={{ flexDirection: 'row', width: '100%' }}
                            >
                                <Region
                                    name="begin_helper"
                                    params={16}
                                    layout={{ width: 250, height: 280, flexShrink: 0 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 20, width: 311, top: 20, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('talent.track.helper.guide.begin.title')}
                                            textStyle="text-style-il-heading-title"
                                        />
                                    </Region>
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 20, width: 230, top: 49, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('talent.track.helper.guide.begin.description')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 230 }}
                                        />
                                    </Region>
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('talent_citizenship_accomplished.png')}
                                        layout={{ position: 'absolute', left: 203, width: 32, top: 182, height: 46 }}
                                    />
                                    <Region
                                        params={3145744}
                                        layout={{ position: 'absolute', left: 124, width: 76, top: 166, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
                                    >
                                        <ThemeText
                                            text={t('talent.track.helper.begin.citizenship')}
                                            textStyle="text-style-il-button"
                                            textOptions={{ fill: '#333333', wordWrap: true, wordWrapWidth: 76, align: 'right' }}
                                        />
                                    </Region>
                                    <Button
                                        variant="100"
                                        name="citizenship_button"
                                        params={393233}
                                        onPointerTap={onCitizenshipButton}
                                        layout={{ position: 'absolute', left: 54, width: 200, top: 227, height: 43 }}
                                    >
                                        {t('talent.track.citizenship.button')}
                                    </Button>
                                </Region>
                                <Region
                                    name="begin_helper_no_citizenship"
                                    params={16}
                                    layout={{ width: 250, height: 280, flexShrink: 0 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 20, width: 259, top: 20, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('talent.track.helper.begin.title')}
                                            textStyle="text-style-il-heading-title"
                                        />
                                    </Region>
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 20, width: 230, top: 49, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('talent.track.helper.begin.description')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 230 }}
                                        />
                                    </Region>
                                    <WidgetSlot
                                        widgetType="avatar_image"
                                        name="avatar_image"
                                        params={16}
                                        layout={{ position: 'absolute', left: 169, width: 90, top: 144, height: 130 }}
                                    />
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('talent_check_mark_circle.png')}
                                        layout={{ position: 'absolute', left: 216, width: 17, top: 172, height: 18 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 113, width: 76, top: 201, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
                                    >
                                        <ThemeText
                                            text={t('talent.track.helper.begin.register')}
                                            textStyle="text-style-il-button"
                                            textOptions={{ wordWrap: true, wordWrapWidth: 76, align: 'right' }}
                                        />
                                    </Region>
                                </Region>
                                <Region
                                    name="begin_citizenship"
                                    params={16}
                                    layout={{ width: 250, height: 280, flexShrink: 0 }}
                                >
                                    <Region
                                        params={131088}
                                        layout={{ position: 'absolute', left: 20, width: 228, top: 20, height: 66, flexDirection: 'column', gap: 6 }}
                                    >
                                        <Region
                                            params={16}
                                            layout={{ width: 228, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text={t('talent.track.citizenship.begin.title')}
                                                textStyle="text-style-il-heading-title"
                                                textOptions={{ wordWrap: true, wordWrapWidth: 228 }}
                                            />
                                        </Region>
                                        <Region
                                            params={16}
                                            layout={{ width: 230, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text={t('talent.track.citizenship.begin.description')}
                                                textOptions={{ wordWrap: true, wordWrapWidth: 230 }}
                                            />
                                        </Region>
                                    </Region>
                                    <WidgetSlot
                                        widgetType="avatar_image"
                                        name="avatar_image"
                                        params={16}
                                        layout={{ position: 'absolute', left: 169, width: 90, top: 144, height: 130 }}
                                    />
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('talent_check_mark_circle.png')}
                                        layout={{ position: 'absolute', left: 216, width: 17, top: 172, height: 18 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 113, width: 76, top: 201, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
                                    >
                                        <ThemeText
                                            text={t('talent.track.citizenship.begin.register')}
                                            textStyle="text-style-il-button"
                                            textOptions={{ wordWrap: true, wordWrapWidth: 76, align: 'right' }}
                                        />
                                    </Region>
                                </Region>
                                <Region
                                    name="level_pane"
                                    params={16}
                                    layout={{ width: 1000, height: 280, flexShrink: 0, minWidth: 320 }}
                                >
                                    <WidgetSlot
                                        widgetType="separator"
                                        name="level_separator"
                                        params={16}
                                        options={{ 'separator:vertical': 'true' }}
                                        layout={{ position: 'absolute', left: 0, width: 50, top: 30, height: 250 }}
                                    />
                                    <ThemeImage
                                        name="level_illustration"
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 700, width: 170, top: 0, height: 120 }}
                                    />
                                    <Region
                                        name="level_title"
                                        params={16}
                                        layout={{ position: 'absolute', left: 50, width: 71, top: 30, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text="Level title"
                                            textStyle="text-style-il-heading-1"
                                        />
                                    </Region>
                                    <Region
                                        name="level_description"
                                        params={16}
                                        layout={{ position: 'absolute', left: 50, width: 320, top: 55, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text="Level description"
                                            textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
                                        />
                                    </Region>
                                    <Region
                                        name="status_list"
                                        params={16}
                                        layout={{ position: 'absolute', left: 10, width: 1000, top: 100, height: 180, flexDirection: 'row', gap: 10 }}
                                    >
                                        <Region
                                            name="level_reward"
                                            params={16}
                                            layout={{ width: 350, height: 180, flexShrink: 0 }}
                                        >
                                            <Border
                                                variant="104"
                                                name="border"
                                                params={16}
                                                tintColor="#bdbdbd"
                                                layout={{ position: 'absolute', left: 0, width: 350, top: 20, height: 155 }}
                                            >
                                                <Region
                                                    name="unlocked"
                                                    params={16}
                                                    layout={{ position: 'absolute', left: 10, width: 127, top: 8, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                >
                                                    <ThemeText
                                                        text={t('talent.track.common.unlocked')}
                                                        textStyle="text-style-il-small"
                                                        textOptions={{ fill: '#ffffff' }}
                                                    />
                                                </Region>
                                                <Region
                                                    name="title_achieved"
                                                    params={16}
                                                    layout={{ position: 'absolute', left: 10, width: 4, top: 22, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                />
                                                <Region
                                                    name="title_locked"
                                                    params={16}
                                                    layout={{ position: 'absolute', left: 10, width: 4, top: 22, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                />
                                                <Region
                                                    name="description_achieved"
                                                    params={16}
                                                    layout={{ position: 'absolute', left: 10, width: 330, top: 38, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                >
                                                    <ThemeText
                                                        text="Reward description achieved"
                                                        textStyle="text-style-il-regular-white"
                                                        textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                                                    />
                                                </Region>
                                                <Region
                                                    name="description_locked"
                                                    params={16}
                                                    visible={false}
                                                    layout={{ position: 'absolute', left: 10, width: 330, top: 38, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                >
                                                    <ThemeText
                                                        text="Reward description locked"
                                                        textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                                                    />
                                                </Region>
                                                <Region
                                                    name="reward_list"
                                                    params={147472}
                                                    layout={{ position: 'absolute', left: 10, width: 560, top: 80, height: 60, flexDirection: 'row', gap: 10 }}
                                                >
                                                    <Border
                                                        variant="104"
                                                        name="reward_product"
                                                        params={16}
                                                        blend={0.3}
                                                        layout={{ width: 61, height: 60, flexShrink: 0 }}
                                                    >
                                                        <Border
                                                            variant="105"
                                                            params={16}
                                                            tintColor="#cccccc"
                                                            layout={{ position: 'absolute', left: 14, width: 33, top: 14, height: 33 }}
                                                        >
                                                            <ThemeImage
                                                                name="product_icon"
                                                                params={48}
                                                                src={undefined}
                                                                layout={{ position: 'absolute', left: 1, width: 31, top: 1, height: 30 }}
                                                            />
                                                        </Border>
                                                    </Border>
                                                    <Border
                                                        variant="104"
                                                        name="reward_vip"
                                                        params={147472}
                                                        blend={0.3}
                                                        layout={{ width: 69, height: 60, flexShrink: 0, minHeight: 60, maxHeight: 60 }}
                                                    >
                                                        <ThemeImage
                                                            params={3120}
                                                            src={layoutImage('talent_vip_reward.png')}
                                                            layout={{ position: 'absolute', left: 14, width: 33, top: 14, height: 33 }}
                                                        />
                                                        <Region
                                                            name="vip_length"
                                                            params={3088}
                                                            layout={{ position: 'absolute', left: 53, width: 16, top: 28, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                        />
                                                    </Border>
                                                    <Border
                                                        variant="104"
                                                        name="reward_achieved"
                                                        params={16}
                                                        blend={0.3}
                                                        layout={{ width: 200, height: 60, flexShrink: 0 }}
                                                    >
                                                        <WidgetSlot
                                                            widgetType="badge_image"
                                                            name="achieved"
                                                            params={48}
                                                            options={{ 'badge_image:type': 'perk', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                                            layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 60 }}
                                                        />
                                                        <Region
                                                            name="title"
                                                            params={16}
                                                            layout={{ position: 'absolute', left: 60, width: 68, top: 10, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="Reward name"
                                                                textStyle="text-style-il-heading-3"
                                                                textOptions={{ fill: '#ffffff' }}
                                                            />
                                                        </Region>
                                                        <Region
                                                            name="description"
                                                            params={16}
                                                            layout={{ position: 'absolute', left: 60, width: 135, top: 25, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="Reward description"
                                                                textStyle="text-style-il-regular-white"
                                                                textOptions={{ wordWrap: true, wordWrapWidth: 135 }}
                                                            />
                                                        </Region>
                                                    </Border>
                                                    <Border
                                                        variant="104"
                                                        name="reward_locked"
                                                        params={16}
                                                        tintColor="#979797"
                                                        blend={0.6}
                                                        layout={{ width: 200, height: 60, flexShrink: 0 }}
                                                    >
                                                        <ThemeImage
                                                            name="locked"
                                                            params={16}
                                                            src={layoutImage('talent_locked_achievement.png')}
                                                            layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 60 }}
                                                        />
                                                        <Region
                                                            name="title"
                                                            params={16}
                                                            layout={{ position: 'absolute', left: 60, width: 68, top: 10, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="Reward name"
                                                                textStyle="text-style-il-heading-3"
                                                                textOptions={{ fill: '#ffffff' }}
                                                            />
                                                        </Region>
                                                        <Region
                                                            name="description"
                                                            params={16}
                                                            layout={{ position: 'absolute', left: 60, width: 135, top: 25, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="Reward description"
                                                                textStyle="text-style-il-regular-white"
                                                                textOptions={{ wordWrap: true, wordWrapWidth: 135 }}
                                                            />
                                                        </Region>
                                                    </Border>
                                                </Region>
                                            </Border>
                                            <ThemeImage
                                                name="locked"
                                                params={16}
                                                src={layoutImage('talent_locked_stripe.png')}
                                                layout={{ position: 'absolute', left: 1, width: 70, top: 21, height: 25 }}
                                            />
                                            <ThemeImage
                                                name="achieved"
                                                params={80}
                                                src={layoutImage('talent_check_mark_circle.png')}
                                                layout={{ position: 'absolute', left: 320, width: 20, top: 11, height: 20 }}
                                            />
                                        </Region>
                                        <Region
                                            name="level_task"
                                            params={16}
                                            layout={{ width: 600, height: 180, flexShrink: 0 }}
                                        >
                                            <Region
                                                name="task_list_top"
                                                params={147472}
                                                layout={{ position: 'absolute', left: 0, width: 650, top: 0, height: 80, flexDirection: 'row', gap: 10 }}
                                            >
                                                <Region
                                                    name="task_achieved"
                                                    params={16}
                                                    layout={{ width: 210, height: 80, flexShrink: 0 }}
                                                >
                                                    <Border
                                                        variant="102"
                                                        name="border"
                                                        params={16}
                                                        layout={{ position: 'absolute', left: 0, width: 210, top: 20, height: 60 }}
                                                    >
                                                        <WidgetSlot
                                                            widgetType="badge_image"
                                                            name="badge"
                                                            params={16}
                                                            options={{ 'badge_image:badge_id': 'ACH_RegistrationDuration3', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                                            layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 60 }}
                                                        />
                                                        <Region
                                                            name="title"
                                                            params={16}
                                                            layout={{ position: 'absolute', left: 60, width: 145, top: 10, height: 15, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="TASK NAME"
                                                                textStyle="text-style-il-heading-3"
                                                                textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                                                            />
                                                        </Region>
                                                        <Region
                                                            name="description"
                                                            params={16}
                                                            layout={{ position: 'absolute', left: 60, width: 145, top: 25, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="Task description!"
                                                                textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                                                            />
                                                        </Region>
                                                    </Border>
                                                    <ThemeImage
                                                        name="achieved"
                                                        params={16}
                                                        src={layoutImage('talent_check_mark_circle.png')}
                                                        layout={{ position: 'absolute', left: 182, width: 20, top: 11, height: 20 }}
                                                    />
                                                </Region>
                                                <Region
                                                    name="task_ongoing"
                                                    params={16}
                                                    layout={{ width: 210, height: 80, flexShrink: 0 }}
                                                >
                                                    <Border
                                                        variant="101"
                                                        name="border"
                                                        params={16}
                                                        layout={{ position: 'absolute', left: 0, width: 210, top: 20, height: 60 }}
                                                    >
                                                        <WidgetSlot
                                                            widgetType="badge_image"
                                                            name="badge"
                                                            params={16}
                                                            options={{ 'badge_image:badge_id': 'ACH_RegistrationDuration3', 'badge_image:pivot_point': 'top center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:greyscale': 'true' }}
                                                            layout={{ position: 'absolute', left: 0, width: 60, top: 5, height: 45 }}
                                                        />
                                                        <Region
                                                            name="title"
                                                            params={16}
                                                            layout={{ position: 'absolute', left: 60, width: 145, top: 10, height: 15, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="TASK NAME"
                                                                textStyle="text-style-il-heading-3"
                                                                textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                                                            />
                                                        </Region>
                                                        <Region
                                                            name="description"
                                                            params={16}
                                                            layout={{ position: 'absolute', left: 60, width: 145, top: 25, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="Task description!"
                                                                textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                                                            />
                                                        </Region>
                                                        <Region
                                                            name="task_progress"
                                                            params={16}
                                                            layout={{ position: 'absolute', left: 5, width: 50, top: 48, height: 6 }}
                                                        >
                                                            <ThemeImage
                                                                name="task_progress_left"
                                                                params={16}
                                                                src={layoutImage('talent_task_progress_left.png')}
                                                                layout={{ position: 'absolute', left: 0, width: 2, top: 0, height: 6 }}
                                                            />
                                                            <ThemeImage
                                                                name="task_progress_right"
                                                                params={16}
                                                                src={layoutImage('talent_task_progress_right.png')}
                                                                layout={{ position: 'absolute', left: 48, width: 2, top: 0, height: 6 }}
                                                            />
                                                            <ThemeImage
                                                                name="task_progress_bg"
                                                                params={16}
                                                                src={layoutImage('talent_task_progress_bg.png')}
                                                                layout={{ position: 'absolute', left: 2, width: 46, top: 0, height: 6 }}
                                                            />
                                                            <ThemeImage
                                                                name="task_progress_fg"
                                                                params={16}
                                                                src={layoutImage('talent_task_progress_fg.png')}
                                                                layout={{ position: 'absolute', left: 1, width: 48, top: 0, height: 6 }}
                                                            />
                                                        </Region>
                                                    </Border>
                                                    <Region
                                                        name="task_ongoing_region"
                                                        tooltip={t('talent.track.common.view.progress.tooltip')}
                                                        params={17}
                                                        layout={{ position: 'absolute', left: 0, width: 210, top: 0, height: 80 }}
                                                    />
                                                </Region>
                                                <Region
                                                    name="task_locked"
                                                    params={16}
                                                    layout={{ width: 210, height: 80, flexShrink: 0 }}
                                                >
                                                    <Border
                                                        variant="104"
                                                        name="border"
                                                        params={16}
                                                        tintColor="#bdbdbd"
                                                        layout={{ position: 'absolute', left: 0, width: 210, top: 20, height: 60 }}
                                                    >
                                                        <ThemeImage
                                                            name="locked"
                                                            params={16}
                                                            src={layoutImage('talent_locked_achievement.png')}
                                                            layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 60 }}
                                                        />
                                                        <Region
                                                            name="title"
                                                            params={16}
                                                            layout={{ position: 'absolute', left: 60, width: 145, top: 10, height: 15, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="TASK NAME"
                                                                textStyle="text-style-il-heading-3"
                                                                textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                                                            />
                                                        </Region>
                                                        <Region
                                                            name="description"
                                                            params={16}
                                                            layout={{ position: 'absolute', left: 60, width: 145, top: 25, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="Task description!"
                                                                textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                                                            />
                                                        </Region>
                                                    </Border>
                                                </Region>
                                            </Region>
                                            <Region
                                                name="task_list_bottom"
                                                params={147472}
                                                layout={{ position: 'absolute', left: 0, width: 170, top: 80, height: 80, flexDirection: 'row', gap: 10 }}
                                            />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="action_overlay"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: -2, width: 214, top: -1, height: 84 }}
                                    >
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('talent_action_overlay.png')}
                                            layout={{ position: 'absolute', left: 0, width: 214, top: 0, height: 84 }}
                                        />
                                        <Region
                                            params={208}
                                            layout={{ position: 'absolute', left: 41, width: 133, top: 4, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text={t('talent.track.action.overlay')}
                                                textStyle="text-style-il-regular-white"
                                            />
                                        </Region>
                                    </Region>
                                </Region>
                                <Region
                                    name="end_padding"
                                    params={16}
                                    layout={{ width: 100, height: 280, flexShrink: 0 }}
                                />
                            </Region>
                        </ScrollArea>
                        <ThemeImage
                            name="mask_left"
                            params={16}
                            src={layoutImage('talent_mask_left.png')}
                            layout={{ position: 'absolute', left: 0, width: 24, top: 20, height: 280 }}
                        />
                        <ThemeImage
                            name="mask_right"
                            params={80}
                            src={layoutImage('talent_mask_right.png')}
                            layout={{ position: 'absolute', left: 976, width: 24, top: 20, height: 280 }}
                        />
                        <Region
                            name="progress_container"
                            params={17}
                            layout={{ position: 'absolute', left: 0, width: 998, top: 309, height: 80 }}
                        >
                            <Region
                                name="progress_text"
                                params={16}
                                layout={{ position: 'absolute', left: 24, width: 196, top: 18, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('talent.track.common.progress.title')}
                                    textStyle="text-style-il-heading-2"
                                />
                            </Region>
                            <ThemeImage
                                name="unachieved_mid"
                                params={16}
                                src={layoutImage('talent_unachieved_mid.png')}
                                layout={{ position: 'absolute', left: 0, width: 1000, top: 40, height: 16 }}
                            />
                            <ThemeImage
                                name="achieved_mid"
                                params={16}
                                src={layoutImage('talent_achieved_mid.png')}
                                layout={{ position: 'absolute', left: 0, width: 500, top: 40, height: 16 }}
                            />
                            <ThemeImage
                                name="progress_level_divider"
                                params={16}
                                src={layoutImage('talent_achieved_div.png')}
                                layout={{ position: 'absolute', left: 100, width: 2, top: 40, height: 11 }}
                            />
                            <ThemeImage
                                name="avatar_glow"
                                params={16}
                                src={layoutImage('talent_avatar_glow.png')}
                                layout={{ position: 'absolute', left: 25, width: 55, top: 15, height: 55 }}
                            />
                            <WidgetSlot
                                widgetType="avatar_image"
                                name="progress_needle"
                                params={1048592}
                                options={{ 'avatar_image:figure': 'hr-1863-45.hd-180-2.ch-210-66.lg-270-82.sh-300-91.wa-2007-.ri-1-', 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                                layout={{ position: 'absolute', left: 36, width: 33, top: 27, height: 34 }}
                            />
                            <WidgetSlot
                                widgetType="balloon"
                                name="progress_balloon"
                                params={147456}
                                layout={{ position: 'absolute', left: 42, width: 215, top: 64, height: 30 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 215, top: 0, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('talent.track.common.progress.position')}
                                        textStyle="text-style-il-regular-white"
                                    />
                                </Region>
                            </WidgetSlot>
                        </Region>
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 10, width: 36, top: 10, height: 32 }}
                        >
                            <Button
                                variant="102"
                                name="button_track_citizenship"
                                params={131089}
                                onPointerTap={onButtonTrackCitizenship}
                                layout={{ width: '100%', height: '100%' }}
                            >
                                C
                            </Button>
                        </Region>
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 51, width: 36, top: 10, height: 32 }}
                        >
                            <Button
                                variant="102"
                                name="button_track_helper"
                                params={131089}
                                onPointerTap={onButtonTrackHelper}
                                layout={{ width: '100%', height: '100%' }}
                            >
                                H
                            </Button>
                        </Region>
                    </Region>
                </Frame>
                <Region layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 53, minWidth: 100 }}>
                    <Region
                        name="frame_subtitle"
                        params={16}
                        layout={{ position: 'absolute', left: 18, width: 179, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('talent.track.helper.frame.subtitle')}
                            textStyle="text-style-il-frame-modal-title"
                            textOptions={{ fill: '#cccccc' }}
                        />
                    </Region>
                    <Region
                        name="frame_title"
                        params={16}
                        layout={{ position: 'absolute', left: 18, width: 352, top: 16, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('talent.track.helper.frame.title')}
                            textStyle="text-style-il-frame-modal-title"
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

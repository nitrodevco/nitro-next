import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `2920_bully_report_xml` (layout "bully_report", 289x491) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BullyReportLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onSubmitButton?: () => void;
    userPanel?: BullyReportLayoutUserPanelProps;
}

export const BullyReportLayout = ({ layout, onClose, onSubmitButton, userPanel }: BullyReportLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="emergency_help_request"
            name="emergency_help_request"
            caption={t('help.bully.title')}
            onClose={onClose}
            layout={{ width: 289, height: 491, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <BullyReportLayoutUserPanel {...userPanel} />
                <Button
                    variant="101"
                    name="submit_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onSubmitButton}
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 135, top: 409, height: 43 }}
                >
                    {t('help.bully.submit')}
                </Button>
            </Region>
        </Frame>
    );
};

/** Row template `user_list` of BullyReportLayout - pass real rows through its `items…` slot. */
export interface BullyReportLayoutUserListItemProps {
    captionRoomName?: string;
    captionUserName?: string;
    layout?: BoxLayout;
}

export const BullyReportLayoutUserListItem = ({ captionRoomName, captionUserName, layout }: BullyReportLayoutUserListItemProps) => {
    const t = useTranslation();

    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 270, height: 337, flexShrink: 0, ...layout }}
        >
            <Region
                name="user_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                <Border
                    variant="102"
                    layout={{ width: 257, height: 43, flexShrink: 0 }}
                >
                    <Region
                        name="user_name"
                        layout={{ position: 'absolute', left: 37, width: 42, top: 8, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionUserName ?? 'user123'}
                            textStyle="text-style-il-border"
                        />
                    </Region>
                    <Region
                        name="room_name"
                        layout={{ position: 'absolute', left: 37, width: 218, top: 21, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRoomName ?? t('help.emergency.main.step.two.room.name')}
                            textOptions={{ fill: '#444444' }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="user_avatar"
                        options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                        layout={{ position: 'absolute', left: 3, width: 33, top: 4, height: 34 }}
                    />
                </Border>
            </Region>
        </ScrollArea>
    );
};

/** Named region `user_panel` of BullyReportLayout - configured through the parent's `userPanel` prop. */
export interface BullyReportLayoutUserPanelProps {
    itemsUserPanel?: ReactNode;
    layout?: BoxLayout;
}

export const BullyReportLayoutUserPanel = ({ itemsUserPanel, layout }: BullyReportLayoutUserPanelProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_panel"
            layout={{ position: 'absolute', left: 9, minWidth: 282, top: 8, minHeight: 388, flexDirection: 'column', gap: 8, ...layout }}
        >
            {itemsUserPanel ?? (
                <BullyReportLayoutUserListItem />
            )}
            <Region layout={{ width: 122, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.bully.subtitle')}
                    textStyle="text-style-il-heading-1"
                    textOptions={{ fill: '#555555' }}
                />
            </Region>
            <Region layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.bully.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                />
            </Region>
        </Region>
    );
};

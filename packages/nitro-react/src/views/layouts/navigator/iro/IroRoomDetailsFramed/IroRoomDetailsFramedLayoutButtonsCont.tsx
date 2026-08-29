import { useTranslation } from '#base/context';
import { BoxLayout, Button, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `buttons_cont` of IroRoomDetailsFramedLayout - configured through the parent's `buttonsCont` prop. */
export interface IroRoomDetailsFramedLayoutButtonsContProps {
    layout?: BoxLayout;
    onFloorPlanEditorButton?: () => void;
    onRoomFilterButton?: () => void;
    onRoomMuteallButton?: () => void;
    onRoomReportButton?: () => void;
    onRoomSettingsButton?: () => void;
    onStaffPickButton?: () => void;
}

export const IroRoomDetailsFramedLayoutButtonsCont = ({ layout, onFloorPlanEditorButton, onRoomFilterButton, onRoomMuteallButton, onRoomReportButton, onRoomSettingsButton, onStaffPickButton }: IroRoomDetailsFramedLayoutButtonsContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttons_cont"
            layout={{ position: 'absolute', left: 5, width: 220, top: 261, height: 29, ...layout }}
        >
            <Button
                variant="3"
                name="room_settings_button"
                onPointerTap={onRoomSettingsButton}
                layout={{ position: 'absolute', left: 0, width: 220, top: 0, height: 29, minWidth: 220, maxWidth: 220 }}
            >
                {t('navigator.roomsettings')}
            </Button>
            <Button
                variant="3"
                name="room_filter_button"
                onPointerTap={onRoomFilterButton}
                layout={{ position: 'absolute', left: 0, width: 220, top: 0, height: 29, minWidth: 220, maxWidth: 220 }}
            >
                {t('navigator.roomsettings.roomfilter')}
            </Button>
            <Button
                variant="3"
                name="staff_pick_button"
                onPointerTap={onStaffPickButton}
                layout={{ position: 'absolute', left: 0, width: 220, top: 0, height: 29, minWidth: 220, maxWidth: 220 }}
            >
                filledByTheServer
            </Button>
            <Button
                variant="3"
                name="floor_plan_editor_button"
                onPointerTap={onFloorPlanEditorButton}
                layout={{ position: 'absolute', left: 0, width: 220, top: 0, height: 29, minWidth: 220, maxWidth: 220 }}
            >
                {t('open.floor.plan.editor')}
            </Button>
            <ContainerButton
                variant="100"
                name="room_report_button"
                onPointerTap={onRoomReportButton}
                layout={{ position: 'absolute', left: 0, width: 218, top: 0, height: 55 }}
            >
                <ThemeImage
                    src={layoutImage('icons_panic.png')}
                    layout={{ position: 'absolute', left: 11, width: 39, top: 16, height: 25 }}
                />
                <ThemeImage
                    src={layoutImage('illumina_light_border_center_left.png')}
                    layout={{ position: 'absolute', left: 47, width: 7, top: 17, height: 20 }}
                />
                <Region layout={{ position: 'absolute', left: 56, width: 151, top: 18, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('create.room.report')}
                        textStyle="text-style-il-heading-1"
                    />
                </Region>
            </ContainerButton>
            <Button
                variant="3"
                name="room_muteall_button"
                onPointerTap={onRoomMuteallButton}
                layout={{ position: 'absolute', left: 0, width: 220, top: 48, height: 29, minWidth: 220, maxWidth: 220 }}
            >
                {t('navigator.muteall')}
            </Button>
        </Region>
    );
};

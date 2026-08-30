import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Dropmenu, Icon, Region, ThemeText } from '#base/theme';

/** Named region `custom_content` of GrsMainWindowLayout - configured through the parent's `customContent` prop. */
export interface GrsMainWindowLayoutCustomContentProps {
    layout?: BoxLayout;
    onCustomContent?: () => void;
    onMeHeader?: () => void;
    onMeSubNavi?: () => void;
    onNextButton?: () => void;
    onPrevButton?: () => void;
    onRoomAdFilter?: () => void;
    onRoomAdHeader?: () => void;
    onRoomCompetitionsHeader?: () => void;
    onRoomCtgFilter?: () => void;
    onRoomsHeader?: () => void;
    visibleMeHeader?: boolean;
    visibleRoomAdHeader?: boolean;
    visibleRoomsHeader?: boolean;
}

export const GrsMainWindowLayoutCustomContent = ({ layout, onCustomContent, onMeHeader, onMeSubNavi, onNextButton, onPrevButton, onRoomAdFilter, onRoomAdHeader, onRoomCompetitionsHeader, onRoomCtgFilter, onRoomsHeader, visibleMeHeader, visibleRoomAdHeader, visibleRoomsHeader }: GrsMainWindowLayoutCustomContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="custom_content"
            onPointerTap={onCustomContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 50, ...layout }}
        >
            {(visibleMeHeader ?? false) && (
                <Region
                    name="me_header"
                    onPointerTap={onMeHeader}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20 }}
                >
                    <Dropmenu
                        variant="0"
                        name="meSubNavi"
                        onPointerTap={onMeSubNavi}
                        layout={{ position: 'absolute', left: 0, width: 293, top: 0, bottom: 0 }}
                    />
                </Region>
            )}
            {(visibleRoomsHeader ?? false) && (
                <Region
                    name="rooms_header"
                    onPointerTap={onRoomsHeader}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20 }}
                >
                    <Dropmenu
                        variant="0"
                        name="roomCtgFilter"
                        onPointerTap={onRoomCtgFilter}
                        layout={{ position: 'absolute', left: 0, width: 293, top: 0, bottom: 0 }}
                    />
                </Region>
            )}
            {(visibleRoomAdHeader ?? false) && (
                <Region
                    name="room_ad_header"
                    onPointerTap={onRoomAdHeader}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20 }}
                >
                    <Dropmenu
                        variant="0"
                        name="roomAdFilter"
                        onPointerTap={onRoomAdFilter}
                        layout={{ position: 'absolute', left: 0, width: 293, top: 0, bottom: 0 }}
                    />
                </Region>
            )}
            <Region
                name="room_competitions_header"
                onPointerTap={onRoomCompetitionsHeader}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 33, justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('navigator.roomcompetitionspager')}
                    textOptions={{ align: 'center' }}
                    layout={{ position: 'absolute', marginLeft: -6, marginRight: 6, width: 295, top: 8, height: 13 }}
                />
                <ContainerButton
                    variant="0"
                    name="prev_button"
                    onPointerTap={onPrevButton}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                >
                    <Icon
                        variant="4"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 12, width: 5, top: 10, height: 9 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="0"
                    name="next_button"
                    onPointerTap={onNextButton}
                    layout={{ position: 'absolute', left: 262, width: 30, top: 0, height: 30 }}
                >
                    <Icon
                        variant="5"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 12, width: 5, top: 10, height: 9 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

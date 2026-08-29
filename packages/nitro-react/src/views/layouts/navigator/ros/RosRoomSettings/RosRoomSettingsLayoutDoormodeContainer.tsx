import { useTranslation } from '#base/context';
import { BoxLayout, RadioButton, Region, ThemeText } from '#base/theme';

/** Named region `doormode_container` of RosRoomSettingsLayout - configured through the parent's `doormodeContainer` prop. */
export interface RosRoomSettingsLayoutDoormodeContainerProps {
    captionDoormodeDoorbellLabel?: string;
    captionDoormodeInvisibleLabel?: string;
    captionDoormodeLabel?: string;
    captionDoormodeOpenLabel?: string;
    captionDoormodePasswordLabel?: string;
    layout?: BoxLayout;
    onDoormodeDoorbell?: () => void;
    onDoormodeInvisible?: () => void;
    onDoormodeOpen?: () => void;
    onDoormodePassword?: () => void;
}

export const RosRoomSettingsLayoutDoormodeContainer = ({ captionDoormodeDoorbellLabel, captionDoormodeInvisibleLabel, captionDoormodeLabel, captionDoormodeOpenLabel, captionDoormodePasswordLabel, layout, onDoormodeDoorbell, onDoormodeInvisible, onDoormodeOpen, onDoormodePassword }: RosRoomSettingsLayoutDoormodeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="doormode_container"
            layout={{ position: 'absolute', left: 0, width: 309, top: 87, height: 95, ...layout }}
        >
            <Region
                name="doormode_label"
                layout={{ position: 'absolute', left: 0, width: 193, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoormodeLabel ?? t('navigator.roomsettings.doormode')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="doormode"
                layout={{ position: 'absolute', left: 5, width: 274, top: 18, height: 80 }}
            >
                <RadioButton
                    variant="0"
                    name="doormode_open"
                    onPointerTap={onDoormodeOpen}
                    layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 20 }}
                />
                <RadioButton
                    variant="0"
                    name="doormode_doorbell"
                    onPointerTap={onDoormodeDoorbell}
                    layout={{ position: 'absolute', left: 0, width: 270, top: 20, height: 20 }}
                />
                <RadioButton
                    variant="0"
                    name="doormode_invisible"
                    onPointerTap={onDoormodeInvisible}
                    layout={{ position: 'absolute', left: 0, width: 270, top: 40, height: 20 }}
                />
                <RadioButton
                    variant="0"
                    name="doormode_password"
                    onPointerTap={onDoormodePassword}
                    layout={{ position: 'absolute', left: 0, width: 270, top: 60, height: 20 }}
                />
            </Region>
            <Region
                name="doormode_open_label"
                layout={{ position: 'absolute', left: 20, width: 230, top: 17, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoormodeOpenLabel ?? t('navigator.roomsettings.doormode.open')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="doormode_doorbell_label"
                layout={{ position: 'absolute', left: 20, width: 249, top: 36, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoormodeDoorbellLabel ?? t('navigator.roomsettings.doormode.doorbell')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="doormode_invisible_label"
                layout={{ position: 'absolute', left: 20, width: 245, top: 56, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoormodeInvisibleLabel ?? t('navigator.roomsettings.doormode.invisible')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="doormode_password_label"
                layout={{ position: 'absolute', left: 20, width: 253, top: 76, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDoormodePasswordLabel ?? t('navigator.roomsettings.doormode.password')}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

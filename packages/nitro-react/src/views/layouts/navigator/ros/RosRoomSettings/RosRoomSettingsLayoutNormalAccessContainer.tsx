import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, TextInput, ThemeText } from '#base/theme';

import { RosRoomSettingsLayoutDoormodeContainer, RosRoomSettingsLayoutDoormodeContainerProps } from './RosRoomSettingsLayoutDoormodeContainer';

/** Named region `normal_access_container` of RosRoomSettingsLayout - configured through the parent's `normalAccessContainer` prop. */
export interface RosRoomSettingsLayoutNormalAccessContainerProps {
    captionPasswordConfirmLabel?: string;
    captionPasswordLabel?: string;
    captionRoomAccessTabCaption?: string;
    captionRoomAccessTabInfo?: string;
    doormodeContainer?: RosRoomSettingsLayoutDoormodeContainerProps;
    layout?: BoxLayout;
    onBuildersFaqButton?: () => void;
    visibleDoormodeOverrideInfo?: boolean;
}

export const RosRoomSettingsLayoutNormalAccessContainer = ({ captionPasswordConfirmLabel, captionPasswordLabel, captionRoomAccessTabCaption, captionRoomAccessTabInfo, doormodeContainer, layout, onBuildersFaqButton, visibleDoormodeOverrideInfo }: RosRoomSettingsLayoutNormalAccessContainerProps) => {
    const t = useTranslation();
    const [ passwordValue, setPasswordValue ] = useState('');
    const [ passwordConfirmValue, setPasswordConfirmValue ] = useState('');

    return (
        <Region
            name="normal_access_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 354, ...layout }}
        >
            <Region
                name="room_access_tab_caption"
                layout={{ position: 'absolute', left: 0, width: 295, top: 3, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomAccessTabCaption ?? t('navigator.roomsettings.roomaccess.caption')}
                    textStyle="text-style-u-headline-small"
                />
            </Region>
            <Region
                name="room_access_tab_info"
                layout={{ position: 'absolute', left: 0, width: 310, top: 19, height: 69, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomAccessTabInfo ?? t('navigator.roomsettings.roomaccess.info')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 310 }}
                />
            </Region>
            <RosRoomSettingsLayoutDoormodeContainer {...doormodeContainer} />
            <Region
                name="password_container"
                layout={{ position: 'absolute', left: 41, width: 195, top: 188, height: 68 }}
            >
                <Region
                    name="password_label"
                    layout={{ position: 'absolute', left: 0, width: 189, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPasswordLabel ?? t('navigator.roomsettings.password')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <TextInput
                    value={passwordValue}
                    onChange={setPasswordValue}
                    backgroundColor="#fbfbf9"
                    layout={{ position: 'absolute', left: 1, width: 193, top: 15, height: 15 }}
                />
                <Region
                    name="password__confirm_label"
                    layout={{ position: 'absolute', left: 0, width: 234, top: 32, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPasswordConfirmLabel ?? t('navigator.roomsettings.passwordconfirm')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <TextInput
                    value={passwordConfirmValue}
                    onChange={setPasswordConfirmValue}
                    backgroundColor="#fbfbf9"
                    layout={{ position: 'absolute', left: 1, width: 193, top: 48, height: 15 }}
                />
            </Region>
            {(visibleDoormodeOverrideInfo ?? false) && (
                <Border
                    variant="0"
                    name="doormode_override_info"
                    layout={{ position: 'absolute', left: 0, width: 308, top: 88, height: 166, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', left: 5, width: 295, top: 10, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('notification.builders_club.room_locked.title')}
                            textStyle="text-style-u-headline-small"
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: 5, width: 298, top: 42, height: 79, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('notification.builders_club.room_locked.message')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 298 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="builders_faq_button"
                        onPointerTap={onBuildersFaqButton}
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 287, top: 122, height: 30 }}
                    >
                        {t('notification.builders_club.room_locked.linkTitle')}
                    </Button>
                </Border>
            )}
        </Region>
    );
};

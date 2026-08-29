import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, RadioButton, Region, TextInput, ThemeText } from '#base/theme';

/** Named region `ban_view` of NewModerationToolLayout - configured through the parent's `banView` prop. */
export interface NewModerationToolLayoutBanViewProps {
    captionUserTxt?: string;
    layout?: BoxLayout;
    onBanBtn?: () => void;
    onBanRadio?: () => void;
    onDurationSelector?: () => void;
    onUnbanRadio?: () => void;
    visibleBanView?: boolean;
}

export const NewModerationToolLayoutBanView = ({ captionUserTxt, layout, onBanBtn, onBanRadio, onDurationSelector, onUnbanRadio, visibleBanView }: NewModerationToolLayoutBanViewProps) => {
    const t = useTranslation();
    const [ banUsernameInputValue, setBanUsernameInputValue ] = useState('');

    return (
        (visibleBanView ?? false) && (
            <Region
                name="ban_view"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
            >
                <Region
                    name="user_txt"
                    layout={{ position: 'absolute', left: 9, width: 57, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionUserTxt ?? t('moderation.ban_management.user')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Border
                    variant="105"
                    layout={{ position: 'absolute', left: 9, right: 12, top: 29, height: 26 }}
                >
                    <TextInput
                        value={banUsernameInputValue}
                        onChange={setBanUsernameInputValue}
                        layout={{ position: 'absolute', left: 5, right: 8, top: 5, bottom: 5 }}
                    />
                </Border>
                <Region
                    name="ban_type"
                    layout={{ position: 'absolute', left: 13, right: 15, top: 62, height: 54 }}
                >
                    <RadioButton
                        variant="100"
                        name="unban_radio"
                        onPointerTap={onUnbanRadio}
                        layout={{ position: 'absolute', left: 0, width: 13, top: 25, height: 16, minHeight: 16, maxHeight: 16 }}
                    />
                    <RadioButton
                        variant="100"
                        name="ban_radio"
                        onPointerTap={onBanRadio}
                        layout={{ position: 'absolute', left: 0, width: 12, top: 4, height: 16, minHeight: 16, maxHeight: 16 }}
                    />
                </Region>
                <Button
                    variant="103"
                    name="ban_btn"
                    onPointerTap={onBanBtn}
                    layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
                >
                    {t('moderation.ban_management.do')}
                </Button>
                <Region layout={{ position: 'absolute', left: 28, width: 47, top: 65, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('moderation.ban_management.ban')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 28, width: 63, top: 86, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('moderation.ban_management.unban')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Dropmenu
                    variant="100"
                    name="duration_selector"
                    onPointerTap={onDurationSelector}
                    layout={{ position: 'absolute', right: 13, width: 101, top: 63, height: 22 }}
                >
                    1 Month
                </Dropmenu>
            </Region>
        )
    );
};

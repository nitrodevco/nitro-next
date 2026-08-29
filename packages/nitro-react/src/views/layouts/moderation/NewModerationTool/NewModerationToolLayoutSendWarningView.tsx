import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, TextInput, ThemeText } from '#base/theme';

/** Named region `send_warning_view` of NewModerationToolLayout - configured through the parent's `sendWarningView` prop. */
export interface NewModerationToolLayoutSendWarningViewProps {
    captionTextTxt?: string;
    captionUserTxt?: string;
    layout?: BoxLayout;
    onSendWarningBtn?: () => void;
    visibleSendWarningView?: boolean;
}

export const NewModerationToolLayoutSendWarningView = ({ captionTextTxt, captionUserTxt, layout, onSendWarningBtn, visibleSendWarningView }: NewModerationToolLayoutSendWarningViewProps) => {
    const t = useTranslation();
    const [ warningUsernameInputValue, setWarningUsernameInputValue ] = useState('');
    const [ warningInputValue, setWarningInputValue ] = useState('');

    return (
        (visibleSendWarningView ?? false) && (
            <Region
                name="send_warning_view"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
            >
                <Region
                    name="user_txt"
                    layout={{ position: 'absolute', left: 9, width: 57, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionUserTxt ?? t('moderation.warning.user')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Border
                    variant="105"
                    layout={{ position: 'absolute', left: 9, right: 12, top: 29, height: 26 }}
                >
                    <TextInput
                        value={warningUsernameInputValue}
                        onChange={setWarningUsernameInputValue}
                        layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5 }}
                    />
                </Border>
                <Region
                    name="text_txt"
                    layout={{ position: 'absolute', left: 9, width: 72, top: 59, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextTxt ?? t('moderation.warning.text')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Border
                    variant="105"
                    layout={{ position: 'absolute', left: 9, right: 12, top: 81, height: 44 }}
                >
                    <TextInput
                        value={warningInputValue}
                        onChange={setWarningInputValue}
                        multiline
                        layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5 }}
                    />
                </Border>
                <Button
                    variant="103"
                    name="send_warning_btn"
                    onPointerTap={onSendWarningBtn}
                    layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
                >
                    {t('moderation.warning.send')}
                </Button>
            </Region>
        )
    );
};

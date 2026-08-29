import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `unverified_container` of TaskProgressDialogLayout - configured through the parent's `unverifiedContainer` prop. */
export interface TaskProgressDialogLayoutUnverifiedContainerProps {
    captionErrorTxt?: string;
    layout?: BoxLayout;
    onChangeEmailRegion?: () => void;
    visibleUnverifiedContainer?: boolean;
}

export const TaskProgressDialogLayoutUnverifiedContainer = ({ captionErrorTxt, layout, onChangeEmailRegion, visibleUnverifiedContainer }: TaskProgressDialogLayoutUnverifiedContainerProps) => {
    const t = useTranslation();
    const [ emailTxtValue, setEmailTxtValue ] = useState('');

    return (
        (visibleUnverifiedContainer ?? false) && (
            <Region
                name="unverified_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
            >
                <Border
                    variant="105"
                    name="error_border"
                    tintColor="#cc0000"
                    layout={{ position: 'absolute', left: 0, width: 271, top: 0, height: 29 }}
                />
                <Border
                    variant="105"
                    name="input_border"
                    layout={{ position: 'absolute', left: 2, width: 267, top: 2, height: 24 }}
                >
                    <TextInput
                        value={emailTxtValue}
                        onChange={setEmailTxtValue}
                        layout={{ position: 'absolute', left: 4, width: 258, top: 4, height: 15 }}
                    />
                </Border>
                <Region
                    name="change_email_region"
                    onPointerTap={onChangeEmailRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 3, width: 319, top: 28, height: 21 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 156, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {t('talent.track.progress.setemail')}
                    </Region>
                </Region>
                <Region
                    name="error_txt"
                    layout={{ position: 'absolute', left: 2, width: 318, top: 28, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionErrorTxt ?? 'jkhgjk hgk jhg kjhg jkh lkjh lkjh lkjh lkjh lkj hlkjh lkj hlkjh lkj'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#cc0000', wordWrap: true, wordWrapWidth: 318 }}
                    />
                </Region>
                <Region
                    name="changed_container"
                    layout={{ position: 'absolute', left: 2, width: 328, top: 29, height: 36 }}
                >
                    <ThemeImage
                        src={layoutImage('help_accept_icon.png')}
                        layout={{ position: 'absolute', left: 0, width: 11, top: 6, height: 10 }}
                    />
                    <Region layout={{ position: 'absolute', left: 16, width: 306, top: 2, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('talent.track.progress.emailchanged')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 306 }}
                        />
                    </Region>
                </Region>
            </Region>
        )
    );
};

import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `3000_passwd_input_xml` (layout "passwd_input", 237x217) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PasswdInputLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onTry?: () => void;
}

export const PasswdInputLayout = ({ layout, onClose, onTry }: PasswdInputLayoutProps) => {
    const t = useTranslation();
    const [ passwordInputValue, setPasswordInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={32801}
            caption={t('navigator.password.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 237, height: 217, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="room_name"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 176, top: 16, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="Room name" />
                </Region>
                <Region
                    name="info"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 205, top: 35, height: 68, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('navigator.password.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 205 }}
                    />
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 97, top: 107, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={t('navigator.password.enter')} />
                </Region>
                <TextInput
                    value={passwordInputValue}
                    onChange={setPasswordInputValue}
                    layout={{ position: 'absolute', left: 113, width: 100, top: 107, height: 19 }}
                />
                <Region
                    params={16}
                    backgroundColor="#eaece8"
                    layout={{ position: 'absolute', left: 10, width: 207, top: 142, height: 34 }}
                >
                    <Region
                        name="cancel_region"
                        params={131221}
                        layout={{ position: 'absolute', left: 0, width: 83, top: 5, height: 26 }}
                    >
                        <Region
                            name="cancel"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 83, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('generic.cancel')} />
                        </Region>
                    </Region>
                    <Button
                        variant="3"
                        name="try"
                        params={131089}
                        onPointerTap={onTry}
                        layout={{ position: 'absolute', left: 110, width: 188, top: 3, height: 28 }}
                    >
                        {t('navigator.password.button.try')}
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};

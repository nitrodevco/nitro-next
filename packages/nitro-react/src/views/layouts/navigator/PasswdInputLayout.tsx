import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `3000_passwd_input_xml` (layout "passwd_input", 237x217) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PasswdInputLayoutProps {
    cancelRegion?: PasswdInputLayoutCancelRegionProps;
    captionInfo?: string;
    captionRoomName?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onTry?: () => void;
}

export const PasswdInputLayout = ({ cancelRegion, captionInfo, captionRoomName, layout, onClose, onTry }: PasswdInputLayoutProps) => {
    const t = useTranslation();
    const [ passwordInputValue, setPasswordInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            caption={t('navigator.password.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 237, height: 217, ...layout }}
        >
            <Region
                name="room_name"
                layout={{ position: 'absolute', left: 10, width: 176, top: 16, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomName ?? 'Room name'} />
            </Region>
            <Region
                name="info"
                layout={{ position: 'absolute', left: 10, width: 205, top: 35, height: 68, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInfo ?? t('navigator.password.info')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 205 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 10, width: 97, top: 107, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('navigator.password.enter')} />
            </Region>
            <TextInput
                value={passwordInputValue}
                onChange={setPasswordInputValue}
                layout={{ position: 'absolute', left: 113, width: 100, top: 107, height: 19 }}
            />
            <Region
                backgroundColor="#eaece8"
                layout={{ position: 'absolute', left: 10, width: 207, top: 142, height: 34 }}
            >
                <PasswdInputLayoutCancelRegion {...cancelRegion} />
                <Button
                    variant="3"
                    name="try"
                    onPointerTap={onTry}
                    layout={{ position: 'absolute', left: 110, width: 188, top: 3, height: 28 }}
                >
                    {t('navigator.password.button.try')}
                </Button>
            </Region>
        </Frame>
    );
};

/** Named region `cancel_region` of PasswdInputLayout - configured through the parent's `cancelRegion` prop. */
export interface PasswdInputLayoutCancelRegionProps {
    captionCancel?: string;
    layout?: BoxLayout;
    onCancelRegion?: () => void;
}

export const PasswdInputLayoutCancelRegion = ({ captionCancel, layout, onCancelRegion }: PasswdInputLayoutCancelRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel_region"
            onPointerTap={onCancelRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 124, top: 5, height: 26, ...layout }}
        >
            <Region
                name="cancel"
                layout={{ position: 'absolute', left: 0, width: 83, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCancel ?? t('generic.cancel')} />
            </Region>
        </Region>
    );
};

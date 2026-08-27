import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `3055_iro_event_settings_xml` (layout "rev_room_event", 241x191) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroEventSettingsLayoutProps {
    captionDescLabel?: string;
    captionNameLabel?: string;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const IroEventSettingsLayout = ({ captionDescLabel, captionNameLabel, layout, onClose }: IroEventSettingsLayoutProps) => {
    const t = useTranslation();
    const [ eventNameValue, setEventNameValue ] = useState('');
    const [ eventDescValue, setEventDescValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="event_window"
            name="event_window"
            params={32769}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 241, height: 191, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="inputs_cont"
                    params={144}
                    layout={{ position: 'absolute', left: 11, width: 218, top: 4, height: 192 }}
                >
                    <Region
                        name="name_label"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 173, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionNameLabel ?? t('navigator.eventsettings.name')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <TextInput
                        value={eventNameValue}
                        onChange={setEventNameValue}
                        layout={{ position: 'absolute', left: 0, width: 217, top: 16, height: 15 }}
                    />
                    <Region
                        name="desc_label"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 169, top: 36, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionDescLabel ?? t('navigator.eventsettings.desc')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <TextInput
                        value={eventDescValue}
                        onChange={setEventDescValue}
                        multiline
                        layout={{ position: 'absolute', left: 0, width: 217, top: 52, height: 88 }}
                    />
                </Region>
                <Region
                    name="buttons"
                    params={98321}
                    layout={{ position: 'absolute', left: 10, width: 220, top: 200, height: 29 }}
                />
            </Region>
        </Frame>
    );
};

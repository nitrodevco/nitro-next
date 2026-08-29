import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `3055_iro_event_settings_xml` (layout "rev_room_event", 241x191) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroEventSettingsLayoutProps {
    buttons?: IroEventSettingsLayoutButtonsProps;
    inputsCont?: IroEventSettingsLayoutInputsContProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const IroEventSettingsLayout = ({ buttons, inputsCont, layout, onClose }: IroEventSettingsLayoutProps) => {
    return (
        <Frame
            variant="3"
            id="event_window"
            name="event_window"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 241, height: 191, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <IroEventSettingsLayoutInputsCont {...inputsCont} />
                <IroEventSettingsLayoutButtons {...buttons} />
            </Region>
        </Frame>
    );
};

/** Named region `inputs_cont` of IroEventSettingsLayout - configured through the parent's `inputsCont` prop. */
export interface IroEventSettingsLayoutInputsContProps {
    captionDescLabel?: string;
    captionNameLabel?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const IroEventSettingsLayoutInputsCont = ({ captionDescLabel, captionNameLabel, layout, tags }: IroEventSettingsLayoutInputsContProps) => {
    const t = useTranslation();
    const [ eventNameValue, setEventNameValue ] = useState('');
    const [ eventDescValue, setEventDescValue ] = useState('');

    return (
        <Region
            name="inputs_cont"
            tags={tags}
            layout={{ position: 'absolute', left: 11, right: 12, top: 4, height: 192, ...layout }}
        >
            <Region
                name="name_label"
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
    );
};

/** Named region `buttons` of IroEventSettingsLayout - configured through the parent's `buttons` prop. */
export interface IroEventSettingsLayoutButtonsProps {
    layout?: BoxLayout;
    onButtons?: () => void;
    tags?: string[];
}

export const IroEventSettingsLayoutButtons = ({ layout, onButtons, tags }: IroEventSettingsLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            onPointerTap={onButtons}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 220, top: 200, height: 29, ...layout }}
        />
    );
};

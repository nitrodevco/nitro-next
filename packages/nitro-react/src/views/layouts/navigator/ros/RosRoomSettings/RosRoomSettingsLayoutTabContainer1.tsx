import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Icon, Region, TextInput, ThemeText } from '#base/theme';

import { RosRoomSettingsLayoutTagCategoryContainer, RosRoomSettingsLayoutTagCategoryContainerProps } from './RosRoomSettingsLayoutTagCategoryContainer';

/** Named region `tab_container_1` of RosRoomSettingsLayout - configured through the parent's `tabContainer1` prop. */
export interface RosRoomSettingsLayoutTabContainer1Props {
    captionDescriptionLabel?: string;
    captionRemoveLink?: string;
    captionRoomNameLabel?: string;
    captionWalkThroughText?: string;
    layout?: BoxLayout;
    onAllowWalkThroughCheckbox?: () => void;
    onRemoveLinkRegion?: () => void;
    onTabContainer1?: () => void;
    tagCategoryContainer?: RosRoomSettingsLayoutTagCategoryContainerProps;
    visibleTabContainer1?: boolean;
}

export const RosRoomSettingsLayoutTabContainer1 = ({ captionDescriptionLabel, captionRemoveLink, captionRoomNameLabel, captionWalkThroughText, layout, onAllowWalkThroughCheckbox, onRemoveLinkRegion, onTabContainer1, tagCategoryContainer, visibleTabContainer1 }: RosRoomSettingsLayoutTabContainer1Props) => {
    const t = useTranslation();
    const [ roomNameValue, setRoomNameValue ] = useState('');
    const [ descriptionValue, setDescriptionValue ] = useState('');

    return (
        (visibleTabContainer1 ?? false) && (
            <Region
                name="tab_container_1"
                onPointerTap={onTabContainer1}
                cursor="pointer"
                layout={{ position: 'absolute', left: 6, width: 321, top: 0, height: 360, ...layout }}
            >
                <Region
                    name="room_name_label"
                    layout={{ position: 'absolute', left: 0, width: 119, top: -3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRoomNameLabel ?? t('navigator.roomname')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <TextInput
                    value={roomNameValue}
                    onChange={setRoomNameValue}
                    backgroundColor="#fbfbf9"
                    layout={{ position: 'absolute', left: 0, width: 300, top: 14, height: 20 }}
                />
                <Region
                    name="description_label"
                    layout={{ position: 'absolute', left: 0, width: 163, top: 35, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescriptionLabel ?? t('navigator.roomsettings.desc')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <TextInput
                    value={descriptionValue}
                    onChange={setDescriptionValue}
                    backgroundColor="#fbfbf9"
                    layout={{ position: 'absolute', left: 0, width: 300, top: 51, height: 39 }}
                />
                <RosRoomSettingsLayoutTagCategoryContainer {...tagCategoryContainer} />
                <Region
                    name="advanced_container"
                    layout={{ position: 'absolute', left: 0, width: 218, top: 253, height: 82 }}
                >
                    <CheckBox
                        variant="0"
                        name="allow_walk_through_checkbox"
                        onPointerTap={onAllowWalkThroughCheckbox}
                        layout={{ position: 'absolute', left: 2, width: 20, top: 59, height: 20 }}
                    />
                    <Region
                        name="walk_through_text"
                        layout={{ position: 'absolute', left: 18, width: 249, top: 58, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionWalkThroughText ?? t('navigator.roomsettings.allow_walk_through')}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                </Region>
                <Region
                    name="remove_link_region"
                    onPointerTap={onRemoveLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 60, width: 180, top: 339, height: 18, justifyContent: 'center' }}
                >
                    <Region
                        name="remove_link"
                        layout={{ position: 'absolute', marginLeft: -4, marginRight: 4, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRemoveLink ?? t('navigator.roomsettings.delete')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#bb2200' }}
                        />
                    </Region>
                    <Icon
                        variant="9"
                        name="remove_icon"
                        tintColor="#bb2200"
                        layout={{ position: 'absolute', left: 0, width: 20, top: 2, height: 20 }}
                    />
                </Region>
            </Region>
        )
    );
};

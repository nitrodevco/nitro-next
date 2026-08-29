import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Icon, Region, TextInput, ThemeText } from '#base/theme';

import { RoomSettingsLayoutTagCategoryContainer, RoomSettingsLayoutTagCategoryContainerProps } from './RoomSettingsLayoutTagCategoryContainer';

/** Row template `tab_container_1` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutTabContainer1ItemProps {
    captionDescriptionLabel?: string;
    captionRemoveLink?: string;
    captionRoomNameLabel?: string;
    captionWalkThroughText?: string;
    layout?: BoxLayout;
    onAllowWalkThroughCheckbox?: () => void;
    onRemoveLinkRegion?: () => void;
    tagCategoryContainer?: RoomSettingsLayoutTagCategoryContainerProps;
    visibleAdvancedContainer?: boolean;
    visibleAllowWalkThroughCheckbox?: boolean;
    visibleDescription?: boolean;
    visibleDescriptionLabel?: boolean;
    visibleRemoveIcon?: boolean;
    visibleRemoveLink?: boolean;
    visibleRemoveLinkRegion?: boolean;
    visibleRoomName?: boolean;
    visibleRoomNameLabel?: boolean;
    visibleTagCategoryContainer?: boolean;
    visibleWalkThroughText?: boolean;
}

export const RoomSettingsLayoutTabContainer1Item = ({ captionDescriptionLabel, captionRemoveLink, captionRoomNameLabel, captionWalkThroughText, layout, onAllowWalkThroughCheckbox, onRemoveLinkRegion, tagCategoryContainer, visibleAdvancedContainer, visibleAllowWalkThroughCheckbox, visibleDescription, visibleDescriptionLabel, visibleRemoveIcon, visibleRemoveLink, visibleRemoveLinkRegion, visibleRoomName, visibleRoomNameLabel, visibleTagCategoryContainer, visibleWalkThroughText }: RoomSettingsLayoutTabContainer1ItemProps) => {
    const t = useTranslation();
    const [ roomNameValue, setRoomNameValue ] = useState('');
    const [ descriptionValue, setDescriptionValue ] = useState('');

    return (
        <Region
            name="tab_container_1"
            layout={{ width: 321, height: 360, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleRoomNameLabel ?? true) && (
                <Region
                    name="room_name_label"
                    layout={{ position: 'absolute', left: 0, width: 119, top: -3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRoomNameLabel ?? t('navigator.roomname')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            )}
            {(visibleRoomName ?? true) && (
                <TextInput
                    value={roomNameValue}
                    onChange={setRoomNameValue}
                    backgroundColor="#fbfbf9"
                    layout={{ position: 'absolute', left: 0, width: 300, top: 14, height: 20, overflow: 'hidden' }}
                />
            )}
            {(visibleDescriptionLabel ?? true) && (
                <Region
                    name="description_label"
                    layout={{ position: 'absolute', left: 0, width: 163, top: 35, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescriptionLabel ?? t('navigator.roomsettings.desc')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            )}
            {(visibleDescription ?? true) && (
                <TextInput
                    value={descriptionValue}
                    onChange={setDescriptionValue}
                    backgroundColor="#fbfbf9"
                    layout={{ position: 'absolute', left: 0, width: 300, top: 51, height: 39, overflow: 'hidden' }}
                />
            )}
            {(visibleTagCategoryContainer ?? true) && (
                <RoomSettingsLayoutTagCategoryContainer {...tagCategoryContainer} />
            )}
            {(visibleAdvancedContainer ?? true) && (
                <Region
                    name="advanced_container"
                    layout={{ position: 'absolute', left: 0, width: 216, top: 239, height: 82 }}
                >
                    {(visibleAllowWalkThroughCheckbox ?? true) && (
                        <CheckBox
                            variant="0"
                            name="allow_walk_through_checkbox"
                            onPointerTap={onAllowWalkThroughCheckbox}
                            layout={{ position: 'absolute', left: 2, width: 20, top: 59, height: 20 }}
                        />
                    )}
                    {(visibleWalkThroughText ?? true) && (
                        <Region
                            name="walk_through_text"
                            layout={{ position: 'absolute', left: 18, width: 249, top: 58, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionWalkThroughText ?? t('navigator.roomsettings.allow_walk_through')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                    )}
                </Region>
            )}
            {(visibleRemoveLinkRegion ?? true) && (
                <Region
                    name="remove_link_region"
                    onPointerTap={onRemoveLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', width: 189, top: 334, height: 22 }}
                >
                    {(visibleRemoveLink ?? true) && (
                        <Region
                            name="remove_link"
                            layout={{ position: 'absolute', left: 15, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionRemoveLink ?? t('navigator.roomsettings.delete')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#bb2200' }}
                            />
                        </Region>
                    )}
                    {(visibleRemoveIcon ?? true) && (
                        <Icon
                            variant="9"
                            name="remove_icon"
                            tintColor="#bb2200"
                            layout={{ position: 'absolute', left: 0, width: 20, top: 2, height: 20 }}
                        />
                    )}
                </Region>
            )}
        </Region>
    );
};

import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';

/** Named region `normal_rights_container` of RosRoomSettingsLayout - configured through the parent's `normalRightsContainer` prop. */
export interface RosRoomSettingsLayoutNormalRightsContainerProps {
    captionFriendsTxt?: string;
    captionSearchTxt?: string;
    captionUsersWithRightsTxt?: string;
    itemsFriendsItemList?: ReactNode;
    itemsUsersWithRightsItemList?: ReactNode;
    layout?: BoxLayout;
    onRemoveAllFlatCtrls?: () => void;
}

export const RosRoomSettingsLayoutNormalRightsContainer = ({ captionFriendsTxt, captionSearchTxt, captionUsersWithRightsTxt, itemsFriendsItemList, itemsUsersWithRightsItemList, layout, onRemoveAllFlatCtrls }: RosRoomSettingsLayoutNormalRightsContainerProps) => {
    const t = useTranslation();
    const [ filterUsersInputValue, setFilterUsersInputValue ] = useState('');

    return (
        <Region
            name="normal_rights_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 367, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="0"
                name="search_border"
                tintColor="#e9e9e1"
                layout={{ position: 'absolute', left: 0, width: 322, top: 1, height: 42 }}
            >
                <Region
                    name="search_txt"
                    layout={{ position: 'absolute', left: 6, width: 138, top: 12, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSearchTxt ?? t('navigator.flatctrls.filter')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <TextInput
                    value={filterUsersInputValue}
                    onChange={setFilterUsersInputValue}
                    layout={{ position: 'absolute', left: 97, right: 9, top: 8, height: 23 }}
                />
            </Border>
            <Region
                name="users_with_rights_txt"
                layout={{ position: 'absolute', marginLeft: -88.5, marginRight: 88.5, width: 150, top: 44, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUsersWithRightsTxt ?? t('navigator.flatctrls.userswithrights')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
                />
            </Region>
            <Region
                name="friends_txt"
                layout={{ position: 'absolute', marginLeft: 86.5, marginRight: -86.5, width: 150, top: 44, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFriendsTxt ?? t('navigator.flatctrls.friends')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
                />
            </Region>
            <Border
                variant="0"
                name="users_with_rights_cont"
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 150, top: 74, bottom: 4 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 4, right: 25, top: 4, bottom: 39 }}
                >
                    <Region
                        name="users_with_rights_item_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsUsersWithRightsItemList}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for users_with_rights_item_list - rendered by that list's ScrollArea */}
                <ButtonThick
                    variant="3"
                    name="remove_all_flat_ctrls"
                    onPointerTap={onRemoveAllFlatCtrls}
                    layout={{ position: 'absolute', left: 4, width: 142, bottom: 4, height: 29, minWidth: 142, maxWidth: 142 }}
                >
                    {t('navigator.flatctrls.clear')}
                </ButtonThick>
            </Border>
            <Border
                variant="0"
                name="friends_cont"
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 173, width: 150, top: 74, bottom: 4 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 4, right: 25, top: 4, bottom: 4 }}
                >
                    <Region
                        name="friends_item_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsFriendsItemList}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for friends_item_list - rendered by that list's ScrollArea */}
            </Border>
        </Region>
    );
};

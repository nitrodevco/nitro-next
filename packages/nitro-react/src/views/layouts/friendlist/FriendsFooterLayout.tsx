import { useState } from 'react';

import { Border, BoxLayout, ContainerButton, Region, TextInput, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1527_friends_footer_xml` (layout "friends_footer", 223x41) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendsFooterLayoutProps {
    layout?: BoxLayout;
    onButtonOpenHomepage?: () => void;
    onButtonOpenMinimail?: () => void;
    onButtonRemoveFriend?: () => void;
    onButtonRoomInvite?: () => void;
    onButtonSearch?: () => void;
    onClearInputRegion?: () => void;
    srcIcon?: string;
    srcIcon2?: string;
    srcIcon3?: string;
    srcIcon4?: string;
    srcIcon5?: string;
    visibleButtonOpenMinimail?: boolean;
    visibleClearInputRegion?: boolean;
}

export const FriendsFooterLayout = ({ layout, onButtonOpenHomepage, onButtonOpenMinimail, onButtonRemoveFriend, onButtonRoomInvite, onButtonSearch, onClearInputRegion, srcIcon, srcIcon2, srcIcon3, srcIcon4, srcIcon5, visibleButtonOpenMinimail, visibleClearInputRegion }: FriendsFooterLayoutProps) => {
    const [ friendSearchValue, setFriendSearchValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 223, height: 41, ...layout }}>
            <Region
                name="footer"
                params={16}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 223, top: 0, height: 41 }}
            >
                <Border
                    variant="0"
                    name="border"
                    params={144}
                    tintColor="#d9d9d9"
                    layout={{ position: 'absolute', left: 5, width: 213, top: 5, height: 31 }}
                >
                    <Region
                        visible={visibleButtonOpenMinimail ?? false}
                        layout={{ position: 'absolute', left: 5, width: 32, top: 4, height: 22 }}
                    >
                        <ContainerButton
                            variant="0"
                            name="button_open_minimail"
                            params={17}
                            onPointerTap={onButtonOpenMinimail}
                            layout={{ width: '100%', height: '100%' }}
                        >
                            <ThemeImage
                                name="icon"
                                params={16}
                                src={srcIcon}
                                layout={{ position: 'absolute', left: 8, width: 19, top: 4, height: 14 }}
                            />
                        </ContainerButton>
                    </Region>
                    <ContainerButton
                        variant="0"
                        name="button_room_invite"
                        params={17}
                        onPointerTap={onButtonRoomInvite}
                        layout={{ position: 'absolute', left: 5, width: 32, top: 4, height: 22 }}
                    >
                        <ThemeImage
                            name="icon"
                            params={16}
                            src={srcIcon2}
                            layout={{ position: 'absolute', left: 6, width: 19, top: 4, height: 13 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        name="button_open_homepage"
                        params={17}
                        onPointerTap={onButtonOpenHomepage}
                        layout={{ position: 'absolute', left: 41, width: 27, top: 4, height: 22 }}
                    >
                        <ThemeImage
                            name="icon"
                            params={16}
                            src={srcIcon3}
                            layout={{ position: 'absolute', left: 7, width: 13, top: 5, height: 11 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        name="button_search"
                        params={81}
                        onPointerTap={onButtonSearch}
                        layout={{ position: 'absolute', left: 158, width: 23, top: 4, height: 22 }}
                    >
                        <ThemeImage
                            name="icon"
                            params={16}
                            src={srcIcon4}
                            layout={{ position: 'absolute', left: 5, width: 13, top: 4, height: 13 }}
                        />
                    </ContainerButton>
                    <TextInput
                        value={friendSearchValue}
                        onChange={setFriendSearchValue}
                        layout={{ position: 'absolute', left: 76, width: 103, top: 5, height: 19 }}
                    />
                    <Region
                        name="clear_input_region"
                        params={65}
                        visible={visibleClearInputRegion ?? false}
                        onPointerTap={onClearInputRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 162, width: 16, top: 7, height: 16 }}
                    >
                        <Region
                            params={16}
                            backgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 2, width: 11, top: 2, height: 11 }}
                        />
                        <ThemeImage
                            params={80}
                            src={layoutImage('var_picker_cancel_search.png')}
                            layout={{ position: 'absolute', left: 3, width: 9, top: 3, height: 9 }}
                        />
                    </Region>
                    <ContainerButton
                        variant="0"
                        name="button_remove_friend"
                        params={81}
                        onPointerTap={onButtonRemoveFriend}
                        layout={{ position: 'absolute', left: 185, width: 23, top: 4, height: 22 }}
                    >
                        <ThemeImage
                            name="icon"
                            params={16}
                            src={srcIcon5}
                            layout={{ position: 'absolute', left: 5, width: 13, top: 4, height: 13 }}
                        />
                    </ContainerButton>
                </Border>
            </Region>
        </Region>
    );
};

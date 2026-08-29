import { useState } from 'react';

import { Border, BoxLayout, ContainerButton, Region, TextInput, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1527_friends_footer_xml` (layout "friends_footer", 223x41) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendsFooterLayoutProps {
    footer?: FriendsFooterLayoutFooterProps;
    layout?: BoxLayout;
}

export const FriendsFooterLayout = ({ footer, layout }: FriendsFooterLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 223, height: 41, ...layout }}>
            <FriendsFooterLayoutFooter {...footer} />
        </Region>
    );
};

/** Named region `clear_input_region` of FriendsFooterLayout - configured through the parent's `clearInputRegion` prop. */
export interface FriendsFooterLayoutClearInputRegionProps {
    layout?: BoxLayout;
    onClearInputRegion?: () => void;
    tags?: string[];
    visibleClearInputRegion?: boolean;
}

export const FriendsFooterLayoutClearInputRegion = ({ layout, onClearInputRegion, tags, visibleClearInputRegion }: FriendsFooterLayoutClearInputRegionProps) => {
    return (
        <Region
            name="clear_input_region"
            tags={tags}
            visible={visibleClearInputRegion ?? false}
            onPointerTap={onClearInputRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 35, width: 16, top: 7, height: 16, ...layout }}
        >
            <Region
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 2, width: 11, top: 2, height: 11 }}
            />
            <ThemeImage
                src={layoutImage('var_picker_cancel_search.png')}
                layout={{ position: 'absolute', right: 4, width: 9, top: 3, height: 9 }}
            />
        </Region>
    );
};

/** Named region `footer` of FriendsFooterLayout - configured through the parent's `footer` prop. */
export interface FriendsFooterLayoutFooterProps {
    clearInputRegion?: FriendsFooterLayoutClearInputRegionProps;
    layout?: BoxLayout;
    onButtonOpenHomepage?: () => void;
    onButtonOpenMinimail?: () => void;
    onButtonRemoveFriend?: () => void;
    onButtonRoomInvite?: () => void;
    onButtonSearch?: () => void;
    srcIcon?: string;
    srcIcon2?: string;
    srcIcon3?: string;
    srcIcon4?: string;
    srcIcon5?: string;
    tags?: string[];
    visibleButtonOpenMinimail?: boolean;
}

export const FriendsFooterLayoutFooter = ({ clearInputRegion, layout, onButtonOpenHomepage, onButtonOpenMinimail, onButtonRemoveFriend, onButtonRoomInvite, onButtonSearch, srcIcon, srcIcon2, srcIcon3, srcIcon4, srcIcon5, tags, visibleButtonOpenMinimail }: FriendsFooterLayoutFooterProps) => {
    const [ friendSearchValue, setFriendSearchValue ] = useState('');

    return (
        <Region
            name="footer"
            tags={tags}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 223, top: 0, height: 41, ...layout }}
        >
            <Border
                variant="0"
                name="border"
                tintColor="#d9d9d9"
                layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 31 }}
            >
                <Region
                    visible={visibleButtonOpenMinimail ?? false}
                    layout={{ position: 'absolute', left: 5, width: 32, top: 4, height: 22 }}
                >
                    <ContainerButton
                        variant="0"
                        name="button_open_minimail"
                        onPointerTap={onButtonOpenMinimail}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <ThemeImage
                            name="icon"
                            src={srcIcon}
                            layout={{ position: 'absolute', left: 8, width: 19, top: 4, height: 14 }}
                        />
                    </ContainerButton>
                </Region>
                <ContainerButton
                    variant="0"
                    name="button_room_invite"
                    onPointerTap={onButtonRoomInvite}
                    layout={{ position: 'absolute', left: 5, width: 32, top: 4, height: 22 }}
                >
                    <ThemeImage
                        name="icon"
                        src={srcIcon2}
                        layout={{ position: 'absolute', left: 6, width: 19, top: 4, height: 13 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="0"
                    name="button_open_homepage"
                    onPointerTap={onButtonOpenHomepage}
                    layout={{ position: 'absolute', left: 41, width: 27, top: 4, height: 22 }}
                >
                    <ThemeImage
                        name="icon"
                        src={srcIcon3}
                        layout={{ position: 'absolute', left: 7, width: 13, top: 5, height: 11 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="0"
                    name="button_search"
                    onPointerTap={onButtonSearch}
                    layout={{ position: 'absolute', right: 32, width: 23, top: 4, height: 22 }}
                >
                    <ThemeImage
                        name="icon"
                        src={srcIcon4}
                        layout={{ position: 'absolute', left: 5, width: 13, top: 4, height: 13 }}
                    />
                </ContainerButton>
                <TextInput
                    value={friendSearchValue}
                    onChange={setFriendSearchValue}
                    layout={{ position: 'absolute', left: 76, right: 34, top: 5, height: 19 }}
                />
                <FriendsFooterLayoutClearInputRegion {...clearInputRegion} />
                <ContainerButton
                    variant="0"
                    name="button_remove_friend"
                    onPointerTap={onButtonRemoveFriend}
                    layout={{ position: 'absolute', right: 5, width: 23, top: 4, height: 22 }}
                >
                    <ThemeImage
                        name="icon"
                        src={srcIcon5}
                        layout={{ position: 'absolute', left: 5, width: 13, top: 4, height: 13 }}
                    />
                </ContainerButton>
            </Border>
        </Region>
    );
};

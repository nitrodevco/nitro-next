import { useFriendsActions, useFriendsStore } from '#base/context/friend';
import { useSystemActions } from '#base/context/system';
import { Border, ContainerButton, LayoutImage, Region, TextInput, ThemeImage } from '#base/theme';

/**
 * The friends tab's `friends_footer` (223x41, stretched to the tab's width by
 * `refreshTabContentDims`): a `0xd9d9d9` border at (5, 5) holding the style-0 container buttons at
 * their layout rects - `button_room_invite` and `button_open_homepage` from the left,
 * `button_search` and `button_remove_friend` from the right - and the `friend_search` input with
 * its `clear_input_region` that replace the search button (`FriendsView.onSearchButtonClick`).
 * Each button reports its `friendlist.tip.*` to the window's info text, as `showInfo` does.
 *
 * The four button faces are the layout's `<bitmap name="icon">` slots, which
 * `FriendsView.fillFooter` -> `initButton` fills from the friend list's own asset library
 * (`HabboFriendList.getButtonImage`): `room_invite_png`, `open_homepage_png`, `search_png` and
 * `remove_friend_png`, each sized to its bitmap (`search_png` is 12x12 in a 13x13 slot).
 * `button_open_minimail` is `visible="false"` in the layout and has no
 * place here either.
 */
export const FriendListFriendsFooter = () => {
    const selectedFriendIds = useFriendsStore(x => x.selectedFriendIds);
    const showListSearchInput = useFriendsStore(x => x.showListSearchInput);
    const listSearchValue = useFriendsStore(x => x.listSearchValue);
    const { setListSearchValue, toggleListSearchInput, tooltipHandlers, setFilterValue } = useFriendsActions();
    const { toggleWindow } = useSystemActions();

    const inviteHover = tooltipHandlers('friendlist.tip.invite');
    const homeHover = tooltipHandlers('friendlist.tip.home');
    const searchHover = tooltipHandlers('friendlist.tip.search');
    const removeHover = tooltipHandlers('friendlist.tip.remove');

    return (
        <Region
            backgroundColor="#ffffff"
            layout={{ position: 'relative', width: '100%', height: 41, flexShrink: 0 }}
        >
            <Border
                variant="0"
                tintColor="#d9d9d9"
                layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 31 }}
            >
                <ContainerButton
                    variant="0"
                    disabled={selectedFriendIds.length < 1}
                    onPointerTap={() => toggleWindow('friendlist_invite')}
                    onPointerOver={inviteHover.onMouseEnter}
                    onPointerOut={inviteHover.onMouseLeave}
                    layout={{ position: 'absolute', left: 5, top: 4, width: 32, height: 22 }}
                >
                    <ThemeImage
                        name="icon"
                        src={LayoutImage('friend-list/friendlist_room_invite.png')}
                        bitmap={{}}
                        layout={{ position: 'absolute', left: 6, top: 4, width: 19, height: 13 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="0"
                    disabled={selectedFriendIds.length !== 1}
                    onPointerOver={homeHover.onMouseEnter}
                    onPointerOut={homeHover.onMouseLeave}
                    layout={{ position: 'absolute', left: 41, top: 4, width: 27, height: 22 }}
                >
                    <ThemeImage
                        name="icon"
                        src={LayoutImage('friend-list/friendlist_open_homepage.png')}
                        bitmap={{}}
                        layout={{ position: 'absolute', left: 7, top: 5, width: 13, height: 11 }}
                    />
                </ContainerButton>
                {!showListSearchInput && (
                    <ContainerButton
                        variant="0"
                        onPointerTap={() => toggleListSearchInput(true)}
                        onPointerOver={searchHover.onMouseEnter}
                        onPointerOut={searchHover.onMouseLeave}
                        layout={{ position: 'absolute', right: 32, top: 4, width: 23, height: 22 }}
                    >
                        <ThemeImage
                            name="icon"
                            src={LayoutImage('friend-list/friendlist_search.png')}
                            bitmap={{}}
                            layout={{ position: 'absolute', left: 5, top: 4, width: 12, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {showListSearchInput && (
                    <>
                        <Region
                            onPointerOver={searchHover.onMouseEnter}
                            onPointerOut={searchHover.onMouseLeave}
                            layout={{ position: 'absolute', left: 76, right: 34, top: 5, height: 19 }}
                        >
                            <TextInput
                                value={listSearchValue}
                                onChange={setListSearchValue}
                                onEnter={() => setFilterValue(listSearchValue)}
                                flashPlacement
                                border="#000000"
                                backgroundColor={null}
                                focusedBackgroundColor={null}
                                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 19 }}
                            />
                        </Region>
                        {/* `clear_input_region`: a white 11x11 patch under the 9x9 `var_picker_cancel_search` cross. */}
                        <Region
                            cursor="pointer"
                            onPointerTap={() => toggleListSearchInput(false)}
                            layout={{ position: 'absolute', right: 35, top: 7, width: 16, height: 16 }}
                        >
                            <Region
                                backgroundColor="#ffffff"
                                layout={{ position: 'absolute', left: 2, top: 2, width: 11, height: 11 }}
                            />
                            <ThemeImage
                                src={LayoutImage('shared/var_picker_cancel_search.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                layout={{ position: 'absolute', right: 4, top: 3, width: 9, height: 9 }}
                            />
                        </Region>
                    </>
                )}
                <ContainerButton
                    variant="0"
                    disabled={selectedFriendIds.length < 1}
                    onPointerTap={() => toggleWindow('friendlist_remove_confirmation')}
                    onPointerOver={removeHover.onMouseEnter}
                    onPointerOut={removeHover.onMouseLeave}
                    layout={{ position: 'absolute', right: 5, top: 4, width: 23, height: 22 }}
                >
                    <ThemeImage
                        name="icon"
                        src={LayoutImage('friend-list/friendlist_remove_friend.png')}
                        bitmap={{}}
                        layout={{ position: 'absolute', left: 5, top: 4, width: 13, height: 13 }}
                    />
                </ContainerButton>
            </Border>
        </Region>
    );
};

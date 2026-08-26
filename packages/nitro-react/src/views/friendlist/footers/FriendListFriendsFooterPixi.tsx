import { useFriendsActions, useFriendsSelectors, useSystemActions } from '#base/context';
import { Border, Box, Button, NitroIcon, TextInput } from '#base/theme';

const BUTTON_LAYOUT = { paddingLeft: 6, paddingRight: 6, paddingTop: 5, paddingBottom: 5 };

/**
 * Pixi port of views/friendlist/footers/FriendListFriendsFooter.tsx. DOM's `tooltipHandlers`
 * (onMouseEnter/onMouseLeave updating the frame's own footer hint text) is wired everywhere
 * here that this port controls the Box directly, but skipped on the four `Button`-wrapped icons
 * (invite/home/search/remove) - `Button`'s own `useInteractionState` already owns
 * `onPointerOver`/`onPointerOut` for its hover-art swap, and it has no passthrough for a second
 * caller-supplied pair (unlike `AccordionTrigger`, which this migration extended for the same
 * need - see FriendListTabPixi.tsx). Widening `Button`'s own contract mid-batch for a cosmetic
 * footer hint was judged not worth the risk to an already-shipped, widely-used component; noted
 * here rather than silently dropped.
 */
export const FriendListFriendsFooterPixi = () => {
    const { selectedFriendIds, showListSearchInput, listSearchValue } = useFriendsSelectors();
    const { setListSearchValue, toggleListSearchInput, tooltipHandlers, setFilterValue } = useFriendsActions();
    const { toggleWindow } = useSystemActions();

    const searchHover = tooltipHandlers('friendlist.tip.search');

    return (
        <Box layout={{ height: 40, flexShrink: 0, paddingLeft: 6, paddingRight: 6, paddingTop: 5, paddingBottom: 5 }}>
            <Border
                tintColor="#d8d8d8"
                layout={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingRight: 5 }}
            >
                <Box layout={{ flexDirection: 'row', gap: 4 }}>
                    <Button
                        disabled={selectedFriendIds.length < 1}
                        onPointerTap={() => toggleWindow('friendlist_invite')}
                        layout={BUTTON_LAYOUT}
                    >
                        <NitroIcon
                            icon="icon-room-invite"
                            layout={{}}
                        />
                    </Button>
                    <Button
                        disabled={selectedFriendIds.length !== 1}
                        layout={BUTTON_LAYOUT}
                    >
                        <NitroIcon
                            icon="icon-homepage-outline"
                            layout={{}}
                        />
                    </Button>
                </Box>
                <Box layout={{ flex: 1, flexDirection: 'row', gap: 4, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Box
                        onPointerOver={searchHover.onMouseEnter}
                        onPointerOut={searchHover.onMouseLeave}
                        layout={{ position: 'relative' }}
                    >
                        {showListSearchInput
                            ? (
                                    <>
                                        <TextInput
                                            value={listSearchValue}
                                            onChange={setListSearchValue}
                                            onEnter={() => setFilterValue(listSearchValue)}
                                            fontSize={9}
                                            layout={{ width: 108, height: 20 }}
                                        />
                                        <Box
                                            cursor="pointer"
                                            onPointerTap={() => toggleListSearchInput(false)}
                                            layout={{ position: 'absolute', right: 4, top: 6 }}
                                        >
                                            <NitroIcon
                                                icon="icon-close-gray"
                                                layout={{}}
                                            />
                                        </Box>
                                    </>
                                )
                            : (
                                    <Button
                                        onPointerTap={() => toggleListSearchInput(true)}
                                        layout={BUTTON_LAYOUT}
                                    >
                                        <NitroIcon
                                            icon="icon-search-outline"
                                            layout={{}}
                                        />
                                    </Button>
                                )}
                    </Box>
                    <Button
                        disabled={selectedFriendIds.length < 1}
                        onPointerTap={() => toggleWindow('friendlist_remove_confirmation')}
                        layout={BUTTON_LAYOUT}
                    >
                        <NitroIcon
                            icon="icon-trash-outline"
                            layout={{}}
                        />
                    </Button>
                </Box>
            </Border>
        </Box>
    );
};

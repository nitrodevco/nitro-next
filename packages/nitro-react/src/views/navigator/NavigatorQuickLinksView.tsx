import { NavigatorDeleteSavedSearchComposer, NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useInterpolate, useTranslation } from '#base/context/system';
import { Border, ContainerButton, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/**
 * `navigator_frame_2`'s `left_pane`, driven by `QuickLinksView.as`: the orange `left_pane_hide`
 * header (its `left_hide_container`; `left_show_container` only shows while the pane itself is
 * hidden, so never) over the `quicklinks_list`, one `quick_link` region per saved search. A row's
 * `remove_quick_link` shows while the pointer is over the row (`listItemProcedure`'s
 * `WME_OVER` / `WME_OUT`); the row itself draws nothing on hover.
 *
 * `quicklinks_list` is a style 100 `scrollable_itemlist_vertical` (`illumina_light_scrollable_itemlist_vertical`:
 * a 9px style 100 scrollbar flush against the list). The theme's scrollbar has no style 100, so
 * the list scrolls with the default 17px bar, flush as Flash places it.
 */
export const NavigatorQuickLinksView = () => {
    const savedSearches = useNavigatorStore(x => x.savedSearches);
    const { setIsSearching } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const interpolate = useInterpolate();
    const [ hoveredId, setHoveredId ] = useState<number | null>(null);

    const runSearch = (searchCode: string, filter: string) => {
        setIsSearching(true);

        send(new NewNavigatorSearchComposer({ searchCodeOriginal: searchCode, filteringData: filter }));
    };

    return (
        <Border
            variant="2"
            name="left_pane"
            layout={{ position: 'absolute', left: 6, width: 141, top: 35, bottom: 16, overflow: 'hidden' }}
        >
            <Region
                name="left_pane_hide"
                layout={{ position: 'absolute', left: -6, width: 149, top: 0, height: 21, overflow: 'hidden' }}
            >
                <Border
                    variant="2"
                    tintColor="#fba800"
                    layout={{ position: 'absolute', left: 6, width: 141, top: 0, height: 27 }}
                >
                    <Region
                        name="left_hide_container"
                        layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 18, overflow: 'hidden' }}
                    >
                        <ThemeImage
                            src={LayoutImage('navigator/newnavigator_button_quicklink_add.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', fitSizeToContents: true }}
                            layout={{ position: 'absolute', left: 3, width: 18, top: 3, height: 18 }}
                        />
                        <ThemeText
                            text={t('navigator.quick.links.title')}
                            textStyle="id_heading_2"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 20, top: 2, height: 17 }}
                        />
                    </Region>
                </Border>
            </Region>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 5, width: 136, top: 25, bottom: 4, gap: 0 }}
            >
                <Region
                    name="quicklinks_list"
                    layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
                >
                    {savedSearches.map(link => (
                        <Region
                            key={link.id}
                            name="quick_link"
                            tooltip={t('navigator.tooltip.open.saved.search')}
                            cursor="pointer"
                            onPointerTap={() => runSearch(link.searchCode, link.filter)}
                            onPointerOver={() => setHoveredId(link.id)}
                            onPointerOut={() => setHoveredId(null)}
                            layout={{ height: 17, width: 132, marginLeft: -2, flexShrink: 0, overflow: 'hidden' }}
                        >
                            <ThemeText
                                name="quick_link_text"
                                text={interpolate(link.localization)}
                                textStyle="u_regular"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, top: 0, height: 17 }}
                            />
                            {(hoveredId === link.id) && (
                                <ContainerButton
                                    variant="0"
                                    name="remove_quick_link"
                                    tooltip={t('navigator.tooltip.remove.saved.search')}
                                    onPointerTap={(event) => {
                                        event.stopPropagation();

                                        send(new NavigatorDeleteSavedSearchComposer({ searchId: link.id }));
                                    }}
                                    layout={{ position: 'absolute', left: 115, width: 16, top: 1, height: 16 }}
                                >
                                    <ThemeImage
                                        src={LayoutImage('navigator/newnavigator_icon_ql_remove.png')}
                                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', fitSizeToContents: true }}
                                        layout={{ position: 'absolute', left: 3, width: 10, top: 3, height: 10 }}
                                    />
                                </ContainerButton>
                            )}
                        </Region>
                    ))}
                </Region>
            </ScrollArea>
        </Border>
    );
};

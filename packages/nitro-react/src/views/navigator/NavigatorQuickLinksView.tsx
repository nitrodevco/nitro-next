import { NavigatorDeleteSavedSearchComposer, NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';

import { useInterpolate, useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { Border, NitroIcon, ScrollArea } from '#base/theme';

/**
 * left_pane — border style="2", 141x538, collapsed via the left_pane_hide region.
 * quicklinks_list — scrollable_itemlist_vertical style="100", 136 wide, spacing 2.
 * Each quick_link is 132x17 with a remove_quick_link button revealed on hover.
 */
export const NavigatorQuickLinksView = () => {
    const { savedSearches, leftPaneHidden } = useNavigatorSelectors();
    const { setIsSearching } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const interpolate = useInterpolate();

    const runSearch = (searchCode: string, filter: string) => {
        setIsSearching(true);

        send(new NewNavigatorSearchComposer({ searchCodeOriginal: searchCode, filteringData: filter }));
    };

    // the pane is toggled by temp_back in NavigatorView; hidden means not rendered
    if (leftPaneHidden) return null;

    return (
        <Border className="flex flex-col shrink-0 w-35.25 h-full p-1" blend={0.5} variant="2">
            {/* left_pane_hide header — text_style id_heading_2 */}
            <div className="flex items-center gap-1.25 shrink-0 h-5.25 px-1">
                <NitroIcon icon="icon-nav-quicklink-add" />
                <span className="truncate text-style-u-bold text-white">{t('navigator.quick.links.title')}</span>
            </div>
            <ScrollArea className="flex-1 min-h-0" contentClassName="flex flex-col gap-0.5" variant="100">
                {savedSearches.map(link => (
                    <div
                        key={link.id}
                        className="group flex items-center px-1 min-h-4.25 max-h-4.25 cursor-pointer hover:bg-[#82d1ed]"
                        title={t('navigator.tooltip.open.saved.search')}
                        onClick={() => runSearch(link.searchCode, link.filter)}>
                        <span className="flex-1 min-w-0 truncate text-style-u-regular">{interpolate(link.localization)}</span>
                        {/* remove_quick_link — visible="false" in the layout, shown on hover */}
                        <NitroIcon
                            className="invisible shrink-0 group-hover:visible"
                            icon="icon-nav-quicklink-remove"
                            title={t('navigator.tooltip.remove.saved.search')}
                            onClick={event => {
                                event.stopPropagation();
                                send(new NavigatorDeleteSavedSearchComposer({ searchId: link.id }));
                            }} />
                    </div>
                ))}
            </ScrollArea>
        </Border>
    );
}

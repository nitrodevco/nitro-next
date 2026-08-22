import type { ISavedSearch } from '@nitrodevco/nitro-packets';
import { NavigatorDeleteSavedSearchComposer } from '@nitrodevco/nitro-packets';

import { useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { useNavigatorSearch } from '#base/hooks';
import { Border, Button, NitroIcon, ScrollArea, useTooltip } from '#base/theme';

/**
 * left_pane — border style="2" (colorless), 141x538, collapsed via the left_pane_hide region.
 * quicklinks_list — scrollable_itemlist_vertical style="100", x=5 y=25, 136 wide, spacing 2.
 * Each quick_link is 132x17: default-style text plus a 16x16 container_button (style 0)
 * at x=115 holding the 10x10 ql_remove glyph, revealed on hover.
 */
const CATEGORY_PREFIX = 'category__';

export const NavigatorQuickLinksView = () => {
    const { savedSearches, leftPaneHidden } = useNavigatorSelectors();
    const { performSearch } = useNavigatorSearch();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const tooltip = useTooltip();

    /*
     * QuickLinksView.setQuickLinks builds the caption itself — the wire `localization`
     * field is never used:
     *   getLocalization("navigator.searchcode.title." + searchCode, searchCode)
     *     + (filter != "" ? " - " + filter : "")
     * and search codes starting with "category__" show the bare code minus the prefix.
     */
    const linkCaption = (link: ISavedSearch) => {
        const suffix = link.filter !== '' ? ` - ${link.filter}` : '';

        if (link.searchCode.startsWith(CATEGORY_PREFIX)) return link.searchCode.slice(CATEGORY_PREFIX.length) + suffix;

        return t(`navigator.searchcode.title.${link.searchCode}`, link.searchCode) + suffix;
    };

    /* performSearchByContext — routed through the cache like every search */
    const runSearch = (searchCode: string, filter: string) => performSearch(searchCode, filter);

    // the pane is toggled by temp_back in NavigatorView; hidden means not rendered
    if (leftPaneHidden) return null;

    return (
        /*
         * left_pane y=35 h=538 vs right_pane y=25 h=548 — the pane starts 10px below
         * the right column and both end at y=573, level with the create/random room
         * buttons; mt/mb-2.5 reproduce those offsets against the stretched row height
         */
        <Border className="flex flex-col shrink-0 w-35.25 mt-2.5 mb-2.5 p-1" variant="2">
            {/* left_pane_hide header — the 141x27 orange border (color="0x0fba800") sits
                inside the 21px-tall left_pane_hide region, which clips off its bottom
                rounded corners: rounded top, flat bottom. Icon at (3,3), text at (20,2). */}
            <div className="relative shrink-0 h-5.25 -mx-1 -mt-1 overflow-hidden">
                <Border className="relative w-full h-6.75" tintColor="#FBA800" variant="2">
                    <NitroIcon className="absolute top-0.75 left-0.75" icon="icon-nav-quicklink-add" />
                    <span className="absolute top-0.5 left-5 right-1 truncate text-style-u-bold text-white">{t('navigator.quick.links.title')}</span>
                </Border>
            </div>
            <ScrollArea className="flex-1 min-h-0 pt-1" contentClassName="flex flex-col gap-0.5" variant="100">
                {savedSearches.map(link => (
                    <div
                        key={link.id}
                        className="group flex items-center min-h-4.25 max-h-4.25 cursor-pointer"
                        {...tooltip(t('navigator.tooltip.open.saved.search'))}
                        onClick={() => runSearch(link.searchCode, link.filter)}>
                        {/* quick_link_text — default text style ("regular", Volter 9) */}
                        <span className="flex-1 min-w-0 truncate text-style-regular">{linkCaption(link)}</span>
                        {/* remove_quick_link — container_button style="0", visible="false" until hover */}
                        <Button
                            className="invisible group-hover:visible flex items-center justify-center shrink-0 w-4 h-4 p-0"
                            {...tooltip(t('navigator.tooltip.remove.saved.search'))}
                            variant="0"
                            onClick={event => {
                                event.stopPropagation();
                                send(new NavigatorDeleteSavedSearchComposer({ searchId: link.id }));
                            }}>
                            <NitroIcon icon="icon-nav-quicklink-remove" />
                        </Button>
                    </div>
                ))}
            </ScrollArea>
        </Border>
    );
}

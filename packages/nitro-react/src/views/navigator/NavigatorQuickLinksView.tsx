import { NavigatorDeleteSavedSearchComposer, NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useInterpolate, useTranslation } from '#base/context/system';
import { Border, Box, ColorLayer, LayoutImage, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/**
 * Pixi port of views/navigator/NavigatorQuickLinksView.tsx. `navigator_frame_2`'s
 * `left_hide_container` heads the pane with the same `newnavigator_button_quicklink_add` bitmap
 * the category header uses, and each `quick_link` row carries a hover-only `remove_quick_link`
 * drawn from `newnavigator_icon_ql_remove`.
 */
export const NavigatorQuickLinksView = () => {
    const savedSearches = useNavigatorStore(x => x.savedSearches);
    const leftPaneHidden = useNavigatorStore(x => x.leftPaneHidden);
    const { setIsSearching } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const interpolate = useInterpolate();
    const [ hoveredId, setHoveredId ] = useState<number | null>(null);

    const runSearch = (searchCode: string, filter: string) => {
        setIsSearching(true);

        send(new NewNavigatorSearchComposer({ searchCodeOriginal: searchCode, filteringData: filter }));
    };

    if (leftPaneHidden) return null;

    return (
        <Border
            blend={0.5}
            variant="2"
            layout={{ flexDirection: 'column', flexShrink: 0, width: 141, height: '100%', padding: 4 }}
        >
            <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 0, height: 21, paddingLeft: 4 }}>
                <ThemeImage
                    src={LayoutImage('navigator/newnavigator_button_quicklink_add.png')}
                    layout={{}}
                />
                <ThemeText
                    layout={{ flex: 1 }}
                    text={t('navigator.quick.links.title')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Box>
            <ScrollArea layout={{ flex: 1 }}>
                {savedSearches.map(link => (
                    <Box
                        key={link.id}
                        cursor="pointer"
                        onPointerTap={() => runSearch(link.searchCode, link.filter)}
                        onPointerOver={() => setHoveredId(link.id)}
                        onPointerOut={() => setHoveredId(null)}
                        layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', paddingLeft: 4, paddingRight: 4, minHeight: 17, maxHeight: 17 }}
                    >
                        {hoveredId === link.id && <ColorLayer color="#82d1ed" />}
                        <ThemeText
                            layout={{ flex: 1 }}
                            text={interpolate(link.localization)}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#000000' }}
                        />
                        {hoveredId === link.id && (
                            <Box
                                cursor="pointer"
                                onPointerTap={(event) => {
                                    event.stopPropagation();

                                    send(new NavigatorDeleteSavedSearchComposer({ searchId: link.id }));
                                }}
                                layout={{ flexShrink: 0 }}
                            >
                                <ThemeImage
                                    name="remove_quick_link"
                                    src={LayoutImage('navigator/newnavigator_icon_ql_remove.png')}
                                    layout={{}}
                                />
                            </Box>
                        )}
                    </Box>
                ))}
            </ScrollArea>
        </Border>
    );
};

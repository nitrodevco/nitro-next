import { NavigatorDeleteSavedSearchComposer, NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useInterpolate, useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { Border, Box, ColorLayer, NitroIcon, ScrollArea, ThemeText } from '#base/theme';

/** Pixi port of views/navigator/NavigatorQuickLinksView.tsx. */
export const NavigatorQuickLinksView = () => {
    const { savedSearches, leftPaneHidden } = useNavigatorSelectors();
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
                <NitroIcon
                    icon="icon-nav-quicklink-add"
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
                                onPointerTap={(event) => { event.stopPropagation(); send(new NavigatorDeleteSavedSearchComposer({ searchId: link.id })); }}
                                layout={{ flexShrink: 0 }}
                            >
                                <NitroIcon
                                    icon="icon-nav-quicklink-remove"
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

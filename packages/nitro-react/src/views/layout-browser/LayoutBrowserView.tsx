import { ComponentType, useEffect, useMemo, useState } from 'react';

import { useSystemActions } from '#base/context';
import { Border, Button, ColorLayer, Frame, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';
import { LAYOUT_REGISTRY, LAYOUT_WIDGET_PROPS, LayoutRegistryEntry } from '#base/views/layouts/layoutRegistry';

const MAX_RESULTS = 794;

const matches = (entry: LayoutRegistryEntry, query: string) =>
    entry.name.includes(query) || entry.component.toLowerCase().includes(query) || entry.as3.some(cls => cls.toLowerCase().includes(query));

/**
 * Mounts one generated layout on demand. Every `on*` prop the component declares is wired to
 * report the event back (so a click on any button/region/tab in the port is visible), and
 * `onClose` closes the preview. Layouts whose root isn't a `Frame` get one so they can be
 * dragged/closed like a window.
 */
const LayoutPreview = ({ entry, onEvent, onClose }: { entry: LayoutRegistryEntry; onEvent: (name: string) => void; onClose: () => void }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see LayoutRegistryEntry.load
    const [ Component, setComponent ] = useState<ComponentType<any> | undefined>(undefined);

    // Remounted per entry by its caller (`key={entry.component}`), so there's no stale
    // component to clear here - only the async load to guard against.
    useEffect(() => {
        let cancelled = false;

        void entry.load().then((loaded) => {
            if (!cancelled) setComponent(() => loaded);
        });

        return () => {
            cancelled = true;
        };
    }, [ entry ]);

    // Named regions/lists are their own sub-components whose props are forwarded through a
    // prop named after them - walk that tree so a click deep inside the layout still reports.
    const props = useMemo(() => {
        const build = (propNames: string[], nested: Record<string, string>, path: string): Record<string, unknown> => {
            const handlers: Record<string, unknown> = {};

            for (const prop of propNames) {
                const label = path ? `${path}.${prop}` : prop;

                if (prop === 'onClose' && !path) handlers[prop] = onClose;
                else if (prop.startsWith('on')) handlers[prop] = () => onEvent(label);
                else if (nested[prop]) {
                    const sub = entry.subComponentProps[nested[prop]] ?? LAYOUT_WIDGET_PROPS[nested[prop]];

                    if (sub) handlers[prop] = build(sub.props, sub.nested, label);
                }
            }

            return handlers;
        };

        return build(entry.props, entry.nested, '');
    }, [ entry, onEvent, onClose ]);

    if (!Component) return null;

    if (entry.rootIsFrame) {
        return (
            <Component
                {...props}
                layout={{ position: 'absolute', left: 340, top: 40 }}
            />
        );
    }

    const [ width, height ] = entry.size.split('x').map(Number);

    return (
        <Frame
            id="layout_browser_preview"
            variant="3"
            caption={entry.name}
            onClose={onClose}
            layout={{ position: 'absolute', left: 340, top: 40, width: Math.max(120, width + 12), height: height + 44 }}
        >
            <Component {...props} />
        </Frame>
    );
};

/**
 * Dev window listing every Flash layout port under views/layouts (see
 * scripts/generate-layout-views.ts): search by layout name, component name, or the decompiled
 * AS3 class that used it, open one, and watch which of its handlers fire.
 */
export const LayoutBrowserView = () => {
    const { toggleWindow } = useSystemActions();
    const [ query, setQuery ] = useState('');
    const [ selected, setSelected ] = useState<LayoutRegistryEntry | undefined>(undefined);
    const [ opened, setOpened ] = useState<LayoutRegistryEntry | undefined>(undefined);
    const [ lastEvent, setLastEvent ] = useState('');

    const results = useMemo(() => {
        const needle = query.trim().toLowerCase();
        const filtered = needle ? LAYOUT_REGISTRY.filter(entry => matches(entry, needle)) : LAYOUT_REGISTRY;

        return { total: filtered.length, entries: filtered.slice(0, MAX_RESULTS) };
    }, [ query ]);

    const open = (entry: LayoutRegistryEntry) => {
        setLastEvent('');
        setOpened(entry);
    };

    return (
        <>
            <Frame
                id="layout_browser"
                variant="3"
                caption={`Layouts (${LAYOUT_REGISTRY.length})`}
                onClose={() => toggleWindow('layout_browser')}
                layout={{ position: 'absolute', left: 20, top: 40, width: 310, height: 460 }}
            >
                <Region layout={{ flex: 1, flexDirection: 'column', gap: 4, padding: 4 }}>
                    <TextInput
                        value={query}
                        onChange={setQuery}
                        layout={{ height: 22, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={`${results.entries.length} of ${results.total} shown - search by name, component or AS3 class`}
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#ffffff' }}
                    />
                    <Border
                        variant="2"
                        layout={{ flex: 1, minHeight: 0, padding: 2 }}
                    >
                        <ScrollArea layout={{ flex: 1 }}>
                            {results.entries.map((entry) => {
                                const isSelected = entry === selected;

                                return (
                                    <Region
                                        key={entry.component}
                                        cursor="pointer"
                                        onPointerTap={() => setSelected(entry)}
                                        layout={{ width: '100%', height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 4, paddingRight: 4 }}
                                    >
                                        {isSelected && <ColorLayer color="#1077ac" />}
                                        <ThemeText
                                            text={entry.name}
                                            textStyle="text-style-u-regular"
                                            textOptions={{ fill: isSelected ? '#ffffff' : '#000000' }}
                                        />
                                        <ThemeText
                                            text={entry.size}
                                            textStyle="text-style-u-small"
                                            textOptions={{ fill: isSelected ? '#ffffff' : '#666666' }}
                                        />
                                    </Region>
                                );
                            })}
                        </ScrollArea>
                    </Border>
                    <Border
                        variant="2"
                        layout={{ height: 110, flexShrink: 0, flexDirection: 'column', gap: 2, padding: 4 }}
                    >
                        {selected
                            ? (
                                    <>
                                        <ThemeText
                                            text={`${selected.component} (${selected.size}, ${selected.props.length} props)`}
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#000000' }}
                                        />
                                        <ThemeText
                                            text={selected.as3.length ? `AS3: ${selected.as3.map(cls => cls.slice(cls.lastIndexOf('/') + 1)).join(', ')}` : 'AS3: no direct reference found in the decompiled client'}
                                            textStyle="text-style-u-small"
                                            textOptions={{ fill: '#333333', wordWrap: true, wordWrapWidth: 280 }}
                                        />
                                        <Region layout={{ flex: 1 }} />
                                        <Region layout={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <Button
                                                variant="3"
                                                onPointerTap={() => open(selected)}
                                            >
                                                Open
                                            </Button>
                                            <ThemeText
                                                text={lastEvent ? `last: ${lastEvent}` : ''}
                                                textStyle="text-style-u-small"
                                                textOptions={{ fill: '#000000' }}
                                            />
                                        </Region>
                                    </>
                                )
                            : (
                                    <ThemeText
                                        text="Select a layout"
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#666666' }}
                                    />
                                )}
                    </Border>
                </Region>
            </Frame>
            {opened && (
                <LayoutPreview
                    key={opened.component}
                    entry={opened}
                    onEvent={setLastEvent}
                    onClose={() => setOpened(undefined)}
                />
            )}
        </>
    );
};

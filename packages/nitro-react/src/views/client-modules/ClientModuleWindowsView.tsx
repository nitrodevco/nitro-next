/**
 * Not Flash's: the open windows of the client modules (`windows.register` / `open`), each drawn by
 * its module's component in a boundary of its own, so a module that throws while drawing loses its
 * window and nothing else. The component draws its own frame - the theme's `Frame` or a
 * `TemplateWindow` - and is handed its params and its `close`. A plugin's window defined as data has no
 * component: `DataWindowView` draws it from its template.
 *
 * A window registered `onTop` is drawn in a layer of its own over every other window - the
 * windows in it still raise over each other as they are pressed - and under the toolbar's sub
 * menus, the floating popups and the modal dialogs. One registered `aboveOnTop` is drawn in a layer
 * over that one (a settings window over a HUD purse), still under the menus, popups and dialogs.
 */
import { ReactNode } from 'react';

import { ClientModuleWindow, useClientModulesActions, useClientModulesStore } from '#base/context/client-modules';
import { Box } from '#base/theme';
import { ViewErrorBoundary } from '#base/views/system/ViewErrorBoundary';

import { DataWindowView } from './DataWindowView';

/** Over every window's own z-index (they count up from 100), under `ToolbarExtendedMenu`'s 80000. */
const ON_TOP_Z_INDEX = 70000;
const ABOVE_ON_TOP_Z_INDEX = 75000;

type Layer = 'window' | 'onTop' | 'aboveOnTop';

const layerOf = (window: ClientModuleWindow): Layer => (window.aboveOnTop === true ? 'aboveOnTop' : window.onTop === true ? 'onTop' : 'window');

/** A layer over the window desktop: its windows raise over each other as they are pressed. */
const OverLayer = ({ zIndex, children }: { zIndex: number; children: ReactNode[] }) => ((children.length > 0)
    ? (
            <Box
                zIndex={zIndex}
                sortableChildren={true}
                pointerTransparent
                layout={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
                {children}
            </Box>
        )
    : null);

export const ClientModuleWindowsView = () => {
    const windows = useClientModulesStore(x => x.windows);
    const openWindows = useClientModulesStore(x => x.openWindows);
    const { closeWindow } = useClientModulesActions();

    const draw = (layer: Layer) => Object.entries(openWindows).map(([ key, params ]) => {
        const window = windows[key];

        if (!window || (layerOf(window) !== layer)) return null;

        const Window = window.component;

        return (
            <ViewErrorBoundary key={key}>
                {window.template
                    ? (
                            <DataWindowView
                                templateId={window.template}
                                close={() => closeWindow(key)}
                            />
                        )
                    : Window && (
                        <Window
                            params={params}
                            close={() => closeWindow(key)}
                        />
                    )}
            </ViewErrorBoundary>
        );
    }).filter(Boolean);

    return (
        <>
            {draw('window')}
            <OverLayer zIndex={ON_TOP_Z_INDEX}>{draw('onTop')}</OverLayer>
            <OverLayer zIndex={ABOVE_ON_TOP_Z_INDEX}>{draw('aboveOnTop')}</OverLayer>
        </>
    );
};

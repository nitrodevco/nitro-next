/**
 * Not Flash's: the open windows of the client modules (`windows.register` / `open`), each drawn by
 * its module's component in a boundary of its own, so a module that throws while drawing loses its
 * window and nothing else. The component draws its own frame - the theme's `Frame` or a
 * `TemplateWindow` - and is handed its params and its `close`.
 *
 * A window registered `onTop` is drawn in a layer of its own over every other window - the
 * windows in it still raise over each other as they are pressed - and under the toolbar's sub
 * menus, the floating popups and the modal dialogs.
 */
import { useClientModulesActions, useClientModulesStore } from '#base/context/client-modules';
import { Box } from '#base/theme';
import { ViewErrorBoundary } from '#base/views/system/ViewErrorBoundary';

/** Over every window's own z-index (they count up from 100), under `ToolbarExtendedMenu`'s 80000. */
const ON_TOP_Z_INDEX = 70000;

export const ClientModuleWindowsView = () => {
    const windows = useClientModulesStore(x => x.windows);
    const openWindows = useClientModulesStore(x => x.openWindows);
    const { closeWindow } = useClientModulesActions();

    const draw = (onTop: boolean) => Object.entries(openWindows).map(([ key, params ]) => {
        const window = windows[key];

        if (!window || ((window.onTop === true) !== onTop)) return null;

        const Window = window.component;

        return (
            <ViewErrorBoundary key={key}>
                <Window
                    params={params}
                    close={() => closeWindow(key)}
                />
            </ViewErrorBoundary>
        );
    });

    const onTop = draw(true).filter(Boolean);

    return (
        <>
            {draw(false)}
            {(onTop.length > 0) && (
                <Box
                    zIndex={ON_TOP_Z_INDEX}
                    sortableChildren={true}
                    pointerTransparent
                    layout={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                >
                    {onTop}
                </Box>
            )}
        </>
    );
};

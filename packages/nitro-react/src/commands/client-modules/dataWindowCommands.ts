/**
 * Not Flash's: what a plugin's windows defined as data (`theme/dataWindows.ts`) add to the client -
 * each a window of the module window layer drawn from its template, its me menu entries and toolbar
 * icons - kept in step with the windows read, and the link that opens one, `window/<plugin key>/<name>`.
 * Registered under the plugin's key, as a module's are, so the extension inspector lists them by owner.
 */
import { clientModulesStore } from '#base/context/client-modules';
import { getDataWindows, loadDataWindowFiles, subscribeDataWindows } from '#base/theme/dataWindows';

/** The keys of what the windows last added, to take away before the next. */
let added: { windows: string[]; meMenu: string[]; toolbar: string[] } = { windows: [], meMenu: [], toolbar: [] };

/** Opens the window defined as data `<plugin key>/<name>`; false when there is none. */
export const openDataWindow = (id: string) => {
    const window = getDataWindows().get(id);

    if (!window) return false;

    clientModulesStore.getState().openWindow(window.templateId);

    return true;
};

const sync = () => {
    const store = clientModulesStore.getState();
    const windows = [ ...getDataWindows().values() ];
    const keep = new Set(windows.map(window => window.templateId));

    added.windows.filter(key => !keep.has(key)).forEach(key => store.removeWindow(key));
    added.meMenu.forEach(key => store.removeMeMenuItem(key));
    added.toolbar.forEach(key => store.removeToolbarItem(key));
    added = { windows: [], meMenu: [], toolbar: [] };

    for (const window of windows) {
        const key = window.templateId;
        const open = () => store.openWindow(key);

        store.addWindow({ moduleKey: window.owner, key, template: key });
        added.windows.push(key);

        window.entries.forEach((entry, index) => {
            const entryKey = `${key}-entry${index}`;

            if (entry.where === 'memenu') {
                store.addMeMenuItem({ moduleKey: window.owner, key: entryKey, caption: entry.caption ?? window.title, onClick: open });
                added.meMenu.push(entryKey);
            } else if (entry.icon) {
                store.addToolbarItem({ moduleKey: window.owner, key: entryKey, icon: entry.icon, tooltip: entry.tooltip ?? window.title, onClick: open });
                added.toolbar.push(entryKey);
            }
        });
    }
};

let subscribed = false;

/**
 * Reads the windows `templates.windows` names and adds what they bring; the preview host's drafts
 * (`setDataWindowDrafts`) are added and taken away the same way as they change.
 */
export const loadDataWindows = async (value: unknown) => {
    if (!subscribed) {
        subscribed = true;
        subscribeDataWindows(sync);
    }

    await loadDataWindowFiles(value);
};

/**
 * Not Flash's: the client modules' buttons in a room menu (`api.contextMenu.add`), for the avatar or
 * furni the menu is open on. Each is a row the module's template patch added to the menu's template
 * (`clientModuleMenuRow`); the menu lists the shown ones after its own and binds them here, as it
 * binds its own rows.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { useMemo } from 'react';

import { ClientModuleContextMenu, ClientModuleContextMenuTargets, useClientModulesStore } from '#base/context/client-modules';
import { TemplateBinding, TemplateBindings } from '#base/theme';

export interface ClientModuleMenuButton {
    /** The row's name in the template, `<module key>:<id>`. */
    row: string;
    moduleKey: string;
    label: string;
    icon?: string;
    press: () => void;
}

/** The buttons the modules show for `target` in `menu`: each one whose `when` passes (one that throws is left out and logged). */
export const useClientModuleMenuButtons = <M extends ClientModuleContextMenu>(menu: M, target: ClientModuleContextMenuTargets[M] | undefined): ClientModuleMenuButton[] => {
    const items = useClientModulesStore(x => x.contextMenuItems);

    return useMemo(() => {
        if (!target) return [];

        return items.filter((item) => {
            if (item.menu !== menu) return false;

            try {
                return !item.when || (item.when as (target: ClientModuleContextMenuTargets[M]) => boolean)(target);
            } catch (error) {
                NitroLogger.error('ClientModules', `${item.moduleKey}: the ${item.key} button's when threw`, error);

                return false;
            }
        }).map(item => ({
            row: item.row,
            moduleKey: item.moduleKey,
            label: item.label,
            icon: item.icon,
            press: () => (item.onClick as (target: ClientModuleContextMenuTargets[M]) => void)(target),
        }));
    }, [ items, menu, target ]);
};

/**
 * An avatar menu's module rows bound as `showButton` binds its own: the row's `button` with the menu's
 * press and hover colour (`button`), its label white, its picture. A copied row's windows carry the
 * module's names (`<key>:button`), as every element a module's patch adds does.
 */
export const bindClientModuleMenuRows = (bindings: TemplateBindings, buttons: readonly ClientModuleMenuButton[], button: (path: string, onPress: () => void) => TemplateBinding) => {
    for (const { row, moduleKey, label, icon, press } of buttons) {
        const path = `${row}/${moduleKey}:button`;

        bindings[path] = button(path, press);
        bindings[`${path}/${moduleKey}:label`] = { caption: label, color: 0xffffff };

        if (icon) bindings[`${path}/${moduleKey}:icon`] = { asset: icon };
    }
};

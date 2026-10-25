/**
 * Not Flash's: where a client module's context menu buttons and chat commands go. A button is a row
 * of the menu's own template, added as the module's template patch - a copy of one of the menu's
 * plain rows (its look, its button and label), with a bitmap for the module's picture where the menu
 * has room for one (as `replenish_respect`'s ducket icon) - which the menu shows and binds
 * (`useClientModuleMenuButtons`). The row is hidden in the layout, as a row Flash's code shows: a list
 * built longer than its layout grew before the windows after it (the menu's `minimize`) were built, so
 * they would not move down with it; shown later, the list grows and they follow. A command is run by
 * the chat input after the client's own.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import type { TemplatePatchOp } from '@nitrodevco/nitro-theme';

import { ClientModuleContextMenu, clientModulesStore, matchClientModuleChatCommand } from '#base/context/client-modules';

interface ContextMenuLayout {
    /** The menu's templates: the furni infostand has one per variant. */
    templates: readonly string[];
    /** The list the rows are in, and the row a module's is a copy of. */
    list: string;
    like: string;
    /** A row button's picture, `x` in the row's button; `undefined` where the rows have no room for one. */
    iconX?: number;
}

/**
 * `avatar_menu_widget`'s and `own_avatar_menu`'s rows are a `button` holding a `label` (143 and 109
 * wide: the picture is 33 from the right, where `replenish_respect` has its ducket icon); the furni
 * infostand's `button_list` holds plain buttons.
 */
const CONTEXT_MENUS: Record<ClientModuleContextMenu, ContextMenuLayout> = {
    user: { templates: [ 'habbo-room-ui-com/avatar_menu_widget' ], list: 'buttons', like: 'friend', iconX: 110 },
    ownUser: { templates: [ 'habbo-room-ui-com/own_avatar_menu' ], list: 'buttons', like: 'change_looks', iconX: 76 },
    furni: { templates: [ 'habbo-room-ui-com/furni_view', 'habbo-room-ui-com/jukebox_view', 'habbo-room-ui-com/songdisk_view', 'habbo-room-ui-com/crackable_furni_view' ], list: 'button_list', like: 'move' },
};

export const isClientModuleContextMenu = (menu: string): menu is ClientModuleContextMenu => Object.hasOwn(CONTEXT_MENUS, menu);

/** The templates a menu's rows are added to, and the op that adds one. */
export const clientModuleMenuRow = (menu: ClientModuleContextMenu, id: string, hasIcon: boolean): { templates: readonly string[]; ops: TemplatePatchOp[] } => {
    const { templates, list, like, iconX } = CONTEXT_MENUS[menu];
    const icon = hasIcon && (iconX !== undefined);
    const add = (iconX === undefined)
        ? { like, name: id, hidden: true }
        : {
                like,
                name: id,
                hidden: true,
                children: [ {
                    like: `${like}/button`,
                    name: 'button',
                    children: [
                        { like: `${like}/button/label`, name: 'label' },
                        ...(icon ? [ { tag: 'static_bitmap', name: 'icon', x: iconX, y: 10, width: 15, height: 15, vars: { stretched_x: false, stretched_y: false } } ] : []),
                    ],
                } ],
            };

    return { templates, ops: [ { element: list, insert: 'last', add } ] };
};

/**
 * Runs `text` when it is a module's chat command; `true` when one took it (the line is not said).
 * A command whose `run` returns `false` lets the line go on; one that throws is logged and takes it.
 */
export const runClientModuleChatCommand = (text: string): boolean => {
    const entries = clientModulesStore.getState().chatCommands;
    const match = matchClientModuleChatCommand(entries.map(entry => entry.command), text);

    if (!match) return false;

    const entry = entries.find(x => x.command === match.command);

    try {
        return match.command.run({ args: match.args, text }) !== false;
    } catch (error) {
        NitroLogger.error('ClientModules', `${entry?.moduleKey}: :${match.command.name} threw`, error);

        return true;
    }
};

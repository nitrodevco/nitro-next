import { ISimpleRoomObjectData } from '@nitrodevco/nitro-api';

import { useTranslation } from '#base/context/system';
import { LayoutImage, TemplateBindings, TemplateWindow } from '#base/theme';

import { RELATIONSHIPS, useAvatarMenu } from './useAvatarMenu';
import { useButtonMenu, useMinimizedMenu } from './useButtonMenu';

export interface InfoBubbleAvatarViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

/** The rows whose button holds an arrow `icon`. */
const ICON_ROWS = new Set([ 'perform', 'relationship', 'mute', 'ban_with_duration', 'moderate', 'ambassador', 'actions' ]);

/** The relationship grid's cells as the layout names them, in `RELATIONSHIPS`' order. */
const RELATIONSHIP_CELLS = [ 'relationship_heart', 'relationship_smile', 'relationship_bobba' ];

/**
 * The menu over another user - `AvatarMenuView`, drawn from its `avatar_menu_widget` template. What
 * it shows and does is `useAvatarMenu`'s; the bubble, the rows and the sizes are the layout's, the
 * list and the bubble shrinking to the rows shown by the layout's own resize params.
 *
 * `updateButtons` hides every row of `buttons` and shows each mode's rows its conditions pass - the
 * relationship grid in the relationship mode (`showButtonGrid`). A row's click is on its `button`.
 * `AvatarMenuView.buttonEventProc` takes `WME_OVER` for its own tracking and never passes it on, so
 * its rows keep their colour under the pointer. The layout's `blow`, `perform` and `donate_*` rows
 * are not offered: the port has no action behind them.
 */
export const InfoBubbleAvatarView = ({ objectData, onClose }: InfoBubbleAvatarViewProps) => {
    const menu = useAvatarMenu(objectData, onClose);
    const { showButton, button } = useButtonMenu(false);
    const { minimizedView, bindings: minimizeBindings } = useMinimizedMenu();
    const t = useTranslation();

    if (!menu) return null;
    if (minimizedView) return minimizedView;

    const { info, visibleButtons, showsRelationshipGrid, relationshipIcon, tradeTooltip, press, pressRelationship, openTheirProfile } = menu;
    const bindings: TemplateBindings = {
        ...minimizeBindings,
        profile_link: { onPointerTap: openTheirProfile },
        // A blocked user's name is `infostand.blocked_user` (italic in the client; the binding sets the text only).
        name: { caption: info.isBlocked ? t('infostand.blocked_user') : info.name, setCaptionAfterBuild: true },
        relationship_status: relationshipIcon ? { visible: true, asset: LayoutImage(`habbo-window-manager-com/${relationshipIcon}`) } : { visible: false },
        buttons: { show: [ ...visibleButtons.map(row => row.key), ...(showsRelationshipGrid ? [ 'relationship_grid' ] : []) ] },
    };

    for (const row of visibleButtons) {
        showButton(bindings, row.key, () => press(row), {
            // The respect count is the caption's parameter: the layout's `${infostand.button.respect}` has none.
            caption: (row.key === 'respect') ? row.caption : undefined,
            hasIcon: ICON_ROWS.has(row.key),
            tooltip: (row.key === 'trade') ? tradeTooltip : undefined,
        });
    }

    RELATIONSHIPS.forEach((relationship, index) => {
        bindings[`${RELATIONSHIP_CELLS[index]}/button`] = button(`${RELATIONSHIP_CELLS[index]}/button`, () => pressRelationship(relationship));
    });

    return (
        <TemplateWindow
            id="habbo-room-ui-com/avatar_menu_widget"
            bindings={bindings}
        />
    );
};

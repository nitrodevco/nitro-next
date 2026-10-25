import { useState } from 'react';

import { enforceRoomCategory } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorStore } from '#base/context/navigator';
import { useTranslation } from '#base/context/system';
import { ClientGates, useClientGate } from '#base/context/user';
import { ModalDialog, TemplateBindings, TemplateWindow, useTemplateFrame } from '#base/theme';
import { flatCategoryName } from '#base/utils';

import { ROOM_TRADE_MODE_TEXTS } from './roomTradeModeTexts';

/**
 * `EnforceCategoryCtrl` over `habbo-navigator-com/enforce_category_xml`, built as a modal dialog
 * (`buildModalDialogFromXML`, centred over the darkened client): the dialog the server opens
 * (`ShowEnforceRoomCategoryDialogMessage`) to make the owner pick a category and a trade mode for
 * the room they are in. Its header close is hidden and the frame does not move (`params="1"`), so
 * OK is the only way out.
 *
 * `category` lists the visible categories that are not automatic, the staff-only ones only for
 * `hasSecurity(7)`; both menus start on their first entry. OK sends the picked category's node id
 * and the trade mode's index (`UpdateRoomCategoryAndTradeSettingsComposer`). The selection type the
 * server sends is not read by `show`.
 *
 * Flash keeps the last picks in fields `show` does not reset, so a second dialog opened without
 * touching the menus would send the first one's picks under menus showing the first entries; each
 * dialog here starts over with what it shows.
 */
const TEMPLATE = 'habbo-navigator-com/enforce_category_xml';

export const NavigatorEnforceCategoryView = () => {
    const flatCategories = useNavigatorStore(x => x.flatCategories);
    const currentRoomId = useNavigatorStore(x => x.currentRoomId);
    const staffCategories = useClientGate(ClientGates.StaffCategories);
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const frame = useTemplateFrame({ id: 'navigator_enforce_category', modal: true, draggable: false, rememberPosition: false, closeButtonVisible: false });
    const [ categoryIndex, setCategoryIndex ] = useState(0);
    const [ tradeMode, setTradeMode ] = useState(0);

    const categories = flatCategories.filter(category => category.visible && !category.automatic && (!category.staffOnly || staffCategories));

    const bindings: TemplateBindings = {
        category: {
            options: categories.map(category => flatCategoryName(category, t)),
            selection: categoryIndex,
            onSelect: setCategoryIndex,
        },
        trade_mode: {
            // `show`'s `trade_mode` entries - the selection is the mode sent.
            options: ROOM_TRADE_MODE_TEXTS,
            selection: tradeMode,
            onSelect: setTradeMode,
        },
        ok: {
            onPointerTap: () => {
                const category = categories[Math.max(0, categoryIndex)];

                if (!category) return;

                enforceRoomCategory(send, currentRoomId, category.nodeId, tradeMode);
            },
        },
    };

    return (
        <ModalDialog>
            <TemplateWindow
                id={TEMPLATE}
                frame={frame}
                bindings={bindings}
            />
        </ModalDialog>
    );
};

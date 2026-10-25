import { useRoomSessionActions } from '#base/context/room';
import { TemplateBindings, TemplateWindow } from '#base/theme';

import { useButtonMenu } from './useButtonMenu';

/** `DecorateModeView.maximumBlend`: what `ContextInfoView.update` sets the window's blend to every frame. */
const BLEND = 0.8;

/**
 * The bubble that stays over your avatar while you decorate - `DecorateModeView`, drawn from its
 * `own_avatar_decorating` template: no header, the black rule and its one `decorate` row
 * (`${widget.avatar.stop_decorating}`), which ends decorating. The layout's own `blend` of 0.5 never
 * shows: the view draws the bubble at its `maximumBlend`.
 */
export const DecorateModeBubbleView = () => {
    const { setIsDecorating } = useRoomSessionActions();
    const { showButton } = useButtonMenu();
    const bindings: TemplateBindings = { '': { alpha: BLEND } };

    showButton(bindings, 'decorate', () => setIsDecorating(false));

    return (
        <TemplateWindow
            id="habbo-room-ui-com/own_avatar_decorating"
            bindings={bindings}
        />
    );
};

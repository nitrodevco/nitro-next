import { AvatarEffectActivatedComposer, AvatarEffectSelectedComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { useAvatarEffects } from '#base/context/user';
import { RoomEffectsView } from '#base/views/room-widgets/effects/RoomEffectsView';

/** Taking an effect off is selecting "no effect", which is what the server calls type zero. */
const NO_EFFECT = 0;

/**
 * The effects wardrobe - `EffectsWidget`. Opened from the avatar's own menu and kept beside the
 * toolbar, as Flash parked it against the toolbar's right edge.
 */
export const RoomEffectsWidget = () => {
    const effects = useAvatarEffects();
    const isVisible = useIsWindowVisible('avatar_effects');
    const { hideWindow } = useWindowActions();
    const { send } = useWebSocketContext();

    if (!isVisible) return null;

    return (
        <RoomEffectsView
            effects={effects}
            onActivate={type => send(new AvatarEffectActivatedComposer({ effectType: type }))}
            onToggleWear={(type, isInUse) => send(new AvatarEffectSelectedComposer({ effectType: isInUse ? NO_EFFECT : type }))}
            onClose={() => hideWindow('avatar_effects')}
        />
    );
};

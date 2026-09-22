import { useRoomSessionActions } from '#base/context/room';
import { useTranslation } from '#base/context/system';

import { InfoBubbleMenuButton } from './InfoBubbleMenuButton';
import { InfoBubbleMenuFrame } from './InfoBubbleMenuFrame';
import { OWN_AVATAR_DECORATING_GEOMETRY } from './InfoBubbleMenuGeometry';

/** `own_avatar_decorating`'s one row: 101x26. */
const ROW_WIDTH = 101;
const ROW_HEIGHT = 26;

/**
 * The bubble that stays over your avatar while you decorate - `DecorateModeView`, on the
 * `own_avatar_decorating` layout: no header, the black rule at y 7 and its one `decorate` row,
 * which ends decorating.
 */
export const DecorateModeBubbleView = () => {
    const t = useTranslation();
    const { setIsDecorating } = useRoomSessionActions();

    return (
        <InfoBubbleMenuFrame
            geometry={OWN_AVATAR_DECORATING_GEOMETRY}
            rowHeights={[ ROW_HEIGHT ]}
        >
            <InfoBubbleMenuButton
                width={ROW_WIDTH}
                caption={t('widget.avatar.stop_decorating')}
                onPress={() => setIsDecorating(false)}
            />
        </InfoBubbleMenuFrame>
    );
};

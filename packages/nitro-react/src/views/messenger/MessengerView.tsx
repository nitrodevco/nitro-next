import { useTranslation } from '#base/context';
import { useSystemActions } from '#base/context/system';
import { Frame } from '#base/theme-pixi';

/**
 * Pixi port of theme/MessengerView.tsx. DOM's own source is itself a stub (static "chats"
 * placeholder text, no real messenger UI) - ported at the same stub fidelity.
 */
export const MessengerView = () => {
    const { toggleWindow } = useSystemActions();
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="messenger"
            layout={{ position: 'absolute', bottom: 4, left: 4, width: 230, minHeight: 107 }}
            caption={t('friendlist.messages')}
            onClose={() => toggleWindow('messenger')}
        >
            chats
        </Frame>
    );
};

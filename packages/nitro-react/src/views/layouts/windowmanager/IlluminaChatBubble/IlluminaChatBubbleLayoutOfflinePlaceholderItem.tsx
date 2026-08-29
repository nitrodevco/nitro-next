import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `offline_placeholder` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutOfflinePlaceholderItemProps {
    captionOffline?: string;
    layout?: BoxLayout;
    onOfflinePlaceholder?: () => void;
}

export const IlluminaChatBubbleLayoutOfflinePlaceholderItem = ({ captionOffline, layout, onOfflinePlaceholder }: IlluminaChatBubbleLayoutOfflinePlaceholderItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="offline_placeholder"
            layout={{ width: 250, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onOfflinePlaceholder}
            cursor="pointer"
        >
            {captionOffline ?? t('messenger.notification.persisted_message_sent')}
        </Region>
    );
};

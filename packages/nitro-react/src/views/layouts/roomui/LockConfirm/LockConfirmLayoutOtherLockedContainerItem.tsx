import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `other_locked_container` of LockConfirmLayout - pass real rows through its `items…` slot. */
export interface LockConfirmLayoutOtherLockedContainerItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
    srcLock?: string;
    visibleLock?: boolean;
    visibleMessage?: boolean;
}

export const LockConfirmLayoutOtherLockedContainerItem = ({ captionMessage, layout, srcLock, visibleLock, visibleMessage }: LockConfirmLayoutOtherLockedContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="other_locked_container"
            layout={{ width: 290, height: 65, flexShrink: 0, ...layout }}
        >
            {(visibleLock ?? true) && (
                <ThemeImage
                    name="lock"
                    src={srcLock ?? '${image.library.url}furniextras/unlocked_image.png'}
                    layout={{ position: 'absolute', left: 122, width: 44, top: 4, height: 44 }}
                />
            )}
            {(visibleMessage ?? true) && (
                <ThemeText
                    text={captionMessage ?? t('friend.furniture.confirm.lock.other.locked')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 291, align: 'center' }}
                    name="message"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 291, bottom: -8, height: 24, minWidth: 291, maxWidth: 291 }}
                />
            )}
        </Region>
    );
};

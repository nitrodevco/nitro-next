import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `thread_lock` of ThreadListItemLayout - pass real rows through its `items…` slot. */
export interface ThreadListItemLayoutThreadLockItemProps {
    layout?: BoxLayout;
    onThreadLock?: () => void;
    srcIcon?: string;
    visibleIcon?: boolean;
}

export const ThreadListItemLayoutThreadLockItem = ({ layout, onThreadLock, srcIcon, visibleIcon }: ThreadListItemLayoutThreadLockItemProps) => {
    return (
        <Region
            name="thread_lock"
            onPointerTap={onThreadLock}
            cursor="pointer"
            layout={{ width: 20, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleIcon ?? true) && (
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? layoutImage('forum_forum_locked.png')}
                    layout={{ position: 'absolute', left: 3, right: 4, top: 1, bottom: 1 }}
                />
            )}
        </Region>
    );
};

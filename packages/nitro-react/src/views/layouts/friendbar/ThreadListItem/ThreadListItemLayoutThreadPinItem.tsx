import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `thread_pin` of ThreadListItemLayout - pass real rows through its `items…` slot. */
export interface ThreadListItemLayoutThreadPinItemProps {
    layout?: BoxLayout;
    onThreadPin?: () => void;
    srcIcon?: string;
    visibleIcon?: boolean;
}

export const ThreadListItemLayoutThreadPinItem = ({ layout, onThreadPin, srcIcon, visibleIcon }: ThreadListItemLayoutThreadPinItemProps) => {
    return (
        <Region
            name="thread_pin"
            onPointerTap={onThreadPin}
            cursor="pointer"
            layout={{ width: 20, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleIcon ?? true) && (
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? layoutImage('forum_forum_pinned.png')}
                    layout={{ position: 'absolute', left: 3, right: 4, top: 2, bottom: 3 }}
                />
            )}
        </Region>
    );
};

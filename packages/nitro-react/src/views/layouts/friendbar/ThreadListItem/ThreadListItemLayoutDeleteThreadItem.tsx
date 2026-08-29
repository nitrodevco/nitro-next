import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `delete_thread` of ThreadListItemLayout - pass real rows through its `items…` slot. */
export interface ThreadListItemLayoutDeleteThreadItemProps {
    layout?: BoxLayout;
    onDeleteThread?: () => void;
    srcIcon?: string;
    visibleIcon?: boolean;
}

export const ThreadListItemLayoutDeleteThreadItem = ({ layout, onDeleteThread, srcIcon, visibleIcon }: ThreadListItemLayoutDeleteThreadItemProps) => {
    return (
        <Region
            name="delete_thread"
            backgroundColor="#de4537"
            onPointerTap={onDeleteThread}
            cursor="pointer"
            layout={{ width: 25, height: 40, flexShrink: 0, ...layout }}
        >
            {(visibleIcon ?? true) && (
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? layoutImage('forum_forum_hide.png')}
                    layout={{ position: 'absolute', left: 5, right: 4, top: 11, bottom: 13 }}
                />
            )}
        </Region>
    );
};

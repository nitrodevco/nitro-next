import { BoxLayout, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `locked_icon` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutLockedIconItemProps {
    layout?: BoxLayout;
    srcLockedIcon?: string;
}

export const FurniViewLayoutLockedIconItem = ({ layout, srcLockedIcon }: FurniViewLayoutLockedIconItemProps) => {
    return (
        <ThemeImage
            name="locked_icon"
            src={srcLockedIcon ?? layoutImage('forum_forum_locked.png')}
            layout={{ width: 13, height: 18, flexShrink: 0, ...layout }}
        />
    );
};

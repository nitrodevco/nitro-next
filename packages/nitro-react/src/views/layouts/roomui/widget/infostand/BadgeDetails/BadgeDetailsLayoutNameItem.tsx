import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `name` of BadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface BadgeDetailsLayoutNameItemProps {
    captionName?: string;
    layout?: BoxLayout;
}

export const BadgeDetailsLayoutNameItem = ({ captionName, layout }: BadgeDetailsLayoutNameItemProps) => {
    return (
        <ThemeText
            text={captionName ?? ''}
            textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
            name="name"
            verticalAlign="top"
            layout={{ width: 250, height: 4, flexShrink: 0, ...layout }}
        />
    );
};

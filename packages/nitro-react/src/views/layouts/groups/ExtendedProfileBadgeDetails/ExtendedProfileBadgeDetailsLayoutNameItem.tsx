import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `name` of ExtendedProfileBadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface ExtendedProfileBadgeDetailsLayoutNameItemProps {
    captionName?: string;
    layout?: BoxLayout;
}

export const ExtendedProfileBadgeDetailsLayoutNameItem = ({ captionName, layout }: ExtendedProfileBadgeDetailsLayoutNameItemProps) => {
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

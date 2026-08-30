import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `description` of BadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface BadgeDetailsLayoutDescriptionItemProps {
    captionDescription?: string;
    layout?: BoxLayout;
}

export const BadgeDetailsLayoutDescriptionItem = ({ captionDescription, layout }: BadgeDetailsLayoutDescriptionItemProps) => {
    return (
        <ThemeText
            text={captionDescription ?? ''}
            textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
            name="description"
            verticalAlign="top"
            layout={{ width: 250, height: 4, flexShrink: 0, ...layout }}
        />
    );
};

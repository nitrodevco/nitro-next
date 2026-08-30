import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `owner_count` of ExtendedProfileBadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface ExtendedProfileBadgeDetailsLayoutOwnerCountItemProps {
    captionOwnerCount?: string;
    layout?: BoxLayout;
    visibleOwnerCount?: boolean;
}

export const ExtendedProfileBadgeDetailsLayoutOwnerCountItem = ({ captionOwnerCount, layout, visibleOwnerCount }: ExtendedProfileBadgeDetailsLayoutOwnerCountItemProps) => {
    return (
        (visibleOwnerCount ?? false) && (
            <ThemeText
                text={captionOwnerCount ?? ''}
                textOptions={{ fill: '#555555', wordWrap: true, wordWrapWidth: 250 }}
                name="owner_count"
                verticalAlign="top"
                layout={{ width: 250, height: 4, flexShrink: 0, ...layout }}
            />
        )
    );
};

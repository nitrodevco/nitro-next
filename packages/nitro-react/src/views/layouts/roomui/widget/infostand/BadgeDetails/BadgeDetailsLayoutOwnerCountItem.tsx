import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `owner_count` of BadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface BadgeDetailsLayoutOwnerCountItemProps {
    captionOwnerCount?: string;
    layout?: BoxLayout;
    visibleOwnerCount?: boolean;
}

export const BadgeDetailsLayoutOwnerCountItem = ({ captionOwnerCount, layout, visibleOwnerCount }: BadgeDetailsLayoutOwnerCountItemProps) => {
    return (
        (visibleOwnerCount ?? false) && (
            <Region
                name="owner_count"
                layout={{ width: 250, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionOwnerCount ?? ''}
                    textOptions={{ fill: '#555555', wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
        )
    );
};

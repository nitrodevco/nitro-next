import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `owner_count` of ExtendedProfileBadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface ExtendedProfileBadgeDetailsLayoutOwnerCountItemProps {
    captionOwnerCount?: string;
    layout?: BoxLayout;
    visibleOwnerCount?: boolean;
}

export const ExtendedProfileBadgeDetailsLayoutOwnerCountItem = ({ captionOwnerCount, layout, visibleOwnerCount }: ExtendedProfileBadgeDetailsLayoutOwnerCountItemProps) => {
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

import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `description` of ExtendedProfileBadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface ExtendedProfileBadgeDetailsLayoutDescriptionItemProps {
    captionDescription?: string;
    layout?: BoxLayout;
}

export const ExtendedProfileBadgeDetailsLayoutDescriptionItem = ({ captionDescription, layout }: ExtendedProfileBadgeDetailsLayoutDescriptionItemProps) => {
    return (
        <Region
            name="description"
            layout={{ width: 250, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDescription ?? ''}
                textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
            />
        </Region>
    );
};

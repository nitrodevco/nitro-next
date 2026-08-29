import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `name` of BadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface BadgeDetailsLayoutNameItemProps {
    captionName?: string;
    layout?: BoxLayout;
}

export const BadgeDetailsLayoutNameItem = ({ captionName, layout }: BadgeDetailsLayoutNameItemProps) => {
    return (
        <Region
            name="name"
            layout={{ width: 250, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionName ?? ''}
                textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
            />
        </Region>
    );
};

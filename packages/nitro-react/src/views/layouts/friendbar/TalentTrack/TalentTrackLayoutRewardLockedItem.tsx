import { Border, BoxLayout, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `reward_locked` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutRewardLockedItemProps {
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    srcLocked?: string;
    visibleDescription?: boolean;
    visibleLocked?: boolean;
    visibleTitle?: boolean;
}

export const TalentTrackLayoutRewardLockedItem = ({ captionDescription, captionTitle, layout, srcLocked, visibleDescription, visibleLocked, visibleTitle }: TalentTrackLayoutRewardLockedItemProps) => {
    return (
        <Border
            variant="104"
            name="reward_locked"
            tintColor="#979797"
            blend={0.6}
            layout={{ width: 200, height: 60, flexShrink: 0, ...layout }}
        >
            {(visibleLocked ?? true) && (
                <ThemeImage
                    name="locked"
                    src={srcLocked ?? layoutImage('talent_locked_achievement.png')}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 60 }}
                />
            )}
            {(visibleTitle ?? true) && (
                <ThemeText
                    text={captionTitle ?? 'Reward name'}
                    textStyle="text-style-il-heading-3"
                    textOptions={{ fill: '#ffffff' }}
                    name="title"
                    layout={{ position: 'absolute', left: 60, width: 68, top: 10, height: 15 }}
                />
            )}
            {(visibleDescription ?? true) && (
                <ThemeText
                    text={captionDescription ?? 'Reward description'}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ wordWrap: true, wordWrapWidth: 135 }}
                    name="description"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 60, width: 135, top: 25, height: 16 }}
                />
            )}
        </Border>
    );
};

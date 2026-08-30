import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `task_locked` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutTaskLockedItemProps {
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    srcLocked?: string;
    visibleBorder?: boolean;
    visibleDescription?: boolean;
    visibleLocked?: boolean;
    visibleTitle?: boolean;
}

export const TalentTrackLayoutTaskLockedItem = ({ captionDescription, captionTitle, layout, srcLocked, visibleBorder, visibleDescription, visibleLocked, visibleTitle }: TalentTrackLayoutTaskLockedItemProps) => {
    return (
        <Region
            name="task_locked"
            layout={{ width: 210, height: 80, flexShrink: 0, ...layout }}
        >
            {(visibleBorder ?? true) && (
                <Border
                    variant="104"
                    name="border"
                    tintColor="#bdbdbd"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 60 }}
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
                            text={captionTitle ?? 'TASK NAME'}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                            name="title"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 60, width: 145, top: 10, height: 15, maxHeight: 28 }}
                        />
                    )}
                    {(visibleDescription ?? true) && (
                        <ThemeText
                            text={captionDescription ?? 'Task description!'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                            name="description"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 60, width: 145, top: 25, height: 16 }}
                        />
                    )}
                </Border>
            )}
        </Region>
    );
};

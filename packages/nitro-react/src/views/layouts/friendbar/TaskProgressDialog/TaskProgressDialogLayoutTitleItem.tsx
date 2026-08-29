import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `title` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutTitleItem = ({ captionTitle, layout }: TaskProgressDialogLayoutTitleItemProps) => {
    return (
        <Region
            name="title"
            layout={{ width: 285, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? 'Level title'}
                textOptions={{ wordWrap: true, wordWrapWidth: 285 }}
            />
        </Region>
    );
};

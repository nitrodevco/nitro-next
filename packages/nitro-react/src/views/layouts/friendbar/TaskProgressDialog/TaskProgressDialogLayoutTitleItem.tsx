import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `title` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutTitleItem = ({ captionTitle, layout }: TaskProgressDialogLayoutTitleItemProps) => {
    return (
        <ThemeText
            text={captionTitle ?? 'Level title'}
            textOptions={{ wordWrap: true, wordWrapWidth: 285 }}
            name="title"
            verticalAlign="top"
            layout={{ width: 285, height: 30, flexShrink: 0, minHeight: 30, ...layout }}
        />
    );
};
